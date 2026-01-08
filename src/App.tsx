import { useState, useEffect } from 'react';
import { ThemeContext, useThemeProvider } from './hooks/useTheme';
import { DocumentManager } from './components/DocumentManager/DocumentManager';
import { Editor } from './components/Editor/Editor';
import { Preview } from './components/Preview/Preview';
import { SnippetPalette } from './components/SnippetPalette/SnippetPalette';
import { TopBar } from './components/Layout/TopBar';
import { StatusBar } from './components/Layout/StatusBar';
import { getDocument, updateDocument } from './lib/storage/documents';
import { exportMarkdown } from './lib/export/markdown';
import { exportHTML } from './lib/export/html';
import { calculateTextStats } from './lib/utils/textStats';
import type { Document } from './types/document';

function App() {
  const themeValue = useThemeProvider();
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [document, setDocument] = useState<Document | null>(null);
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [saveStatus, setSaveStatus] = useState('Saved');

  useEffect(() => {
    if (currentDocId) {
      loadDocument(currentDocId);
    }
  }, [currentDocId]);

  useEffect(() => {
    if (!document) return;

    // Auto-save after 2 seconds of inactivity
    setSaveStatus('Saving...');
    const timer = setTimeout(async () => {
      await updateDocument(document.id, { content });
      setSaveStatus('Saved');
    }, 2000);

    return () => clearTimeout(timer);
  }, [content, document]);

  async function loadDocument(id: string) {
    const doc = await getDocument(id);
    if (doc) {
      setDocument(doc);
      setContent(doc.content);
    }
  }

  function handleInsertSnippet(latex: string) {
    setContent(prev => prev + latex);
  }

  async function handleExport(format: 'md' | 'html') {
    if (!document) return;

    if (format === 'md') {
      exportMarkdown({ ...document, content });
    } else {
      await exportHTML({ ...document, content });
    }
  }

  const stats = calculateTextStats(content);

  if (!currentDocId) {
    return (
      <ThemeContext.Provider value={themeValue}>
        <DocumentManager onSelectDocument={setCurrentDocId} />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="h-screen flex flex-col">
        <TopBar
          documentTitle={document?.title || 'Document'}
          onBack={() => setCurrentDocId(null)}
          onExport={handleExport}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
          saveStatus={saveStatus}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className={showPreview ? 'w-1/3' : 'flex-1'}>
            <Editor
              value={content}
              onChange={setContent}
              theme={themeValue.theme}
            />
          </div>

          {showPreview && (
            <>
              <div className="flex-1 border-l border-gray-300 dark:border-gray-700">
                <Preview content={content} />
              </div>
              <div className="w-80">
                <SnippetPalette onInsert={handleInsertSnippet} />
              </div>
            </>
          )}
        </div>

        <StatusBar
          wordCount={stats.wordCount}
          characterCount={stats.characterCount}
          readingTime={stats.readingTime}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;


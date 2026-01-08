import { useState, useEffect } from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { listDocuments, createDocument, deleteDocument } from '../../lib/storage/documents';
import type { Document } from '../../types/document';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { Input } from '../UI/Input';

interface DocumentManagerProps {
  onSelectDocument: (id: string) => void;
}

export function DocumentManager({ onSelectDocument }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    const docs = await listDocuments();
    setDocuments(docs);
  }

  async function handleCreate() {
    if (!newDocTitle.trim()) return;
    
    const doc = await createDocument(newDocTitle);
    setIsCreating(false);
    setNewDocTitle('');
    onSelectDocument(doc.id);
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this document?')) {
      await deleteDocument(id);
      loadDocuments();
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="p-6 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Document Editor
        </h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus size={18} className="inline mr-2" />
          New Document
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No documents yet. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onSelectDocument(doc.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {doc.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(doc.id);
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {doc.wordCount} words · {Math.ceil(doc.wordCount / 200)} min read
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Updated {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        title="Create New Document"
      >
        <Input
          label="Document Title"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
          placeholder="My Document"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate();
          }}
        />
        <div className="flex gap-2 mt-4">
          <Button onClick={handleCreate}>Create</Button>
          <Button variant="secondary" onClick={() => setIsCreating(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

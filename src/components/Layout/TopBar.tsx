
import { ArrowLeft, Download, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface TopBarProps {
  documentTitle: string;
  onBack: () => void;
  onExport: (format: 'md' | 'html') => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  saveStatus: string;
}

export function TopBar({
  documentTitle,
  onBack,
  onExport,
  showPreview,
  onTogglePreview,
  saveStatus,
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {documentTitle}
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {saveStatus}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePreview}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          title={showPreview ? 'Hide Preview' : 'Show Preview'}
        >
          {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

        <div className="relative group">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            <Download size={20} />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
            <button
              onClick={() => onExport('md')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Export as Markdown
            </button>
            <button
              onClick={() => onExport('html')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Export as HTML
            </button>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { SnippetCategory } from '../../types/snippet';
import { snippets, searchSnippets, getSnippetsByCategory } from './snippetData';

interface SnippetPaletteProps {
  onInsert: (latex: string) => void;
}

export function SnippetPalette({ onInsert }: SnippetPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('snippetFavorites');
    return stored ? JSON.parse(stored) : [];
  });

  const displaySnippets = searchQuery
    ? searchSnippets(searchQuery)
    : snippets;

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('snippetFavorites', JSON.stringify(newFavorites));
  };

  const favoriteSnippets = snippets.filter(s => favorites.includes(s.id));

  const categories = Object.values(SnippetCategory);

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700">
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          LaTeX Snippets
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {searchQuery ? (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Search Results ({displaySnippets.length})
            </h3>
            <div className="space-y-2">
              {displaySnippets.map(snippet => (
                <SnippetItem
                  key={snippet.id}
                  snippet={snippet}
                  isFavorite={favorites.includes(snippet.id)}
                  onInsert={() => onInsert(snippet.latex)}
                  onToggleFavorite={() => toggleFavorite(snippet.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {favoriteSnippets.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  Favorites
                </h3>
                <div className="space-y-2">
                  {favoriteSnippets.map(snippet => (
                    <SnippetItem
                      key={snippet.id}
                      snippet={snippet}
                      isFavorite={true}
                      onInsert={() => onInsert(snippet.latex)}
                      onToggleFavorite={() => toggleFavorite(snippet.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {categories.map(category => {
              const categorySnippets = getSnippetsByCategory(category);
              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categorySnippets.map(snippet => (
                      <SnippetItem
                        key={snippet.id}
                        snippet={snippet}
                        isFavorite={favorites.includes(snippet.id)}
                        onInsert={() => onInsert(snippet.latex)}
                        onToggleFavorite={() => toggleFavorite(snippet.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

interface SnippetItemProps {
  snippet: { id: string; label: string; latex: string };
  isFavorite: boolean;
  onInsert: () => void;
  onToggleFavorite: () => void;
}

function SnippetItem({ snippet, isFavorite, onInsert, onToggleFavorite }: SnippetItemProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600">
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {snippet.label}
        </span>
        <button
          onClick={onToggleFavorite}
          className="text-gray-400 hover:text-yellow-400"
        >
          <Star
            size={14}
            className={isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}
          />
        </button>
      </div>
      <code className="block text-xs font-mono text-gray-600 dark:text-gray-300 mb-2 break-all">
        {snippet.latex}
      </code>
      <button
        onClick={onInsert}
        className="w-full px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Insert
      </button>
    </div>
  );
}

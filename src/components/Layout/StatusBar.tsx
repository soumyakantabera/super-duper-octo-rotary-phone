

interface StatusBarProps {
  wordCount: number;
  characterCount: number;
  readingTime: number;
  cursorLine?: number;
  cursorCol?: number;
}

export function StatusBar({
  wordCount,
  characterCount,
  readingTime,
  cursorLine,
  cursorCol,
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-4">
        {cursorLine !== undefined && cursorCol !== undefined && (
          <span>Line {cursorLine}, Col {cursorCol}</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span>{wordCount} words</span>
        <span>{characterCount} characters</span>
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
}

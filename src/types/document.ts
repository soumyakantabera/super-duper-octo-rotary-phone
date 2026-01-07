export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  wordCount: number;
  characterCount: number;
  metadata: DocumentMetadata;
}

export interface DocumentMetadata {
  tags?: string[];
  favorited?: boolean;
  readingTime?: number;
  mathBlockCount?: number;
  lastCursorPosition?: number;
}

export interface AutosaveEntry {
  documentId: string;
  content: string;
  timestamp: number;
  cursorPosition?: number;
}

export interface ExportOptions {
  format: 'markdown' | 'html' | 'pdf';
  includeMetadata?: boolean;
  standalone?: boolean;
  mathRenderer?: 'mathjax' | 'katex';
}

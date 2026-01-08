# Data Model Documentation

## Overview

This document describes the data structures and storage mechanisms used in the Markdown + LaTeX document editor. All data is stored client-side using IndexedDB and LocalStorage, with no server communication.

## Storage Architecture

### IndexedDB
Primary storage for document content and metadata.

**Database Name**: `markdown-latex-editor`
**Version**: 1

**Object Stores**:
1. `documents` - Document content and metadata
2. `autosave` - Temporary auto-save data

### LocalStorage
Used for lightweight user preferences and settings.

**Keys**:
- `theme` - Current theme (light/dark)
- `favorites` - Favorite snippet IDs
- `editorSettings` - Editor preferences
- `lastOpenDocument` - Last opened document ID

## Data Models

### Document

Primary data structure for storing documents.

```typescript
interface Document {
  id: string;                    // UUID v4
  title: string;                 // User-defined title
  content: string;               // Markdown content
  createdAt: number;             // Unix timestamp (ms)
  updatedAt: number;             // Unix timestamp (ms)
  wordCount: number;             // Cached word count
  characterCount: number;        // Cached character count
  metadata: DocumentMetadata;    // Additional metadata
}

interface DocumentMetadata {
  tags?: string[];              // Optional tags
  favorited?: boolean;          // Is favorited
  readingTime?: number;         // Reading time in minutes
  mathBlockCount?: number;      // Number of math blocks
  lastCursorPosition?: number;  // Last cursor position
}
```

### Document Operations

```typescript
// Create new document
async createDocument(title: string, content?: string): Promise<Document>

// Read document
async getDocument(id: string): Promise<Document | null>

// Update document
async updateDocument(id: string, updates: Partial<Document>): Promise<void>

// Delete document
async deleteDocument(id: string): Promise<void>

// List all documents
async listDocuments(): Promise<Document[]>

// Duplicate document
async duplicateDocument(id: string): Promise<Document>
```

### Auto-save Entry

Temporary storage for auto-save functionality.

```typescript
interface AutosaveEntry {
  documentId: string;           // Reference to document
  content: string;              // Current content
  timestamp: number;            // Save timestamp
  cursorPosition?: number;      // Cursor position at save
}
```

### Snippet

LaTeX snippet definition.

```typescript
interface Snippet {
  id: string;                   // Unique identifier
  label: string;                // Display name
  category: SnippetCategory;    // Category
  latex: string;                // LaTeX code
  description?: string;         // Optional description
  preview?: string;             // Preview image or rendered LaTeX
  placeholders?: Placeholder[]; // Tab stop placeholders
  keywords: string[];           // Search keywords
}

enum SnippetCategory {
  FRACTIONS = 'fractions',
  MATRICES = 'matrices',
  OPERATORS = 'operators',
  GREEK = 'greek',
  SETS = 'sets',
  CALCULUS = 'calculus',
  PROBABILITY = 'probability',
  BRACKETS = 'brackets',
  SUBSCRIPTS = 'subscripts',
}

interface Placeholder {
  index: number;               // Tab stop index (1, 2, 3...)
  default: string;             // Default text
  start: number;               // Start position in latex string
  end: number;                 // End position in latex string
}
```

### User Preferences

Stored in LocalStorage.

```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  editorSettings: EditorSettings;
  previewSettings: PreviewSettings;
  snippetFavorites: string[];  // Array of snippet IDs
}

interface EditorSettings {
  fontSize: number;            // Font size in pixels
  lineNumbers: boolean;        // Show line numbers
  lineWrapping: boolean;       // Wrap long lines
  tabSize: number;             // Tab size (spaces)
  autoCloseBrackets: boolean;  // Auto-close brackets
  highlightActiveLine: boolean;
}

interface PreviewSettings {
  showPreview: boolean;        // Show preview pane
  syncScroll: boolean;         // Sync scroll with editor
  fontSize: number;            // Preview font size
  mathRenderer: 'mathjax' | 'katex'; // Math renderer
}
```

### Export Configuration

Configuration for document export.

```typescript
interface ExportOptions {
  format: 'markdown' | 'html' | 'pdf';
  includeMetadata?: boolean;   // Include frontmatter
  standalone?: boolean;        // Self-contained HTML
  mathRenderer?: 'mathjax' | 'katex';
}
```

## IndexedDB Schema

### Documents Object Store

```javascript
{
  keyPath: 'id',
  indexes: [
    { name: 'title', keyPath: 'title', unique: false },
    { name: 'createdAt', keyPath: 'createdAt', unique: false },
    { name: 'updatedAt', keyPath: 'updatedAt', unique: false }
  ]
}
```

### Autosave Object Store

```javascript
{
  keyPath: 'documentId',
  indexes: [
    { name: 'timestamp', keyPath: 'timestamp', unique: false }
  ]
}
```

## Data Flow Patterns

### Document Creation Flow

```
User creates document
    ↓
Generate UUID
    ↓
Create Document object with defaults
    ↓
Save to IndexedDB
    ↓
Return document ID
    ↓
Navigate to editor
```

### Auto-save Flow

```
User edits content
    ↓
Content change detected
    ↓
Debounce (2 seconds)
    ↓
Create AutosaveEntry
    ↓
Save to IndexedDB autosave store
    ↓
After 5 seconds (if no further changes)
    ↓
Commit to main document
    ↓
Clear autosave entry
```

### Document Load Flow

```
Request document by ID
    ↓
Check autosave store first
    ↓
If autosave exists
    ├→ Load autosave content
    └→ Mark as unsaved
Else
    └→ Load from documents store
    ↓
Initialize editor
    ↓
Restore cursor position if available
```

## Storage Limits & Optimization

### IndexedDB Quotas
- **Chrome**: ~60% of available disk space
- **Firefox**: ~50% of available disk space
- **Safari**: ~1GB (may prompt user)

### Optimization Strategies

1. **Compression**
   - Optional gzip compression for large documents
   - Compress documents > 100KB
   - Decompress on load

2. **Cleanup**
   - Delete old autosave entries (> 7 days)
   - Remove orphaned autosaves
   - Batch cleanup on app start

3. **Limits**
   - Warn when storage > 80% full
   - Suggest exporting old documents
   - Provide storage usage UI

## Data Migration

### Version Updates

When database schema changes:

```typescript
db.version(2).stores({
  documents: '++id, title, createdAt, updatedAt',
  autosave: 'documentId, timestamp',
  // New store in v2
  templates: '++id, name, category'
});

// Migration logic
db.version(2).upgrade(transaction => {
  return transaction.db.table('documents').toCollection().modify(doc => {
    // Add new fields with defaults
    if (!doc.metadata) {
      doc.metadata = {};
    }
  });
});
```

## Data Export Format

### Markdown Export (.md)

Plain Markdown file with optional frontmatter:

```markdown
---
title: Document Title
created: 2024-01-01T00:00:00.000Z
updated: 2024-01-02T00:00:00.000Z
---

# Document Title

Content goes here...
```

### HTML Export (.html)

Self-contained HTML with embedded CSS and MathJax:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document Title</title>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/..."></script>
  <style>/* Embedded styles */</style>
</head>
<body>
  <article>
    <!-- Rendered content -->
  </article>
</body>
</html>
```

### PDF Export

Uses browser's print-to-PDF functionality with:
- Custom CSS for print media
- Page breaks
- Math properly rendered
- Syntax highlighting

## Backup & Recovery

### Automatic Backup

```typescript
interface Backup {
  timestamp: number;
  documents: Document[];
  preferences: UserPreferences;
  version: string;  // App version
}

// Create backup
async createBackup(): Promise<Blob>

// Restore from backup
async restoreBackup(backup: Blob): Promise<void>
```

### Export All Data

```typescript
// Export complete application state
async exportAllData(): Promise<{
  documents: Document[],
  preferences: UserPreferences,
  snippets: { favorites: string[] }
}>
```

## Conflict Resolution

Since the app is single-user, conflicts are rare but can occur:

1. **Multiple Tabs**
   - Use BroadcastChannel API to sync
   - Last-write-wins strategy
   - Show warning when conflict detected

2. **Autosave vs Manual Save**
   - Autosave takes precedence
   - Manual save always commits
   - Clear autosave on manual save

## Security Considerations

### Data Privacy
- No data leaves the browser
- No analytics or tracking
- No cloud sync

### Data Integrity
- Validate all data on read
- Handle corrupted data gracefully
- Provide recovery mechanisms

### XSS Prevention
- Never render document content as HTML without sanitization
- Store content as plain text
- Sanitize on render, not on save

## Performance Considerations

### Indexing Strategy
- Index frequently queried fields (updatedAt, title)
- Avoid over-indexing
- Use compound indexes where appropriate

### Caching
- Cache document list in memory
- Invalidate on changes
- Lazy load document content

### Batch Operations
- Batch multiple updates
- Use transactions for atomic operations
- Minimize IndexedDB operations

## Example Data

### Sample Document

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Linear Algebra Notes",
  "content": "# Linear Algebra\n\n## Vectors\n\nA vector $\\vec{v}$ in $\\mathbb{R}^n$...",
  "createdAt": 1704067200000,
  "updatedAt": 1704153600000,
  "wordCount": 1250,
  "characterCount": 8430,
  "metadata": {
    "tags": ["math", "linear-algebra"],
    "favorited": true,
    "readingTime": 6,
    "mathBlockCount": 15,
    "lastCursorPosition": 342
  }
}
```

### Sample Snippet

```json
{
  "id": "frac-basic",
  "label": "Fraction",
  "category": "fractions",
  "latex": "\\frac{${1:numerator}}{${2:denominator}}",
  "description": "Basic fraction",
  "placeholders": [
    { "index": 1, "default": "numerator", "start": 6, "end": 21 },
    { "index": 2, "default": "denominator", "start": 23, "end": 40 }
  ],
  "keywords": ["fraction", "divide", "ratio"]
}
```

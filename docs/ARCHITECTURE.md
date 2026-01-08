# Architecture Documentation

## Overview

This document describes the technical architecture of the Markdown + LaTeX document editor. The application is a single-page application (SPA) built with React, TypeScript, and Vite, running entirely in the browser with no backend dependencies.

## Technology Stack

### Core Framework
- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server

### Editor
- **CodeMirror 6** - Extensible code editor
  - `@codemirror/view` - Editor view
  - `@codemirror/state` - State management
  - `@codemirror/lang-markdown` - Markdown language support
  - `@codemirror/commands` - Editor commands
  - `@codemirror/search` - Find/replace

### Markdown Processing
- **unified** - Text processing framework
- **remark-parse** - Markdown parser
- **remark-gfm** - GitHub-Flavored Markdown
- **remark-math** - Math syntax support
- **remark-rehype** - Markdown to HTML transformer
- **rehype-sanitize** - HTML sanitization
- **rehype-stringify** - HTML serialization
- **rehype-highlight** - Code syntax highlighting
- **rehype-mathjax** - MathJax integration

### Math Rendering
- **MathJax v3** - LaTeX typesetting

### Storage
- **idb** - IndexedDB wrapper for document persistence

### Styling
- **Tailwind CSS** - Utility-first CSS framework

### Icons
- **Lucide React** - Icon library

## Project Structure

```
/
├── docs/                      # Documentation
│   ├── SPEC.md               # Product specification
│   ├── ARCHITECTURE.md       # This file
│   ├── DATA_MODEL.md         # Data structures
│   └── RENDERING.md          # Rendering pipeline
├── public/                   # Static assets
│   └── favicon.ico
├── src/
│   ├── components/           # React components
│   │   ├── Editor/
│   │   │   ├── Editor.tsx           # CodeMirror editor wrapper
│   │   │   ├── EditorToolbar.tsx    # Formatting toolbar
│   │   │   └── EditorKeymap.tsx     # Keyboard shortcuts
│   │   ├── Preview/
│   │   │   ├── Preview.tsx          # Markdown preview pane
│   │   │   └── MathRenderer.tsx     # MathJax wrapper
│   │   ├── SnippetPalette/
│   │   │   ├── SnippetPalette.tsx   # Main palette component
│   │   │   ├── SnippetCategory.tsx  # Category section
│   │   │   ├── SnippetItem.tsx      # Individual snippet
│   │   │   ├── SnippetSearch.tsx    # Search interface
│   │   │   └── snippetData.ts       # Snippet definitions
│   │   ├── DocumentManager/
│   │   │   ├── DocumentList.tsx     # Document list view
│   │   │   ├── DocumentItem.tsx     # Single document entry
│   │   │   └── NewDocumentModal.tsx # Create document dialog
│   │   ├── Layout/
│   │   │   ├── TopBar.tsx           # Application header
│   │   │   ├── StatusBar.tsx        # Bottom status bar
│   │   │   ├── SplitPane.tsx        # Resizable split pane
│   │   │   └── Sidebar.tsx          # Collapsible sidebar
│   │   └── UI/
│   │       ├── Button.tsx           # Button component
│   │       ├── Modal.tsx            # Modal dialog
│   │       ├── Dropdown.tsx         # Dropdown menu
│   │       └── Input.tsx            # Input field
│   ├── hooks/                # Custom React hooks
│   │   ├── useDocument.ts           # Document CRUD operations
│   │   ├── useAutosave.ts           # Auto-save logic
│   │   ├── useMarkdownRenderer.ts   # Markdown processing
│   │   ├── useDebounce.ts           # Debounce utility
│   │   └── useTheme.ts              # Theme management
│   ├── lib/                  # Utility libraries
│   │   ├── storage/
│   │   │   ├── db.ts                # IndexedDB setup
│   │   │   └── documents.ts         # Document storage API
│   │   ├── markdown/
│   │   │   ├── processor.ts         # Unified pipeline
│   │   │   └── sanitizer.ts         # HTML sanitization config
│   │   ├── export/
│   │   │   ├── markdown.ts          # Export to .md
│   │   │   ├── html.ts              # Export to .html
│   │   │   └── pdf.ts               # Export to PDF
│   │   ├── import/
│   │   │   └── markdown.ts          # Import .md files
│   │   └── utils/
│   │       ├── textStats.ts         # Word count, reading time
│   │       ├── pasteCleanup.ts      # ChatGPT paste processing
│   │       └── snippetInsertion.ts  # Snippet insertion logic
│   ├── types/                # TypeScript type definitions
│   │   ├── document.ts              # Document types
│   │   ├── snippet.ts               # Snippet types
│   │   └── editor.ts                # Editor types
│   ├── styles/               # Global styles
│   │   ├── globals.css              # Global CSS
│   │   └── themes.css               # Theme variables
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type definitions
├── .gitignore
├── index.html                # HTML entry point
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # Setup and deployment instructions
```

## Component Architecture

### Component Hierarchy

```
App
├── DocumentManager (route: /)
│   └── DocumentList
│       └── DocumentItem[]
└── EditorView (route: /editor/:id)
    ├── TopBar
    │   ├── DocumentTitle
    │   ├── SaveStatus
    │   ├── ExportMenu
    │   └── ThemeToggle
    ├── SplitPane
    │   ├── Editor
    │   │   ├── EditorToolbar
    │   │   └── CodeMirror
    │   └── Preview
    │       └── MathRenderer
    ├── Sidebar (collapsible)
    │   └── SnippetPalette
    │       ├── SnippetSearch
    │       └── SnippetCategory[]
    │           └── SnippetItem[]
    └── StatusBar
```

### Key Components

#### App.tsx
- Main application container
- Routing logic
- Global state management
- Theme provider

#### Editor.tsx
- Wraps CodeMirror 6
- Manages editor state
- Handles keyboard shortcuts
- Emits content changes

#### Preview.tsx
- Receives markdown content
- Processes through unified pipeline
- Renders sanitized HTML
- Triggers MathJax typesetting

#### SnippetPalette.tsx
- Displays categorized snippets
- Search functionality
- Handles snippet insertion
- Manages favorites

#### DocumentManager (hooks/useDocument.ts)
- CRUD operations for documents
- IndexedDB interaction
- Auto-save coordination
- Export/import functionality

## Data Flow

### Document Editing Flow

```
User types in Editor
    ↓
Editor state updates (CodeMirror)
    ↓
onChange event fires
    ↓
Debounced (200ms)
    ↓
├→ Update preview (useMarkdownRenderer)
│   ├→ unified/remark pipeline
│   ├→ sanitize HTML
│   ├→ render to Preview component
│   └→ MathJax typeset
│
└→ Auto-save trigger (useAutosave)
    └→ Save to IndexedDB (debounced 2s)
```

### Snippet Insertion Flow

```
User clicks snippet
    ↓
Get current cursor position
    ↓
Insert snippet text at cursor
    ↓
Parse placeholders (${1:text})
    ↓
Select first placeholder
    ↓
Focus editor
```

### Document Load Flow

```
User selects document
    ↓
Load from IndexedDB
    ↓
Initialize editor state
    ↓
Render preview
    ↓
Typeset math
```

## State Management

### Local Component State
- UI interactions (modals, dropdowns)
- Form inputs
- Temporary UI state

### Context/Hooks
- **DocumentContext**: Current document, save status
- **ThemeContext**: Light/dark mode
- **useDocument**: Document operations
- **useAutosave**: Auto-save coordination

### Persistent State
- **IndexedDB**: Document content, metadata
- **LocalStorage**: User preferences, theme, favorites

## Performance Optimizations

### Rendering
1. **Debouncing**: Preview updates debounced to 200ms
2. **Memoization**: React.memo for expensive components
3. **Lazy Loading**: Code-split routes and large components
4. **Virtual Scrolling**: For long document lists (if needed)

### MathJax
1. **Incremental Typesetting**: Only typeset changed sections
2. **Throttling**: Limit MathJax calls during rapid typing
3. **Web Worker**: Offload processing (future optimization)

### Storage
1. **Batch Saves**: Group multiple changes
2. **Compression**: Optional compression for large documents
3. **Indexing**: Efficient document queries

## Security Considerations

### XSS Prevention
- **rehype-sanitize**: Strips dangerous HTML tags/attributes
- **Safe Schema**: Allow only safe HTML elements
- **No inline scripts**: Block all script execution
- **Content Security Policy**: Restrictive CSP headers

### Data Safety
- **Client-side only**: No data transmission
- **Input validation**: Validate all user inputs
- **Error boundaries**: Catch and contain errors

## Build & Deployment

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
Output: `dist/` directory with static files

### Deployment Targets
- **GitHub Pages**: Static hosting
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment

### Build Optimizations
- Code splitting
- Tree shaking
- Asset optimization
- Compression (gzip/brotli)

## Extension Points

### Adding New Snippet Categories
1. Update `snippetData.ts`
2. Add category to enum
3. Snippets automatically appear in UI

### Custom Markdown Extensions
1. Add remark/rehype plugin
2. Configure in `processor.ts`
3. Update sanitizer schema if needed

### Export Formats
1. Create new exporter in `lib/export/`
2. Add to export menu
3. Implement format-specific logic

## Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Core editing | ✓ | ✓ | ✓ | ✓ |
| MathJax | ✓ | ✓ | ✓ | ✓ |
| IndexedDB | ✓ | ✓ | ✓ | ✓ |
| File System API | ✓ | ✗ | ✗ | ✓ |
| PDF export | ✓ | ✓ | ✓ | ✓ |

## Accessibility Features

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- High contrast mode
- Proper heading hierarchy

## Testing Strategy

### Unit Tests
- Utility functions
- Hooks
- Data transformations

### Integration Tests
- Component interactions
- Storage operations
- Export/import

### E2E Tests
- Document creation
- Content editing
- Export workflows

### Manual Testing
- Cross-browser testing
- Accessibility audit
- Performance profiling
- ChatGPT paste testing

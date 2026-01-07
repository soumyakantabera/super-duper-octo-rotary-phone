# Product Specification: Markdown + LaTeX Document Editor

## Executive Summary

A free, browser-based document editor that provides an Overleaf-like experience for writing Markdown documents with embedded LaTeX mathematics. The editor features a split-pane interface with live preview, a comprehensive LaTeX snippet palette, and robust support for content pasted from ChatGPT.

## Core Features

### 1. Document Editing Interface

#### Split-Pane Editor
- **Left pane**: Text editor powered by CodeMirror 6
  - Syntax highlighting for Markdown
  - Line numbers
  - Bracket matching
  - Auto-indent
- **Right pane**: Live preview
  - Rendered Markdown with GitHub-Flavored Markdown extensions
  - LaTeX math typeset with MathJax
  - Syntax-highlighted code blocks
  - Real-time synchronization (debounced 200ms)

#### Single-Pane Mode
- Toggle to hide preview pane
- Maximize editor space for focused writing
- Quick toggle via button or keyboard shortcut

### 2. Markdown Support

#### Standard CommonMark
- Headings (`#` through `######`)
- Paragraphs and line breaks
- Emphasis and strong emphasis (`*italic*`, `**bold**`)
- Lists (ordered and unordered, nested)
- Links and images
- Code (inline and fenced blocks)
- Blockquotes
- Horizontal rules

#### GitHub-Flavored Markdown (GFM)
- Tables with alignment
- Strikethrough (`~~text~~`)
- Task lists (`- [ ]` and `- [x]`)
- Automatic URL linking
- Fenced code blocks with language identifiers

### 3. LaTeX Math Support

#### Inline Math
- `$...$` (single dollar signs)
- `\(...\)` (LaTeX backslash-paren)

#### Display Math
- `$$...$$` (double dollar signs)
- `\[...\]` (LaTeX backslash-bracket)

#### Math Rendering
- MathJax v3 for high-quality typesetting
- Support for all standard LaTeX math commands
- Automatic numbering for equations (optional)
- Configurable rendering options

### 4. LaTeX Snippet Palette

#### Organization
Snippets organized into searchable categories:

**A) Fractions & Roots**
- `\frac{a}{b}` - Standard fraction
- `\dfrac{a}{b}` - Display-style fraction
- `\tfrac{a}{b}` - Text-style fraction
- `\sqrt{x}` - Square root
- `\sqrt[n]{x}` - nth root

**B) Superscripts & Subscripts**
- `x^2` - Superscript
- `x_i` - Subscript
- `x_{i,j}` - Multi-character subscript
- `x^{n+1}` - Expression in superscript

**C) Brackets & Delimiters**
- `\left( ... \right)` - Auto-sizing parentheses
- `\left[ ... \right]` - Auto-sizing brackets
- `\left\{ ... \right\}` - Auto-sizing braces
- `\lvert x \rvert` - Absolute value
- `\lVert x \rVert` - Norm

**D) Matrices & Vectors**
- `\begin{bmatrix}...\end{bmatrix}` - Matrix with brackets
- `\begin{pmatrix}...\end{pmatrix}` - Matrix with parentheses
- `\begin{vmatrix}...\end{vmatrix}` - Determinant
- `\vec{v}` - Vector arrow
- `\mathbf{v}` - Bold vector
- `\boldsymbol{\beta}` - Bold Greek

**E) Sets & Logic**
- Set membership: `\in`, `\notin`
- Set operations: `\subset`, `\subseteq`, `\cup`, `\cap`, `\setminus`
- Logic: `\forall`, `\exists`, `\Rightarrow`, `\Leftrightarrow`
- Special sets: `\mathbb{R}`, `\mathbb{N}`, `\mathbb{Z}`, `\mathbb{Q}`, `\mathbb{C}`
- Calligraphic: `\mathcal{F}`, `\mathcal{L}`

**F) Operators**
- Summation: `\sum_{i=1}^n`
- Product: `\prod_{i=1}^n`
- Integration: `\int_a^b`, `\iint`, `\iiint`
- Limits: `\lim_{x\to 0}`
- Logarithms: `\log`, `\ln`
- Exponential: `\exp`
- Optimization: `\argmax`, `\argmin`

**G) Greek Letters**
Clickable grid with common Greek letters:
- Lowercase: α, β, γ, δ, ε, ζ, η, θ, ι, κ, λ, μ, ν, ξ, π, ρ, σ, τ, υ, φ, χ, ψ, ω
- Uppercase: Γ, Δ, Θ, Λ, Ξ, Π, Σ, Φ, Ψ, Ω
- Variants: `\varepsilon`, `\vartheta`, `\varphi`, `\varsigma`

**H) Calculus**
- Derivatives: `\frac{d}{dx}`, `\frac{dy}{dx}`
- Partial derivatives: `\frac{\partial}{\partial x}`, `\frac{\partial^2}{\partial x^2}`
- Gradient: `\nabla`
- Laplacian: `\Delta`

**I) Probability & Statistics**
- Expectation: `\mathbb{E}[X]`
- Variance: `\mathrm{Var}(X)`
- Covariance: `\mathrm{Cov}(X,Y)`
- Normal distribution: `\mathcal{N}(\mu,\sigma^2)`
- Conditional probability: `P(A\mid B)`

#### Snippet Features
- **Search**: Real-time filtering of snippets
- **Insert**: One-click insertion at cursor position
- **Copy**: Copy LaTeX code to clipboard
- **Favorites**: Mark frequently used snippets
- **Placeholders**: Support for tab stops (e.g., `${1:numerator}`)
- **Preview**: Visual preview of each snippet

### 5. Document Management

#### Document List
- Create new documents
- Rename documents
- Duplicate documents
- Delete documents (with confirmation)
- Last modified timestamp
- Document size

#### Auto-save
- Automatic saving to IndexedDB every 2 seconds
- Save indicator in top bar
- "All changes saved" status message
- Conflict resolution for simultaneous edits

#### Import/Export

**Import**:
- Import `.md` files from disk
- Paste from clipboard with formatting preservation

**Export**:
- `.md` - Plain Markdown file
- `.html` - Self-contained HTML with embedded MathJax
- `.pdf` - Print-to-PDF (browser's print dialog)

### 6. Editor Features

#### Keyboard Shortcuts
- `Ctrl+B` / `Cmd+B` - Bold
- `Ctrl+I` / `Cmd+I` - Italic
- `Ctrl+K` / `Cmd+K` - Insert link
- `Ctrl+` / `Cmd+`` - Inline code
- `Ctrl+F` / `Cmd+F` - Find
- `Ctrl+H` / `Cmd+H` - Find and replace
- `Ctrl+S` / `Cmd+S` - Save (trigger immediate save)
- `Ctrl+P` / `Cmd+P` - Export to PDF
- `Ctrl+/` / `Cmd+/` - Toggle line comment

#### Text Formatting
- Bold, italic, strikethrough
- Inline code
- Code blocks with language selection
- Headings (H1-H6)
- Lists (ordered, unordered, task lists)
- Blockquotes
- Links and images
- Tables

#### Find & Replace
- Case-sensitive option
- Whole word matching
- Regular expression support
- Replace all functionality
- Navigation between matches

#### Statistics
- Word count
- Character count (with and without spaces)
- Reading time estimate (based on 200 WPM)
- Line count
- Math block count

### 7. ChatGPT Compatibility

#### Paste Cleanup Feature
Optional processing when pasting content:

**Smart Quote Normalization**
- Convert `"` and `"` to `"`
- Convert `'` and `'` to `'`

**List Indentation**
- Fix inconsistent spacing in nested lists
- Preserve tab/space-based indentation

**Code Block Preservation**
- Detect and preserve triple-backtick fences
- Maintain language identifiers
- Handle inline code properly

**Math Pattern Detection** (optional toggle)
- Detect common patterns like "x^2" and suggest LaTeX
- Identify fraction patterns like "a/b"
- Recognize Greek letter names (alpha → α)

### 8. User Interface

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│ [Doc Name]  [Save Status]    [Export] [Theme] [Help]   │
├──────────────┬────────────────┬──────────────────────────┤
│              │                │                          │
│   Editor     │    Preview     │   LaTeX Snippets        │
│              │                │   [Search...]            │
│              │                │   Categories:            │
│              │                │   - Fractions            │
│              │                │   - Matrices             │
│              │                │   ...                    │
│              │                │                          │
├──────────────┴────────────────┴──────────────────────────┤
│ Line 10, Col 5  │  500 words  │  Math: ✓  │  Auto-saved │
└─────────────────────────────────────────────────────────┘
```

#### Top Bar
- Document name (editable)
- Save status indicator
- Export menu
- Theme toggle (light/dark)
- Help/documentation link

#### Status Bar
- Cursor position (line, column)
- Word count
- Rendering status
- Last saved timestamp

#### Theme Support
- Light mode (default)
- Dark mode
- Persistent theme preference
- Smooth transitions

#### Accessibility
- Keyboard navigation throughout
- Screen reader support
- Focus indicators
- ARIA labels
- High contrast mode support

### 9. Performance & Reliability

#### Rendering Optimization
- Debounced preview updates (200ms)
- Incremental rendering for large documents
- MathJax typesetting throttle
- Lazy loading for snippet palette

#### Security
- HTML sanitization (prevent XSS)
- Safe subset of HTML tags
- No script execution in preview
- Sandboxed iframe for preview (optional)

#### Browser Compatibility
- Chrome/Edge (Chromium) - full support
- Firefox - full support
- Safari - full support
- Mobile browsers - basic support

#### Data Persistence
- IndexedDB for document storage
- LocalStorage for preferences
- Export/backup functionality
- No data sent to servers (100% client-side)

## Non-Goals

1. **Real-time collaboration** - No multi-user editing
2. **Cloud sync** - All data stays local
3. **Version control** - No git integration or history
4. **Plugin system** - No extensibility API
5. **Mobile app** - Web-only, though responsive
6. **Advanced LaTeX** - Focus on math, not full LaTeX documents (figures, citations, etc.)
7. **WYSIWYG editing** - Keep source/preview split
8. **AI assistance** - No built-in AI features

## Success Criteria

1. **Usability**: Users can create and edit math-heavy documents efficiently
2. **Reliability**: No data loss, handles long documents without freezing
3. **Performance**: Preview renders within 300ms for typical documents
4. **Compatibility**: Successfully renders ChatGPT-pasted content 95%+ of the time
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Deployment**: Deployable to GitHub Pages with zero backend costs

## Future Enhancements (Post-MVP)

- Custom snippet creation
- Snippet import/export
- Multiple themes
- Configurable keyboard shortcuts
- Spell checking
- Diagram support (Mermaid, TikZ preview)
- BibTeX citation support
- Presentation mode (slides from markdown)
- Export to LaTeX source

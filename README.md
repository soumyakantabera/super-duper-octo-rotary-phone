# Markdown + LaTeX Document Editor

A free, browser-based document editor with Overleaf-like features for writing Markdown documents with embedded LaTeX mathematics. Fully client-side with no backend required.

![Document Manager](https://github.com/user-attachments/assets/e81918e5-da59-469c-a55b-1d35a2a7fb93)
![Editor View](https://github.com/user-attachments/assets/64ef514d-da76-41a2-9457-4843ffcecead)
![Editor with Content](https://github.com/user-attachments/assets/4ebda929-7e2d-45fe-b2a5-a825941534dc)

## Features

### Core Functionality
- **Split-pane interface** with live preview
  - Editor pane with CodeMirror 6
  - Real-time Markdown + LaTeX preview
  - Resizable LaTeX snippet palette
- **Markdown Support**
  - CommonMark + GitHub-Flavored Markdown (tables, task lists, strikethrough)
  - Syntax highlighting for code blocks
  - Inline and fenced code blocks
- **LaTeX Math Rendering**
  - Inline math: `$...$` or `\(...\)`
  - Display math: `$$...$$` or `\[...\]`
  - MathJax v3 for high-quality typesetting
  - Full LaTeX math command support

### LaTeX Snippet Palette
Comprehensive library of LaTeX snippets organized by category:
- **Fractions & Roots**: `\frac`, `\sqrt`, nth roots
- **Matrices & Vectors**: bmatrix, pmatrix, vectors
- **Operators**: summation, product, integral, limit
- **Greek Letters**: α, β, γ, δ, and more
- **Sets & Logic**: ∈, ⊂, ∪, ∩, ∀, ∃, ⇒
- **Calculus**: derivatives, partial derivatives, ∇, Δ
- **Probability**: 𝔼, Var, Cov, 𝒩
- **Brackets**: Auto-sizing parentheses, brackets, braces
- **Subscripts/Superscripts**: x², x_i, x_i^n

**Snippet Features:**
- Searchable by name or keyword
- One-click insertion at cursor
- Favorites marking
- Visual preview of each snippet

### Document Management
- **Create, edit, delete** documents
- **Auto-save** to IndexedDB (every 2 seconds)
- **Document list** with metadata (word count, last modified)
- **Export** to:
  - Markdown (.md)
  - HTML (.html with embedded MathJax)
  - PDF (via browser print)
- **Import** Markdown files
- **Local storage** - all data stays in your browser

### Editor Features
- **Line numbers** and syntax highlighting
- **Word count**, character count, reading time
- **Toggle preview** pane for focused writing
- **Light/Dark mode** with persistent preference
- **Keyboard shortcuts** (Ctrl+B, Ctrl+I, etc.)

### ChatGPT Compatibility
- Paste ChatGPT output directly
- Handles markdown, code blocks, tables, and math
- Preserves formatting and structure

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **CodeMirror 6** - Code editor
- **unified/remark/rehype** - Markdown processing
- **MathJax v3** - LaTeX rendering
- **IndexedDB (idb)** - Document storage
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/soumyakantabera/super-duper-octo-rotary-phone.git
cd super-duper-octo-rotary-phone

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy

Deploy to any static hosting service:

#### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from the dist/ directory
```

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

## Usage

### Creating a Document
1. Click **"New Document"**
2. Enter a title
3. Start writing!

### Writing Markdown
Use standard Markdown syntax:
```markdown
# Heading 1
## Heading 2

**Bold text** and *italic text*

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link](https://example.com)

`inline code`

\`\`\`python
# Code block
print("Hello, world!")
\`\`\`
```

### Adding Math
Use dollar signs or LaTeX delimiters:

**Inline math:**
```
The equation $E = mc^2$ shows...
or
The equation \(E = mc^2\) shows...
```

**Display math:**
```
$$
\int_a^b f(x) dx = F(b) - F(a)
$$

or

\[
\int_a^b f(x) dx = F(b) - F(a)
\]
```

### Using Snippets
1. Browse the LaTeX Snippets panel on the right
2. Search for a snippet (e.g., "matrix", "integral")
3. Click **"Insert"** to add it to your document
4. Star your favorites for quick access

### Exporting Documents
1. Click the download icon in the top bar
2. Choose format:
   - **Markdown** - Plain .md file
   - **HTML** - Self-contained HTML with MathJax

## Project Structure

```
/
├── docs/                    # Documentation
│   ├── SPEC.md             # Product specification
│   ├── ARCHITECTURE.md     # Technical architecture
│   ├── DATA_MODEL.md       # Data structures
│   └── RENDERING.md        # Rendering pipeline
├── src/
│   ├── components/         # React components
│   │   ├── Editor/         # CodeMirror editor
│   │   ├── Preview/        # Markdown preview
│   │   ├── SnippetPalette/ # LaTeX snippets
│   │   ├── DocumentManager/# Document CRUD
│   │   ├── Layout/         # Top bar, status bar
│   │   └── UI/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   │   ├── storage/        # IndexedDB interface
│   │   ├── markdown/       # Markdown processor
│   │   ├── export/         # Export functionality
│   │   └── utils/          # Helper functions
│   ├── types/              # TypeScript types
│   └── App.tsx             # Main app component
└── README.md               # This file
```

## Browser Support

- ✅ Chrome/Edge (Chromium) - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support
- ⚠️ Mobile browsers - Basic support (desktop recommended)

## Features Roadmap

- [ ] Custom snippet creation
- [ ] Collaborative editing
- [ ] Cloud sync option
- [ ] Diagram support (Mermaid)
- [ ] Spell checking
- [ ] BibTeX citations
- [ ] Multiple themes
- [ ] Find and replace
- [ ] Document templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [CodeMirror](https://codemirror.net/) - Excellent code editor
- [MathJax](https://www.mathjax.org/) - Beautiful math typesetting
- [unified](https://unifiedjs.com/) - Markdown processing
- [React](https://react.dev/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/soumyakantabera/super-duper-octo-rotary-phone/issues) on GitHub.

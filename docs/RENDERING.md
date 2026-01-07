# Rendering Pipeline Documentation

## Overview

This document describes the rendering pipeline that transforms Markdown + LaTeX input into a visually rendered preview with properly typeset mathematics, syntax-highlighted code, and sanitized HTML.

## Pipeline Architecture

The rendering pipeline consists of several stages:

```
Raw Markdown Input
    ↓
[1] Markdown Parsing (remark-parse)
    ↓
[2] Markdown AST Transformations
    ├→ remark-gfm (tables, strikethrough, task lists)
    └→ remark-math (LaTeX math parsing)
    ↓
[3] Markdown → HTML (remark-rehype)
    ↓
[4] HTML AST Transformations
    ├→ rehype-sanitize (security)
    ├→ rehype-highlight (syntax highlighting)
    └→ rehype-mathjax (MathJax integration)
    ↓
[5] HTML String Generation (rehype-stringify)
    ↓
[6] DOM Rendering (React)
    ↓
[7] MathJax Typesetting
    ↓
Rendered Preview
```

## Stage 1: Markdown Parsing

### Tool: `remark-parse`

Converts raw Markdown string into an Abstract Syntax Tree (AST).

**Input**: Raw Markdown string
```markdown
# Title

This is **bold** text with math: $E = mc^2$
```

**Output**: MDAST (Markdown AST)
```json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [{"type": "text", "value": "Title"}]
    },
    {
      "type": "paragraph",
      "children": [
        {"type": "text", "value": "This is "},
        {"type": "strong", "children": [{"type": "text", "value": "bold"}]},
        {"type": "text", "value": " text with math: "},
        {"type": "inlineMath", "value": "E = mc^2"}
      ]
    }
  ]
}
```

## Stage 2: Markdown AST Transformations

### remark-gfm (GitHub-Flavored Markdown)

Adds support for:
- **Tables**: Pipe-separated tables with alignment
- **Strikethrough**: `~~text~~`
- **Task lists**: `- [ ]` and `- [x]`
- **Autolinks**: URLs become clickable
- **Footnotes**: `[^1]` references

**Example**:
```markdown
| Col1 | Col2 |
|------|------|
| A    | B    |

~~strikethrough~~
- [x] Done
- [ ] Todo
```

### remark-math

Identifies and parses LaTeX math syntax:

**Inline Math**:
- `$...$` → `{type: 'inlineMath', value: '...'}`
- `\(...\)` → `{type: 'inlineMath', value: '...'}`

**Display Math**:
- `$$...$$` → `{type: 'math', value: '...'}`
- `\[...\]` → `{type: 'math', value: '...'}`

**Configuration**:
```javascript
{
  singleDollarTextMath: true,  // Enable $ for inline math
  inlineMathDouble: false,      // Disable $$ for inline
}
```

## Stage 3: Markdown → HTML Transformation

### Tool: `remark-rehype`

Converts Markdown AST to HTML AST (HAST).

**Configuration**:
```javascript
{
  allowDangerousHtml: false,  // Strict mode
  passThrough: ['math', 'inlineMath']  // Preserve math nodes
}
```

**AST Transformation**:
- `heading` → `<h1>`, `<h2>`, etc.
- `paragraph` → `<p>`
- `strong` → `<strong>`
- `emphasis` → `<em>`
- `link` → `<a>`
- `image` → `<img>`
- `code` → `<code>`
- `codeBlock` → `<pre><code>`
- `table` → `<table>`, `<tr>`, `<td>`

## Stage 4: HTML AST Transformations

### rehype-sanitize (Security)

Removes dangerous HTML elements and attributes to prevent XSS attacks.

**Allowed Elements**:
```javascript
{
  tagNames: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'div', 'span', 'br',
    'strong', 'em', 'u', 's', 'code', 'pre',
    'a', 'img',
    'ul', 'ol', 'li',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'blockquote', 'hr',
    'sup', 'sub'
  ]
}
```

**Allowed Attributes**:
```javascript
{
  attributes: {
    a: ['href', 'title', 'target'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    td: ['align'],
    th: ['align'],
    code: ['className'],  // For syntax highlighting
    pre: ['className'],
    div: ['className'],   // For math blocks
    span: ['className']   // For math inline
  }
}
```

**Blocked**:
- `<script>` tags
- `onclick`, `onerror`, event handlers
- `javascript:` URLs
- `data:` URLs (except whitelisted)
- `<iframe>`, `<object>`, `<embed>`

### rehype-highlight (Code Syntax Highlighting)

Applies syntax highlighting to code blocks.

**Supported Languages**:
- JavaScript/TypeScript
- Python
- Java, C, C++, C#
- Go, Rust
- HTML, CSS
- SQL
- Bash/Shell
- And many more via highlight.js

**Output**:
```html
<pre><code class="language-javascript hljs">
  <span class="hljs-keyword">const</span>
  <span class="hljs-variable">x</span> =
  <span class="hljs-number">42</span>;
</code></pre>
```

**Configuration**:
```javascript
{
  detect: true,        // Auto-detect language
  subset: false,       // Include all languages
  ignoreMissing: true  // Don't error on unknown languages
}
```

### rehype-mathjax (MathJax Integration)

Prepares math nodes for MathJax rendering.

**Inline Math** (`inlineMath` node):
```html
<span class="math-inline">$$E = mc^2$$</span>
```

**Display Math** (`math` node):
```html
<div class="math-display">$$\int_a^b f(x) dx$$</div>
```

**Configuration**:
```javascript
{
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  }
}
```

## Stage 5: HTML String Generation

### Tool: `rehype-stringify`

Converts HTML AST back to HTML string.

**Configuration**:
```javascript
{
  allowDangerousHtml: false,
  closeSelfClosing: true,
  closeEmptyElements: true
}
```

**Output**: Safe HTML string ready for rendering.

## Stage 6: DOM Rendering

### React Component

The HTML string is rendered into the DOM using React's `dangerouslySetInnerHTML` (safe after sanitization).

```tsx
function Preview({ content }: { content: string }) {
  const html = useMarkdownRenderer(content);
  
  return (
    <div 
      className="preview-container"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

## Stage 7: MathJax Typesetting

### MathJax v3 Configuration

```javascript
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    packages: {
      '[+]': ['ams', 'newcommand', 'configmacros']
    }
  },
  svg: {
    fontCache: 'global'
  },
  startup: {
    typeset: false  // Manual typesetting
  }
};
```

### Typesetting Process

```typescript
async function typesetMath(element: HTMLElement) {
  if (window.MathJax && window.MathJax.typesetPromise) {
    try {
      await window.MathJax.typesetPromise([element]);
    } catch (err) {
      console.error('MathJax typesetting failed:', err);
    }
  }
}
```

### Incremental Typesetting

For performance, only typeset changed sections:

```typescript
function useIncrementalTypeset(content: string) {
  const prevContent = useRef(content);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (prevContent.current !== content && containerRef.current) {
      typesetMath(containerRef.current);
      prevContent.current = content;
    }
  }, [content]);
  
  return containerRef;
}
```

## Performance Optimizations

### 1. Debouncing

Prevent excessive rendering during rapid typing:

```typescript
const debouncedContent = useDebounce(rawContent, 200);
const html = useMarkdownRenderer(debouncedContent);
```

### 2. Memoization

Cache rendering results:

```typescript
const renderMarkdown = useMemo(() => {
  return createProcessor()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeMathjax)
    .use(rehypeStringify);
}, []);
```

### 3. Throttled MathJax

Limit MathJax calls:

```typescript
const throttledTypeset = useThrottle((element: HTMLElement) => {
  typesetMath(element);
}, 300);
```

### 4. Worker Processing (Future)

Offload heavy processing to Web Worker:

```typescript
// worker.ts
self.addEventListener('message', async (e) => {
  const html = await processMarkdown(e.data.content);
  self.postMessage({ html });
});
```

## Error Handling

### Markdown Parsing Errors

```typescript
try {
  const html = await processor.process(content);
  return String(html);
} catch (error) {
  console.error('Markdown parsing error:', error);
  return '<div class="error">Failed to render content</div>';
}
```

### MathJax Errors

```typescript
window.MathJax = {
  options: {
    renderActions: {
      handleError: (math, doc, node) => {
        console.error('Math error:', math.math, math.error);
        // Show error in preview
        node.innerHTML = `<span class="math-error" title="${math.error}">
          ${math.math}
        </span>`;
      }
    }
  }
};
```

## Testing the Pipeline

### Unit Tests

```typescript
describe('Markdown Rendering', () => {
  it('renders basic markdown', async () => {
    const input = '# Hello\n\nThis is **bold**';
    const output = await renderMarkdown(input);
    expect(output).toContain('<h1>Hello</h1>');
    expect(output).toContain('<strong>bold</strong>');
  });
  
  it('renders inline math', async () => {
    const input = 'Equation: $E = mc^2$';
    const output = await renderMarkdown(input);
    expect(output).toContain('E = mc^2');
  });
  
  it('sanitizes dangerous HTML', async () => {
    const input = '<script>alert("xss")</script>';
    const output = await renderMarkdown(input);
    expect(output).not.toContain('<script>');
  });
});
```

### Integration Tests

```typescript
describe('Full Rendering Pipeline', () => {
  it('handles ChatGPT-style content', async () => {
    const input = `
# Math Example

Consider the function:

$$f(x) = \\int_0^x t^2 dt$$

The code:

\`\`\`python
def integrate(x):
    return x**3 / 3
\`\`\`

| Input | Output |
|-------|--------|
| 3     | 9      |
`;
    
    const output = await renderMarkdown(input);
    expect(output).toContain('<h1>Math Example</h1>');
    expect(output).toContain('\\int_0^x t^2 dt');
    expect(output).toContain('language-python');
    expect(output).toContain('<table>');
  });
});
```

## Rendering Examples

### Example 1: Mixed Content

**Input**:
```markdown
# Vector Calculus

The gradient of a scalar field $f$ is:

$$\nabla f = \frac{\partial f}{\partial x}\mathbf{i} + \frac{\partial f}{\partial y}\mathbf{j}$$

Example code:
\`\`\`python
import numpy as np

def gradient(f, x, y, h=1e-5):
    df_dx = (f(x+h, y) - f(x, y)) / h
    df_dy = (f(x, y+h) - f(x, y)) / h
    return np.array([df_dx, df_dy])
\`\`\`
```

**Output**: Properly formatted heading, inline math, display math, and highlighted Python code.

### Example 2: Tables with Math

**Input**:
```markdown
| Function | Derivative |
|----------|------------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\frac{1}{x}$ |
```

**Output**: Table with properly rendered inline LaTeX in cells.

### Example 3: Nested Lists with Code

**Input**:
```markdown
1. Setup environment
   - Install Python
   - Run `pip install numpy`
2. Write code
   ```python
   import numpy as np
   x = np.array([1, 2, 3])
   ```
3. Execute
```

**Output**: Nested list with inline code and code block properly rendered.

## Troubleshooting

### Issue: Math not rendering
- Check MathJax is loaded
- Verify math delimiters
- Check browser console for errors
- Ensure typeset is called after DOM update

### Issue: Code highlighting broken
- Verify language identifier is correct
- Check highlight.js is loaded
- Ensure CSS for highlighting is included

### Issue: XSS vulnerability
- Always use rehype-sanitize
- Never use `dangerouslySetInnerHTML` without sanitization
- Test with malicious inputs

### Issue: Performance degradation
- Increase debounce delay
- Reduce MathJax typesetting frequency
- Profile with browser DevTools
- Consider lazy loading for large documents

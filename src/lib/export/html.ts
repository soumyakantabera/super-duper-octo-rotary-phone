import type { Document } from '../../types/document';
import { processMarkdown } from '../markdown/processor';

export async function exportHTML(doc: Document): Promise<void> {
  const content = await processMarkdown(doc.content);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${doc.title}</title>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
    }
    h1 { font-size: 2em; }
    h2 { font-size: 1.5em; }
    h3 { font-size: 1.25em; }
    code {
      background: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
    }
    pre {
      background: #f4f4f4;
      padding: 1em;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 0.5em;
      text-align: left;
    }
    th {
      background: #f4f4f4;
      font-weight: 600;
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 1em;
      margin-left: 0;
      color: #666;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>${doc.title}</h1>
  ${content}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.title}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import type { Document } from '../../types/document';

export function exportMarkdown(doc: Document): void {
  const blob = new Blob([doc.content], { type: 'text/markdown' });
  downloadFile(blob, `${doc.title}.md`);
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

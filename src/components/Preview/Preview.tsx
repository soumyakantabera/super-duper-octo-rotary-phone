import { useEffect, useRef, useState } from 'react';
import { processMarkdown } from '../../lib/markdown/processor';
import { useDebounce } from '../../hooks/useDebounce';

interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  const [html, setHtml] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedContent = useDebounce(content, 200);

  useEffect(() => {
    let mounted = true;

    async function render() {
      const rendered = await processMarkdown(debouncedContent);
      if (mounted) {
        setHtml(rendered);
      }
    }

    render();

    return () => {
      mounted = false;
    };
  }, [debouncedContent]);

  useEffect(() => {
    // Typeset math with MathJax after content updates
    if (containerRef.current && window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise([containerRef.current]).catch((err: Error) => {
        console.error('MathJax typesetting failed:', err);
      });
    }
  }, [html]);

  return (
    <div 
      ref={containerRef}
      className="preview-container h-full overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

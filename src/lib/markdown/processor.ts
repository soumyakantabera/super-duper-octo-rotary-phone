import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeMathjax from 'rehype-mathjax';

// Create a safe sanitization schema
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [
      ...(defaultSchema.attributes?.div || []),
      'className',
    ],
    span: [
      ...(defaultSchema.attributes?.span || []),
      'className',
    ],
    code: [
      ...(defaultSchema.attributes?.code || []),
      'className',
    ],
    pre: [
      ...(defaultSchema.attributes?.pre || []),
      'className',
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'svg',
    'path',
    'g',
    'defs',
    'use',
    'mjx-container',
    'mjx-math',
  ],
};

export async function processMarkdown(content: string): Promise<string> {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: false })
      .use(rehypeSanitize, sanitizeSchema)
      .use(rehypeHighlight, { 
        detect: true,
        ignoreMissing: true 
      })
      .use(rehypeMathjax)
      .use(rehypeStringify);

    const result = await processor.process(content);
    return String(result);
  } catch (error) {
    console.error('Markdown processing error:', error);
    return '<div class="error">Failed to render content</div>';
  }
}

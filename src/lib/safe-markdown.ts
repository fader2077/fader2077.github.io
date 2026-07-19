import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const renderSafeMarkdown = async (markdown: string) => sanitizeHtml(await marked.parse(markdown), {
  allowedTags: ['h1', 'h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'],
  allowedAttributes: { a: ['href', 'target', 'rel'] },
  allowedSchemes: ['https', 'mailto'],
  transformTags: {
    a: (_tagName, attributes) => {
      const attribs: Record<string, string> = {};
      if (attributes.href?.startsWith('https://') || attributes.href?.startsWith('mailto:')) {
        attribs.href = attributes.href;
        attribs.target = '_blank';
        attribs.rel = 'noopener noreferrer';
      }

      return { tagName: 'a', attribs };
    },
  },
});

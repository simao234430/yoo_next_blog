import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { formatDate } from './src/app/components/libs/formatDate';
import { rehypePrettyCodeOptions } from './src/app/components/libs/rehypePrettyCode';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
 
 
import { visit } from 'unist-util-visit';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: 'posts/*.mdx',
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    publishedAtFormatted: {
      type: 'string',
      resolve: (doc) => {
        return formatDate(doc.publishedAt);
      },
    },
  },
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    metaTitle: {
      type: 'string',
    },
    metaDesc: {
      type: 'string',
    },
    summary: {
      type: 'string',
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    imageSrc: {
      type: 'string',
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      // () => (tree) => {
      //   visit(tree, (node) => {
      //     if (node?.type === 'element' && node?.tagName === 'pre') {
      //       const [codeEl] = node.children;

      //       if (codeEl.tagName !== 'code') return;

      //       node.raw = codeEl.children?.[0].value;
      //     }
      //   });
      // },
      [rehypePrettyCode, rehypePrettyCodeOptions],
      // () => (tree) => {
      //   visit(tree, (node) => {
      //     if (node?.type === 'element' && node?.tagName === 'div') {
      //       if (!('data-rehype-pretty-code-fragment' in node.properties)) {
      //         return;
      //       }

      //       for (const child of node.children) {
      //         if (child.tagName === 'pre') {
      //           child.properties['raw'] = node.raw;
      //         }
      //       }
      //     }
      //   });
      // },
      // [
      //   rehypeExternalLinks,
      //   {
      //     target: '_blank',
      //     rel: ['noopener', 'noreferrer', 'nofollow'],
      //   },
      // ],
    ],
  },
});

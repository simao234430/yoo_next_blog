import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { formatDate } from './src/app/components/libs/formatDate';
import { rehypePrettyCodeOptions } from './src/app/components/libs/rehypePrettyCode';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
 
import { visit } from 'unist-util-visit';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  contentType: 'mdx',
  filePathPattern: 'docs/**/*.mdx',
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

export const Example = defineDocumentType(() => ({
  name: 'Example',
  contentType: 'mdx',
  filePathPattern: 'examples/**/*.mdx',
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
  documentTypes: [Post,Example,Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions,rehypeSlug],
    ],
  },
});

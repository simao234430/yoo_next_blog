import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { formatDate } from './src/app/components/libs/formatDate';
import { rehypePrettyCodeOptions } from './src/app/components/libs/rehypePrettyCode';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { bundleMDX } from 'mdx-bundler'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'

type DocHeading = { level: 1 | 2 | 3; title: string }
 


const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      for (const element of node.children.filter((_: any) => _.type === 'heading' || _.name === 'OptionsTable')) {
        if (element.type === 'heading') {
          const title = toMarkdown({ type: 'paragraph', children: element.children }, { extensions: [mdxToMarkdown()] })
            .trim()
            .replace(/<.*$/g, '')
            .replace(/\\/g, '')
            .trim()
          headings.push({ level: element.depth, title })
        } else if (element.name === 'OptionsTable') {
          element.children
            .filter((_: any) => _.name === 'OptionTitle')
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((_: any) => _.type === 'heading')
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: 'paragraph', children: heading.children },
                    { extensions: [mdxToMarkdown()] },
                  )
                    .trim()
                    .replace(/<.*$/g, '')
                    .replace(/\\/g, '')
                    .trim()
                  headings.push({ level: heading.depth, title })
                })
            })
        }
      }
    }
  }

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
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const headings: DocHeading[] = []

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [...(opts.remarkPlugins ?? []), tocPlugin(headings)]
            return opts
          },
        })

        return [{ level: 1, title: doc.title }, ...headings]
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

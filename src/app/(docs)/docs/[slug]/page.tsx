import { allDocs } from 'contentlayer/generated'

import { notFound } from 'next/navigation'
import { Params } from '@/src/app/types'
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import MarkdownContent from '@/src/app/components/common/MDXComponents'
// import Sidebar from '@/src/app/components/Sidebar';
import { createOgImage } from '@/src/app/components/libs/createOGImage'
import randomFiveDigitNumber from '@/src/app/components/libs/generateFiveDigitNumber'

// function getSupportingProps(doc: Doc, params: any) {
//   let slugs = params.slug ? ['docs', ...params.slug] : []
//   const tree = buildDocsTree(allDocs)
//   const childrenTree = buildDocsTree(
//     allDocs,
//     doc.pathSegments.map((_: PathSegment) => _.pathName),
//   )
//   return { tree }
// }
// export const getServerSideProps = defineServerSideProps(async (context) => {
// }

import type { Metadata } from 'next'
import { PageNavigation } from '@/src/app/components/PageNavigation'
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const post = allDocs.find((post) => post.slug === params.slug)
  const ogImage = createOgImage({
    title: post?.title || '',
    meta: [post?.summary].join(''),
  })
  return {
    title: `${post?.title} | Vishwanath B.`,
    description: `${post?.summary}`,
    openGraph: {
      images: [
        {
          url: `${ogImage}?${randomFiveDigitNumber()}`,
          width: 1600,
          height: 836,
          alt: post?.title,
        },
      ],
      title: post?.title,
      description: post?.summary,
      url: `${process.env.NEXT_PUBLIC_URL}/${post?.slug}`,
      type: 'article',
    },
    twitter: {
      title: `${post?.title}`,
      description: `${post?.summary}`,
      card: 'summary_large_image',
    },
  }
}

export async function generateStaticParams() {
  return allDocs.map((post) => ({
    slug: post.slug,
  }))
}

const PageLayout = async ({ params }: PageProps) => {
 
  // export default async function PostPage({ params }: { params: Params }) {
  const post = allDocs.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }
  return (
    <div className="flex    justify-evenly space-x-10 p-4 2xl:py-8 2xl:px-10">
      <div className="w-ful    prose  dark:prose-invert prose-a:text-sky-500 dark:prose-p:text-slate-400  ">
        <header className="mb-4">
          <h1 className="mb-0 dark:text-zinc-100 text-3xl md:text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center mt-2">
            <span className="text-slate-600 dark:text-slate-400 rounded text-base inline-block">
              {post.publishedAtFormatted}
            </span>
            <span className="mx-3">-</span>
            {/* <ViewCounter trackView slug={post.slug} /> */}
          </div>
        </header>
        <div>{/* <PageNavigation headings={post.headings} /> */}</div>
        <article className="m-auto mb-4 sm:mb-8">
          <div className="js-toc-content">
            <MarkdownContent code={post.body.code} />
          </div>
        </article>
      </div>

      <div className="hidden 2xl:block 2xl:w-1/6 ">
        <PageNavigation headings={post.headings} />

  
      </div>
    </div>
  )
}

export default PageLayout

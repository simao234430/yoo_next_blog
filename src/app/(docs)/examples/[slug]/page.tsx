import { allExamples} from 'contentlayer/generated';
 
import { notFound } from 'next/navigation';
import { Params } from '@/src/app/types';
 
import MarkdownContent from '@/src/app/components/common/MDXComponents';
import {ExampleSidebar} from '@/src/app/components/Sidebar';
import { createOgImage } from '@/src/app/components/libs/createOGImage';
import randomFiveDigitNumber from '@/src/app/components/libs/generateFiveDigitNumber';
import type { Metadata } from 'next';
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = allExamples.find((post) => post.slug === params.slug);
  const ogImage = createOgImage({
    title: post?.title || '',
    meta: [post?.summary].join(''),
  });
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
  };
}

export async function generateStaticParams() {
  return allExamples.map((post) => ({
    slug: post.slug,
  }));
}


export default function PostPage({ params }: { params: Params }) {
  const post = allExamples.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }
  return (
    <div className="lg:grid lg:grid-cols-12">
      {/* <ExampleSidebar /> */}
      <div className="md:col-span-7 prose prose-slate dark:prose-invert prose-a:text-sky-500 dark:prose-p:text-slate-400 md:text-lg sm:mx-auto py-4 md:p-0">
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

        <article className="m-auto mb-4 sm:mb-8">
          <MarkdownContent code={post.body.code} />
        </article>

        <footer>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/FrozenHearth/portfolio/blob/main/content/posts/${post.slug}.mdx`}
          >
            View on Github
          </a>
        </footer>
      </div>
    </div>
  );
}
// This page component handles both WordPress pages and posts based on the slug in the URL.
// It uses the generateStaticParams function to pre-generate static paths for all pages and posts.
// The main component fetches the page data first, and if not found, it tries to fetch a post with the same slug.
// If a page is found, it renders the page content. If a post is found, it renders the post content along with the featured image.


import FAQ from "@/components/sections/FAQ";
import News from "@/components/sections/News";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_PAGES, GET_PAGE, GET_POST_BY_SLUG, GET_POSTS } from "@/lib/wordpress/queries";
import { SinglePostResponse, Post, PostsResponse } from "@/types/types";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const [pagesRes, postsRes] = await Promise.all([
    fetchGraphQL<any>(GET_PAGES),
    fetchGraphQL<PostsResponse>(GET_POSTS),
  ]);

  const pages = pagesRes?.pages?.nodes?.map((page: { slug: string }) => ({ slug: page.slug })) ?? [];
  const posts = postsRes?.posts?.nodes?.map((post: Post) => ({ slug: post.slug })) ?? [];

  return [...pages, ...posts];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try WordPress page first
  const pageRes = await fetchGraphQL<any>(GET_PAGE, { slug });
  const page = pageRes?.pageBy;

  if (page) {
    return (
      <main className="w-full min-h-screen" style={{ background: "var(--color-background)" }}>
        <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--layout-content)" }}>
          <h1
            className="font-heading mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, var(--text-4xl))", color: "var(--color-primary)", lineHeight: 1.2 }}
          >
            {page.title}
          </h1>
          {page.content && (
            <div
              className="font-body leading-relaxed"
              style={{ fontSize: "clamp(1rem, 3vw, var(--text-lg))", color: "var(--color-primary)" }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}
        </div>
        {slug === "faq" && <FAQ />}
        {slug === "news" && <News />}
      </main>
    );
  }

  // Try WordPress post
  const postRes = await fetchGraphQL<SinglePostResponse>(GET_POST_BY_SLUG, { slug });
  const post = postRes?.post;

  if (!post) return notFound();

  const image = post.featuredImage?.node;

  return (
    <main className="w-full min-h-screen" style={{ background: "var(--color-background)" }}>
      {image?.mediaItemUrl && (
        <div className="relative w-full overflow-hidden" style={{ height: "50vh" }}>
          <Image
            src={image.mediaItemUrl}
            alt={image.altText || post.title || ""}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--layout-content)" }}>
        {post.date && (
          <p
            className="font-body font-semibold uppercase tracking-widest mb-4"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
          >
            {new Date(post.date).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        <h1
          className="font-heading mb-8"
          style={{ fontSize: "clamp(2rem, 6vw, var(--text-4xl))", color: "var(--color-primary)", lineHeight: 1.2 }}
        >
          {post.title}
        </h1>
        <div
          className="font-body leading-relaxed"
          style={{ fontSize: "var(--text-base)", color: "var(--color-black)", opacity: 0.85 }}
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
        <a
          href="/news"
          className="inline-block mt-12 font-body uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
          style={{ fontSize: "var(--text-xs)", color: "var(--color-primary)", borderBottom: "1px solid var(--color-primary)" }}
        >
          ← Back to news
        </a>
      </div>
    </main>
  );
}
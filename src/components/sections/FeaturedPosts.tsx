// This component fetches and displays featured posts from WordPress.
//  It shows the post's featured image, title, date, and excerpt. Each post links to its individual page.
// featuredPosts is a custom field in WordPress that marks certain posts as featured. 
// The component filters the posts to only show those marked as featured.
import Image from "next/image";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_FEATURED_POSTS } from "@/lib/wordpress/queries";
import { Post, PostsResponse } from "@/types/types";

export default async function FeaturedPosts() {
  const res = await fetchGraphQL<PostsResponse>(GET_FEATURED_POSTS);
  const posts: Post[] = res?.posts?.nodes?.filter((p) => p.featuredPosts?.featured) ?? [];

  if (!posts.length) return null;

  return (
    <section className="w-full py-20" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--layout-wide)" }}>

        {/* Section header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p
              className="font-body font-semibold tracking-widest uppercase mb-3"
              style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
            >
              Featured
            </p>
            <h2
              className="font-heading"
              style={{ fontSize: "var(--text-4xl)", color: "var(--color-primary)" }}
            >
              Featured news
            </h2>
          </div>
          <Link
            href="/news"
            className="font-body uppercase tracking-widest transition-opacity duration-200 hover:opacity-60 shrink-0"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-primary)", borderBottom: "1px solid var(--color-primary)" }}
          >
            View all
          </Link>
        </div>

        {/* Posts */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => {
            const image = post.featuredImage?.node;
            return (
              <li key={index} className="group flex flex-col">
                <Link href={`/${post.slug}`}>

                  {/* Image */}
                  <div
                    className="relative overflow-hidden mb-4"
                    style={{ aspectRatio: "2/1", borderRadius: "var(--radius-sm)" }}
                  >
                    {image?.mediaItemUrl ? (
                      <Image
                        src={image.mediaItemUrl}
                        alt={image.altText || post.title || ""}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="50vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: "var(--color-primary)", opacity: 0.1 }}
                      />
                    )}
                  </div>

                  {/* Date */}
                  {post.date && (
                    <p
                      className="font-body font-semibold uppercase tracking-widest mb-2"
                      style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
                    >
                      {new Date(post.date).toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}

                  {/* Title */}
                  {post.title && (
                    <h3
                      className="font-heading mb-2 group-hover:opacity-70 transition-opacity duration-200"
                      style={{ fontSize: "var(--text-xl)", color: "var(--color-primary)" }}
                    >
                      {post.title}
                    </h3>
                  )}

                  {/* Excerpt */}
                  {post.excerpt && (
                    <div
                      className="font-body line-clamp-3 leading-relaxed"
                      style={{ fontSize: "var(--text-sm)", color: "var(--color-black)", opacity: 0.7 }}
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}

                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
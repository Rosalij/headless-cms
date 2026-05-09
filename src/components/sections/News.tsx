// This component fetches and displays recent news posts from WordPress.
// It shows the post's featured image, title, date, and excerpt. Each post links to its individual page.
import Image from "next/image";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_POSTS } from "@/lib/wordpress/queries";
import { Post, PostsResponse } from "@/types/types";

export default async function News() {
  const res = await fetchGraphQL<PostsResponse>(GET_POSTS);
  const posts: Post[] = res?.posts?.nodes ?? [];

  if (!posts.length) return null;

  return (
    <section className="w-full" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--layout-wide)" }}>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const image = post.featuredImage?.node;
            return (
              <li key={index} className="group flex flex-col">
                <Link href={`/${post.slug}`}>

                  {/* Image */}
                  <div
                    className="relative w-full overflow-hidden mb-4"
                    style={{ aspectRatio: "16/9", borderRadius: "var(--radius-sm)" }}
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
                      className="font-body line-clamp-2 leading-relaxed"
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
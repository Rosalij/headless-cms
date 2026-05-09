// This is a dynamic page component for rendering WordPress pages based on their slug.
// It fetches the page data using GraphQL and displays the content accordingly.

import FAQ from "@/components/sections/FAQ";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_PAGES, GET_PAGE } from "@/lib/wordpress/queries";

export async function generateStaticParams() {
  const res = await fetchGraphQL<any>(GET_PAGES);
  return res?.pages?.nodes?.map((page: { slug: string }) => ({
    slug: page.slug,
  })) ?? [];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetchGraphQL<any>(GET_PAGE, { slug });
  const page = res?.pageBy;

  if (!page) return <p>Page not found</p>;

  return (
    <main
      className="w-full min-h-screen pt-24"
      style={{ background: "var(--color-background)" }}
    >
      <div
        className="mx-auto px-6 py-12"
        style={{ maxWidth: "var(--layout-content)" }}
      >
        <h1
          className="font-heading mb-6"
          style={{
            fontSize: "clamp(2rem, 6vw, var(--text-4xl))",
            color: "var(--color-secondary)",
            lineHeight: 1.2,
          }}
        >
          {page.title}
        </h1>

        {page.content && (
          <div
            className="font-body leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 3vw, var(--text-lg))",
              color: "var(--color-primary)",
              letterSpacing: "0.5px",
            }}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}

        {slug === "faq" && <FAQ />}
      </div>
    </main>
  );
}
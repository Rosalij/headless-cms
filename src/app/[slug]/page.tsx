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
      className="mx-auto m-16 text-center w-screen gap-12"
        style={{ width: "100%" }}
    >
        <div style={{ background: "var(--color-background)" }} className="mx-auto px-6 py-20">
      <h1
        className="font-heading mb-8 w-full"
        style={{ fontSize: "var(--text-4xl)", color: "var(--color-primary)" }}
      >
        {page.title}
      </h1>
      <div
        className="font-body leading-relaxed"
        style={{ fontSize: "var(--text-base)", color: "var(--color-black)" }}
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
       {/* Show FAQ component on faq page */}
      {slug === "faq" && <FAQ />}
  </div>  </main>
  );
}
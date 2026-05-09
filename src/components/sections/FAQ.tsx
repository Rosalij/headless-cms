import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_FAQS } from "@/lib/wordpress/queries";
import { Faq, FaqResponse } from "@/types/types";
import FaqList from "@/components/sections/FaqList";

export default async function FAQ() {
  const res = await fetchGraphQL<FaqResponse>(GET_FAQS);
  const faqs: Faq[] = res?.faqs?.nodes?.map((n) => n.faqfields) ?? [];

  if (!faqs.length) return null;

  return (
    <section id="faq" className="w-full py-20" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--layout-content)" }}>

        <div className="mb-16">
          <p
            className="font-body font-semibold tracking-widest uppercase mb-3"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
          >
            FAQ
          </p>
       
        </div>

        <FaqList faqs={faqs} />

      </div>
    </section>
  );
}
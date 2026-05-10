// This is the FAQ section component for the application.
// It fetches FAQ data from WordPress using GraphQL and displays a list of FAQs using the FaqList component.

import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_FAQS } from "@/lib/wordpress/queries";
import { Faq, FaqResponse } from "@/types/types";
import FaqList from "@/components/sections/FaqList";

export default async function FAQ() {
  const res = await fetchGraphQL<FaqResponse>(GET_FAQS);
  const faqs: Faq[] = res?.faqs?.nodes?.map((n) => n.faqfields) ?? [];

  if (!faqs.length) return null;

  return (
    <section id="faq" className="w-full py-7" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-2" style={{ maxWidth: "var(--layout-content)" }}>

        <div className="mb-16">
      
        </div>

        <FaqList faqs={faqs} />

      </div>
    </section>
  );
}
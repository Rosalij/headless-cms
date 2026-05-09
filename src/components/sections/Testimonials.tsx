// This is the Testimonials section component for the application.
// It fetches testimonial data from WordPress using GraphQL and displays a grid of testimonials with quotes and authors.
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_TESTIMONIALS } from "@/lib/wordpress/queries";
import { Testimonial, TestimonialsResponse } from "@/types/types";

export default async function Testimonials() {
  const res = await fetchGraphQL<TestimonialsResponse>(GET_TESTIMONIALS);
  const testimonials: Testimonial[] = res?.testimonials?.nodes?.map((n) => n.testimonialFields) ?? [];

  if (!testimonials.length) return null;

  return (
    <section className="w-full py-20 overflow-hidden" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--layout-wide)" }}>

        {/* Section header */}
        <div className="mb-16">
          <p
            className="font-body font-semibold tracking-widest uppercase mb-3"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
          >
            Testimonials
          </p>
          <h2
            className="font-heading"
            style={{ fontSize: "var(--text-4xl)", color: "var(--color-primary)" }}
          >
            What our guests say
          </h2>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-2 p-3 group hover:scale-[1.02] transition-transform duration-300"
              style={{
                borderRadius: "var(--radius-sm)",
                borderBottom: "2px solid var(--color-secondary)",
                borderTop: "2px solid var(--color-secondary)",
               
             
              }}
            >
              {/* Big quote mark */}
              <span
                className="font-heading leading-none select-none"
                style={{
                  fontSize: "5rem",
                  color: "var(--color-secondary)",
              
                }}
              >
                "
              </span>

              {item.quote && (
                <p
                  className="font-body  leading-relaxed flex-1 "
                  style={{
                    fontSize: "var(--text-md)",
                    color: "var(--color-primary)",
                  }}
                >
                  {item.quote}
                </p>
              )}

              {item.quoteAuthor && (
                <div className="flex items-center gap-2 mt-auto pt-4" style={{ borderTop: "1px solid var(--color-background)" }}>
                 
                  <p
                    className="font-body font-semibold uppercase tracking-widest"
                    style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
                  >
                    {item.quoteAuthor}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
import Image from "next/image";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_CTA } from "@/lib/wordpress/queries";
import { Cta, CtaResponse } from "@/types/types";

export default async function CTA() {
  const res = await fetchGraphQL<CtaResponse>(GET_CTA);
  const cta: Cta = res?.ctas?.nodes?.[0]?.acfFields ?? {};

  const image = cta.ctaBackgroundImage?.node;

  return (
    <section id="contact" className="relative w-full py-50 overflow-hidden flex items-center justify-center"
    style={{ borderTop: "2px solid var(--color-secondary)", borderBottom: "2px solid var(--color-secondary)" }}>
      {/* Background image */}
      {image?.mediaItemUrl && (
        <Image
          src={image.mediaItemUrl}
          alt={image.altText ?? ""}
          fill
          className="object-cover object-middle"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--color-primary)", opacity: 0.4 }} />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-8 m-7 p-4 text-center"
        style={{ maxWidth: "var(--layout-content)" }}
      >
        {cta.ctaText && (
          <h2
            className="font-body"
            style={{
              fontSize: "clamp(1rem, 5vw, var(--text-2xl))",
              color: "var(--color-background)",
              lineHeight: 1.2,
          
            }}
          >
            {cta.ctaText}
          </h2>
        )}

        {cta.buttonLink && cta.buttonText && (
            <a
            href={cta.buttonLink}
            className="font-body transition-opacity duration-200 hover:opacity-90 px-8 py-2"
            style={{
                background: "var(--color-secondary)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              color: "var(--color-background)",
              border: "1px solid var(--color-background)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {cta.buttonText.toUpperCase()}
          </a>
        )}
      </div>
    </section>
  );
}
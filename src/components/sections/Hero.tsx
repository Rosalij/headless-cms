// This is the Hero section component for the application.
// It fetches the hero image and heading text from WordPress using GraphQL and displays them as a full-screen background image with an overlay for visual effect, along with the logotype if available.
import Image from "next/image";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_GLOBAL_SETTINGS } from "@/lib/wordpress/queries";
import { GlobalSettingsResponse, GlobalSettings } from "@/types/types";

export default async function Hero() {
  const res = await fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS);
  const settings: GlobalSettings = res?.allGlobalSettings?.nodes?.[0]?.globalsettingsfields ?? {};

  const image = settings.heroImage?.node;

  return (
    <section className="relative w-full h-screen bottom-16 bottom-0.5 flex items-center justify-center">
      {/* Background image */}
      {image?.mediaItemUrl && (
       <Image
  src={image.mediaItemUrl}
  alt={image.altText ?? "Hero"}
  fill
  className="object-cover object-[70%] md:object-center opacity-100"
  priority
/>
      )}
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--color-secondary)", opacity: 0.1 }} />
      {/* Content */}
      <div
        className="relative m-auto z-10 h-full flex flex-col items-center gap-30 justify-center"
        style={{ maxWidth: "var(--layout-wide)" }}
      >
        {settings.logotype?.node?.mediaItemUrl ? (
          <Image
            style={{ width: "20em" }}
            src={settings.logotype.node.mediaItemUrl}
            alt={settings.logotype.node.altText ?? "Logotype"}
            width={100}
            height={100}
            className="logo-hero object-contain"
          />
        ) : null}
        {settings.heroHeadingText && (
          <h1
            className="font-body uppercase font-bold text-center px-4"
            style={{
              fontSize: "clamp(1.5rem, 10vw, var(--text-2xl))",
              color: "var(--color-background)",
              letterSpacing: "0.04em",
            
              textDecorationColor: "var(--color-background)",
              textUnderlineOffset: "0.5em",
              textDecorationThickness: "1px",
            }}
          >
            {settings.heroHeadingText}
          </h1>
        )}
      </div>
    </section>
  );
}
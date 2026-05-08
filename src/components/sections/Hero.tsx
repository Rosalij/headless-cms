import Image from "next/image";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_GLOBAL_SETTINGS } from "@/lib/wordpress/queries";
import { GlobalSettingsResponse, GlobalSettings } from "@/types/types";

export default async function Hero() {
  const res = await fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS);
  const settings: GlobalSettings = res?.allGlobalSettings?.nodes?.[0]?.globalsettingsfields ?? {};

  const image = settings.heroImage?.node;

  return (
    <section className="relative w-full h-220 flex items-center justify-center">
      {/* Background image */}
      {image?.mediaItemUrl && (
        <Image
          src={image.mediaItemUrl}
          alt={image.altText ?? "Hero"}
          fill
          className="object-cover object-right md:object-center opacity-90"
          priority
        />
      )}

      {/* Content */}
      <div
        className="relative m-auto z-10 h-full flex flex-col items-center gap-15 bottom-20 justify-center"
        style={{ maxWidth: "var(--layout-wide)" }}
      >
        {settings.logotype?.node?.mediaItemUrl ? (
          <Image
            style={{ width: "18em" }}
            src={settings.logotype.node.mediaItemUrl}
            alt={settings.logotype.node.altText ?? "Logotype"}
            width={80}
            height={80}
            className="logo-hero object-contain"
          />
        ) : null}
        {settings.heroHeadingText && (
          <h1
            className="font-heading text-center px-4"
            style={{
              fontSize: "clamp(1.5rem, 5vw, var(--text-4xl))",
              color: "var(--color-background)",
              letterSpacing: "0.04em",
              textDecoration: "underline",
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
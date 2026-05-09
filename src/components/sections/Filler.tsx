import Image from "next/image";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_GLOBAL_SETTINGS } from "@/lib/wordpress/queries";
import { GlobalSettingsResponse, GlobalSettings } from "@/types/types";

export default async function Filler() {
  const res = await fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS);
  const settings: GlobalSettings = res?.allGlobalSettings?.nodes?.[0]?.globalsettingsfields ?? {};

  const image = settings.fillerImage?.node;

  if (!image?.mediaItemUrl) return null;

  return (
    <section className="relative w-full  h-110 py-80 overflow-hidden flex items-center justify-center ">
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
      <div className="absolute inset-0" style={{ background: "var(--color-primary)", opacity: 0.2 }} />
    </section>
    
  );
}
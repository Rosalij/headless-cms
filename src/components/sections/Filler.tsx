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
    <div className="relative w-full h-screen bottom-0 flex items-center justify-center " style={{borderTop: "2px solid var(--color-secondary)",}}>
          {/* Background image */}
          {image?.mediaItemUrl && (
            
            <Image
              src={image.mediaItemUrl}
              alt={image.altText ?? ""}
              fill
              className="object-cover object-bottom"
            />
          )}
          {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--color-primary)", opacity: 0.2 }} />
    </div>
    
  );
}
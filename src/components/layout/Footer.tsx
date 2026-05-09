// This is the Footer component for the application.
//  It fetches global settings from WordPress using GraphQL and displays the footer content accordingly.
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_GLOBAL_SETTINGS } from "@/lib/wordpress/queries";
import { GlobalSettingsResponse, GlobalSettings } from "@/types/types";

export default async function Footer() {
  const res = await fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS);
  const settings: GlobalSettings = res?.allGlobalSettings?.nodes?.[0]?.globalsettingsfields ?? {};

  return (
    <footer
      className="relative p-10 overflow-hiddenw-full border-1 p-7 left-0 right-0 "
        style={{borderTop: "10px solid var(--color-secondary)", background: "rgb(247, 204, 152)", color: "var(--color-black)"}}
    >
      <div
        className="mx-auto  px-6 flex flex-col items-center justify-between gap-6"
        style={{ maxWidth: "var(--layout-wide)" }}
      >
        {/* Title */}
        <span
          className=" font-heading tracking-tight"
          style={{ fontSize: "var(--text-lg)" }}
        >
          {settings.logotype?.node?.mediaItemUrl ? (
            <img
              src={settings.logotype.node.mediaItemUrl}
              alt={settings.logotype.node.altText || "Logo"}
              className="h-auto w-auto object-contain max-h-20"
            />
          ) : (
            settings.headerTitle
          )}
        </span>

        {/* Contact */}
        {settings.footercontact && (
          <p
            className="font-body text-center font-bold "
            style={{ fontSize: "var(--text-sm)", width: "20em", maxWidth: "400px" }}
          >
            {settings.footercontact}
          </p>
        )}

        {/* Copyright */}
        <p
          className="font-body"
          style={{ fontSize: "var(--text-xs)", opacity: 0.6 }}
        >
          © {new Date().getFullYear()} {settings.headerTitle}
        </p>
      </div>
    </footer>
  );
}
import Image from "next/image";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_GLOBAL_SETTINGS } from "@/lib/wordpress/queries";
import { GlobalSettingsResponse, GlobalSettings } from "@/types/types";

export default async function Header() {
  const res = await fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS);
  const settings: GlobalSettings = res?.allGlobalSettings?.nodes?.[0]?.globalsettingsfields ?? {};

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full  py-1 border-1"
      style={{  background: "var(--color-background)" }}
    >
      <div
        className="mx-auto px-4 h-16 flex items-center justify-between"
        style={{ maxWidth: "var(--layout-wide)" }}
      >
        {/* Logo / Title */}
        <Link href={settings.homepageLink ?? "/"}>
          {settings.logotype?.node?.mediaItemUrl ? (
            <Image
              src={settings.logotype.node.mediaItemUrl}
              alt={settings.logotype.node.altText ?? settings.headerTitle ?? "Logo"}
              width={70}
              height={70}
              className="object-contain"
          
            />
          ) : (
            <span
              className="font-heading font-bold tracking-tight"
              style={{ fontSize: "var(--text-lg)", color: "var(--color-secondary)" }}
            >
              {settings.headerTitle}
            </span>
          )}
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-5">
          {[
            { label: "Tours", href: "#tours" },
            { label: "Team", href: "#team" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href} 
              className="font-body uppercase bold font-medium transition-opacity duration-200 hover:underline"
              style={{ letterSpacing: "0.2em",fontSize: "var(--text-sm)", color: "var(--color-primary)"  }}
            >
              {item.label}
            </a>
          ))}
<a
href="#contact"
className="px-5 py-2 font-body book-now transition-opacity duration-200 hover:opacity-80"
style={{
  background: "var(--color-primary)",
  color: "var(--color-background)",
  border: "1px solid var(--color-black)",
  fontSize: "var(--text-xs)",
  letterSpacing: "0.2em",
}}>
  BOOK NOW 
</a> 

        </nav>

      </div>
    </header>
  );
}
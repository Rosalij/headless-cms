import Image from "next/image";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_GLOBAL_SETTINGS, GET_PAGES } from "@/lib/wordpress/queries";
import { GlobalSettingsResponse, GlobalSettings, NavPage, NavPagesResponse } from "@/types/types";

export default async function Header() {
  const [settingsRes, pagesRes] = await Promise.all([
    fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS),
    fetchGraphQL<NavPagesResponse>(GET_PAGES),
  ]);

  const settings: GlobalSettings = settingsRes?.allGlobalSettings?.nodes?.[0]?.globalsettingsfields ?? {};
  const pages: NavPage[] = pagesRes?.pages?.nodes ?? [];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full py-1"
  style={{ background: "var(--color-background)", borderBottom: "2px solid var(--color-secondary)" }}
>
      <div
        className="mx-auto flex-col p-2 flex items-center justify-between md:flex-row"
        style={{ maxWidth: "var(--layout-wide)" }}
      >
        {/* Logo / Title */}
        <Link href={settings.homepageLink ?? "/"}>
          {settings.logotype?.node?.mediaItemUrl ? (
            <Image
              src={settings.logotype.node.mediaItemUrl}
              alt={settings.logotype.node.altText ?? settings.headerTitle ?? "Logo"}
              width={110}
              height={110}
              className="object-cover"
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
        <nav className="flex items-center gap-8">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
            className="font-body font-small p-1 font-bold uppercase duration-200 hover:underline hover:underline-offset-4 hover:decoration-3"
              style={{ letterSpacing: "0.06em", fontSize: "var(--text-sm)", color: "var(--color-secondary)"  }}>
              {page.title}
            </Link>
          ))}
          <Link href="/#team" className="font-body font-small p-1 font-bold uppercase duration-200 hover:underline hover:underline-offset-4 hover:decoration-3" style={{ letterSpacing: "0.06em", fontSize: "var(--text-sm)", color: "var(--color-secondary)" }}>
            Team
          </Link>
          <Link href="/#tours" className="font-body font-small p-1 font-bold uppercase duration-200 hover:underline hover:underline-offset-4 hover:decoration-3" style={{ letterSpacing: "0.06em", fontSize: "var(--text-sm)", color: "var(--color-secondary)" }}>
            Tours
          </Link> 
          
          <a

            href="/contact"
            className=" p-2 text-center py-2 font-body transition-opacity duration-200 hover:opacity-80"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-background)",
         
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              borderRadius: "var(--radius-sm)",
            }}
          >
            BOOK NOW
          </a>
        </nav>
      </div>
    </header>
  );
}
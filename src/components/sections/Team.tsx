import Image from "next/image";
import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_TEAM } from "@/lib/wordpress/queries";
import { TeamMember, TeamResponse } from "@/types/types";

export default async function Team() {
  const res = await fetchGraphQL<TeamResponse>(GET_TEAM);
  const members: TeamMember[] = res?.teamMembers?.nodes?.map((n) => n.teamFields) ?? [];

  if (!members.length) return null;

  return (
    <section id="team" className="w-full py-20" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--layout-wide)" }}>

        {/* Section header */}
        <div className="mb-16">
          <p
            className="font-body font-semibold tracking-widest uppercase mb-3"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
          >
            Team
          </p>
          <h2
            className="font-heading"
            style={{ fontSize: "var(--text-4xl)", color: "var(--color-primary)" }}
          >
            Meet our guides
          </h2>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12" role="list">
          {members.map((item, index) => {
            const image = item.portraitImage?.node;
            return (
              <li key={index} className="group flex flex-col">

                {/* Image */}
                <div
                  className=" mx-auto relative w-90 h-90 overflow-hidden"
                  style={{aspectRatio: "3/4", borderRadius: "var(--radius-sm)" }}
                >
                  {image?.mediaItemUrl ? (
                    <Image
                      src={image.mediaItemUrl}
                      alt={image.altText || item.name || ""}
                      fill
                      className="object-cover object-bottom transition-transform duration-700 group-hover:scale-115 group-hover:brightness-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "var(--color-primary)", opacity: 0.1 }}
                    >
                      <span
                        className="font-heading"
                        style={{ fontSize: "var(--text-5xl)", color: "var(--color-primary)" }}
                      >
                        {item.name?.[0]}
                      </span>
                    </div>
                  )}

                  {/* Accent bar on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: "var(--color-secondary)" }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 pt-4 justify-center items-center text-center">
                  {item.role && (
                    <p
                      className="font-body font-semibold uppercase tracking-widest"
                      style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
                    >
                      {item.role}
                    </p>
                  )}
                  {item.name && (
                    <h3
                      className="font-heading"
                      style={{ fontSize: "var(--text-lg)", color: "var(--color-primary)" }}
                    >
                      {item.name}
                    </h3>
                  )}
                  {item.description && (
                    <p
                      className="font-body mt-1"
                      style={{ fontSize: "var(--text-sm)", color: "var(--color-black)", opacity: 0.7 }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
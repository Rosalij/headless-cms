// This is the Tours section component for the application.
// It fetches tour data from WordPress using GraphQL and displays a list of tours with their names, descriptions, and prices.

import { fetchGraphQL } from "@/lib/wordpress/client";
import { GET_TOURS } from "@/lib/wordpress/queries";
import { Tour, ToursResponse } from "@/types/types";

export default async function Tours() {
  const res = await fetchGraphQL<ToursResponse>(GET_TOURS);
  const tours: Tour[] = res?.tours?.nodes?.map((n) => n.tourfields) ?? [];

  if (!tours.length) return null;

  return (
    <section id="tours" className="w-full py-20" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--layout-wide)" }}>

        {/* Section header */}
        <div className="mb-3">
          <p
            className="font-body font-semibold tracking-widest uppercase mb-3"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-secondary)" }}
          >
            Tours
          </p>
          <h2
            className="font-heading"
            style={{ fontSize: "var(--text-4xl)", color: "var(--color-primary)" }}
          >
          Single or multi-day tour packages
          </h2>
        </div>

        {/* Tours list */}
        <ul className="flex flex-col divide-y" style={{ borderColor: "var(--color-primary)" }}>
          {tours.map((tour, index) => (
            <li
              key={index}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-10"
            >
              {/* Left — name and description */}
              <div className="flex flex-col gap-3" style={{ maxWidth: "600px" }}>
                {tour.tourName && (
                  <h3
                    className="font-heading transition-colors duration-200"
                    style={{
                      fontSize: "var(--text-2xl)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {tour.tourName}
                  </h3>
                )}
                {tour.tourDescription && (
                  <p
                    className="font-body leading-relaxed"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-black)",
                      opacity: 0.7,
                    }}
                  >
                    {tour.tourDescription}
                  </p>
                )}
              </div>

              {/* Right — price and button */}
              <div className="flex items-center gap-8 shrink-0">
                {tour.price && (
                  <p
                    className="font-heading"
                    style={{
                      fontSize: "var(--text-xl)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {tour.price}
                  </p>
                )}
               
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
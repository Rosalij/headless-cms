
import Hero from "@/components/sections/Hero";
import { fetchGraphQL } from "../lib/wordpress/client";
import { GET_POSTS } from "../lib/wordpress/queries";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";
import Tours from "@/components/sections/Tours";

export default async function Page() {
  const data = await fetchGraphQL(GET_POSTS);

  return ( 
<>
< Hero />
< Tours />
< CTA />

< Team />

</>
  );
}

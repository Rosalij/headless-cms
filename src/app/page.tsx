// This is the main page component for the home page of the application.
// It imports various sections like Hero, Tours, CTA, Team, Testimonials, and Filler to compose the home page layout.

import Hero from "@/components/sections/Hero";

import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";
import Tours from "@/components/sections/Tours";

import Filler from "@/components/sections/Filler";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedPosts from "@/components/sections/FeaturedPosts";

export default async function Page() {


  return ( 
<>
< Hero />
< FeaturedPosts />
< Tours />
< CTA />
< Team />
<Testimonials />
< Filler />
</>
  );
}

export type NavPage = {
  title?: string;
  slug?: string;
};

export type NavPagesResponse = {
  pages: {
    nodes: NavPage[];
  };
};

export type Image = {
  node?: {
    mediaItemUrl?: string;
    
    altText?: string;
  };
};

export type GlobalSettings = {
  footercontact?: string;
  headerTitle?: string;
  heroHeadingText?: string;
  heroImage?: Image;
  homepageLink?: string;
  logotype?: Image;
  fillerImage?: Image;
};

export type GlobalSettingsResponse = {
  allGlobalSettings: {
    nodes: { globalsettingsfields: GlobalSettings }[];
  };
};

export type TeamMember = {
  description?: string;
  name?: string;
  role?: string;
  portraitImage?: Image;
};

export type TeamResponse = {
  teamMembers: {
    nodes: { teamFields: TeamMember }[];
  };
};

export type Cta = {
  buttonLink?: string;
  buttonText?: string;
  ctaText?: string;
  ctaBackgroundImage?: Image;
};

export type CtaResponse = {
  ctas: {
    nodes: { acfFields: Cta }[];
  };
};

export type Tour = {
  price?: string;
  tourDescription?: string;
  tourName?: string;
};

export type ToursResponse = {
  tours: {
    nodes: { tourfields: Tour }[];
  };
};

export type Faq = {
  question?: string;
  answer?: string;
};

export type FaqResponse = {
  faqs: {
    nodes: { faqfields: Faq }[];
  };
};
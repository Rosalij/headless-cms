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
export const GET_POSTS = `
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        content
        excerpt
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
    slug
      title
      content
    }
  }
`;

export const GET_PAGE = `
  query getPage($slug: String!) {
    pageBy(uri: $slug) {
    slug
      title
      content
    }
  }
`;


export const GET_PAGES = `
  query GetPages {
    pages {
      nodes {
        slug
        title
        content
    }
  }
} 
`;

export const GET_GLOBAL_SETTINGS = `
  query getGlobalSettings {
    allGlobalSettings {
      nodes {
        globalsettingsfields {
          footercontact
          headerTitle
          heroHeadingText
          heroImage {
            node {
              altText
              mediaItemUrl
            }
          }
          homepageLink
          logotype {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_TEAM = `
  query getTeam {
    teamMembers {
      nodes {
        teamFields {
          description
          name
          role
          portraitImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_CTA = `
  query getCTA {

  ctas {
    nodes {
      acfFields {
        buttonLink
        buttonText
        ctaText
        ctaBackgroundImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;

export const GET_TOURS = `
  query getTours {
    tours {
      nodes {
        tourfields {
          price
          tourDescription
          tourName
        }
      }
    }
  }
`;

export const GET_FAQS = `
  query getFaqs {
    faqs {
      nodes {
        faqfields {
          question
          answer
        }
      }
    }
  }
`;
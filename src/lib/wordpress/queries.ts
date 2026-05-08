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
      title
      content
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
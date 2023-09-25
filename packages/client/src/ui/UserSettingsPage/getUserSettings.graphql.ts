import gql from "graphql-tag";

export const getUserSettingsQuery = gql`
  query getUserSettings {
    me {
      pendingInvitations {
        __typename
        ... on CommunityInvitationList {
          list {
            id
            accepted
            declined
            role {
              name
              community {
                name
              }
            }
            inviter {
              displayName
            }
          }
        }
        ... on BaseError {
          ...BaseErrorFragment
        }
      }
    }
  }
`;

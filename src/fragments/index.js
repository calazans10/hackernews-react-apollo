import gql from 'graphql-tag';

export const LINK_FRAGMENT = gql`
  fragment link on Link {
    id
    createdAt
    url
    description
    postedBy {
      id
      name
    }
    votes {
      id
      user {
        id
      }
    }
  }
`;

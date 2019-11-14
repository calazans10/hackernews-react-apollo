import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from '../Link';

const LINK_DETAILS = gql`
  fragment LinkDetails on Link {
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

export const FEED_QUERY = gql`
  {
    feed {
      links {
        ...LinkDetails
      }
    }
  }
  ${LINK_DETAILS}
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      ...LinkDetails
    }
  }
  ${LINK_DETAILS}
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        ...LinkDetails
      }
      user {
        id
      }
    }
  }
  ${LINK_DETAILS}
`;

function LinkList() {
  const updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };

  const subscribeToNewLinks = async subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);

        if (exists) {
          return prev;
        }

        return {
          ...prev,
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename,
          },
        };
      },
    });
  };

  const subscribeToNewVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    });
  };

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) {
          return <div>Fetching</div>;
        }
        if (error) {
          return <div>Error</div>;
        }

        subscribeToNewLinks(subscribeToMore);
        subscribeToNewVotes(subscribeToMore);

        const linksToRender = data.feed.links;

        return (
          <ul>
            {linksToRender.map((link, index) => (
              <Link
                key={link.id}
                link={link}
                index={index}
                updateStoreAfterVote={updateCacheAfterVote}
              />
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default LinkList;

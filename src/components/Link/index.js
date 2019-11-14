import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../../constants';
import { timeDifferenceForDate } from '../../lib/utils';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

function Link({ index, link, updateStoreAfterVote }) {
  const { id, description, url, votes, postedBy, createdAt } = link;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <li className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: id }}
            update={(store, { data: { vote } }) => updateStoreAfterVote(store, vote, id)}
          >
            {voteMutation => (
              <button type="button" className="ml1 gray f11" onClick={voteMutation}>
                ▲
              </button>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {votes.length} votes | by {postedBy ? postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </li>
  );
}

Link.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.object.isRequired,
  updateStoreAfterVote: PropTypes.func,
};

Link.defaultProps = {
  updateStoreAfterVote: () => {},
};

export default Link;

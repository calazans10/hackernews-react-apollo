import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FEED_QUERY } from '../LinkList';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

function CreateLink({ history }) {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          name="description"
          type="text"
          className="mb2"
          placeholder="A description for the link"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          name="url"
          type="url"
          className="mb2"
          placeholder="The URL for the link"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => history.push('/')}
          update={(store, { data: { post } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data,
            });
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    </div>
  );
}

CreateLink.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(CreateLink);

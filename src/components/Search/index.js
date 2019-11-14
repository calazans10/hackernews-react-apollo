import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from '../Link';
import { LINK_FRAGMENT } from '../../fragments';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        ...link
      }
    }
  }
  ${LINK_FRAGMENT}
`;

function Search({ client }) {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');

  const onExecuteSearch = async () => {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const { links: searchedLinks } = result.data.feed;
    setLinks(searchedLinks);
  };

  return (
    <div>
      <div>
        <label htmlFor="search">Search</label>
        <input name="search" type="search" onChange={e => setFilter(e.target.value)} />
        <button type="button" onClick={() => onExecuteSearch()}>
          OK
        </button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}

Search.propTypes = {
  client: PropTypes.object.isRequired,
};

export default withApollo(Search);

import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ page, totalPages, history }) {
  const onClickNext = () => {
    if (page <= totalPages) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  };

  const onClickPrevious = () => {
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  };

  return (
    <div className="flex ml4 mv3 gray">
      <button className="pointer mr2" onClick={onClickPrevious}>
        Previous
      </button>
      <button className="pointer" onClick={onClickNext}>
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};

export default Pagination;

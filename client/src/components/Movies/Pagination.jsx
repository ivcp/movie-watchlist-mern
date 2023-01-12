import React from 'react';

const Pagination = ({ page, moviesPage, totalPages, setPage }) => {
  return (
    <div>
      <button
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        <span>previous page</span>
      </button>
      {page}
      <button
        onClick={() =>
          setPage(prev =>
            moviesPage === 500 || moviesPage === totalPages ? prev : prev + 1
          )
        }
        disabled={moviesPage === 500}
      >
        <span>next page</span>
      </button>
    </div>
  );
};

export default Pagination;

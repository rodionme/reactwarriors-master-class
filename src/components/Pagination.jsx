import React from 'react';

const Pagination = (props) => {
  const { currentPage, updatePage, totalPages } = props;

  const goToPage = (page) => {
    updatePage(page);
  };

  const goToPrevPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  if (!totalPages) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={goToPrevPage} className="btn btn-primary" disabled={currentPage === 1}>
        Prev
      </button>

      <span style={{ margin: '0 10px' }}>{`Page ${currentPage} from ${totalPages}`}</span>

      <button onClick={goToNextPage} className="btn btn-primary" disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

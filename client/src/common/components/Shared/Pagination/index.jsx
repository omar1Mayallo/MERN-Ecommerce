import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({pageNumbers = 0, handlePagination, currentPage = 0}) => {
  const handlePageClick = (e) => {
    handlePagination(e.selected + 1);
  };

  return (
    <>
      {pageNumbers > 1 && (
        <ReactPaginate
          forcePage={currentPage - 1}
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          pageCount={pageNumbers}
          previousLabel="<<"
          containerClassName={"pagination justify-content-center p-3"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default Pagination;

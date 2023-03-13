import React from "react";
import {Table} from "reactstrap";
import Pagination from "../Pagination";

const PaginateTable = ({allItems, handlePagination, children}) => {
  return (
    <div className="paginate-table">
      <Table responsive striped size="sm">
        {children}
      </Table>
      <Pagination
        pageNumbers={allItems?.paginationStatus?.numOfPages}
        currentPage={allItems?.paginationStatus?.currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default PaginateTable;

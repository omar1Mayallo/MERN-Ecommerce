import React from "react";
import {Alert, Col, Row} from "reactstrap";
import ProductCard from "../../../../common/components/Cards/ProductCard";
import Pagination from "../../../../common/components/Shared/Pagination";

const ShopProductsContainer = ({allProducts, limit, handlePagination}) => {
  return (
    <>
      {allProducts.products.length > 0 ? (
        <Row xl={4} lg={3} xs={2}>
          {allProducts?.products.map((item) => (
            <Col key={item._id} className="my-3">
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        !allProducts?.loading && (
          <Alert color="info" className="my-3">
            No Products Match With Filter !
          </Alert>
        )
      )}

      <Pagination
        pageNumbers={Math.ceil(allProducts?.totalNumOfDocs / limit)}
        handlePagination={handlePagination}
        currentPage={allProducts?.paginationStatus?.currentPage}
      />
    </>
  );
};

export default ShopProductsContainer;

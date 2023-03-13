import React from "react";
import {Col, Container, Row} from "reactstrap";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageBreadcrumbs from "../../../common/components/Shared/PageBreadcrumbs";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import useGetProducts from "../../../common/hooks/products/useGetProducts";
import ShopProductsContainer from "./sections/ShopProductsContainer";
import ShopSideBar from "./sections/ShopSideBar";
import ShopSortBar from "./sections/ShopSortBar";

const Shop = () => {
  const {
    allProducts,
    handleSort,
    handleRate,
    handlePrice,
    handleSearch,
    handleCategory,
    handlePagination,
    limit,
  } = useGetProducts();

  return (
    <>
      <PageHelmet title={"Shop"} />
      <Container className="py-5">
        <PageBreadcrumbs
          pages={[
            {page: "Home", link: "/"},
            {page: "Shop", isActive: true},
          ]}
        />
        <OverlayLoader active={allProducts?.loading} />
        <ShopSortBar handleSort={handleSort} results={allProducts?.results} />
        <Row>
          <Col lg={3} md={4}>
            <ShopSideBar
              handleRate={handleRate}
              handlePrice={handlePrice}
              handleSearch={handleSearch}
              handleCategory={handleCategory}
            />
          </Col>
          <Col lg={9} md={8} className="bg-light rounded">
            <ShopProductsContainer
              allProducts={allProducts}
              handlePagination={handlePagination}
              limit={limit}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shop;

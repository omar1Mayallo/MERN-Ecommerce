import React from "react";
import {useSelector} from "react-redux";
import {Alert, Col, Row} from "reactstrap";
import ProductCard from "../../../../common/components/Cards/ProductCard";
import BlockLoader from "../../../../common/components/Loaders/BlockLoader";

const CategoryProductsSection = () => {
  const {categoryProducts} = useSelector((state) => state.products);

  return (
    <section className="category-product-section">
      {categoryProducts?.loading ? (
        <BlockLoader minHeight={200} />
      ) : categoryProducts?.products.length > 0 ? (
        <Row lg={5} md={3} xs={2}>
          {categoryProducts?.products.map((item) => (
            <Col key={item._id} className="mb-4">
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert>No Products Match With This Category</Alert>
      )}
    </section>
  );
};

export default CategoryProductsSection;

import React from "react";
import {Link} from "react-router-dom";
import {Alert, Col, Row} from "reactstrap";
import BlockLoader from "../../../../common/components/Loaders/BlockLoader";
import ImageLoader from "../../../../common/components/Loaders/ImgLoader";
import useGetCategories from "../../../../common/hooks/categories/useGetCategories";

const CategoriesSection = ({withSlice}) => {
  const {allCategories} = useGetCategories();
  const categories = withSlice
    ? allCategories?.categories?.slice(0, 4)
    : allCategories?.categories;
  return (
    <section className="categories-section">
      {allCategories?.loading ? (
        <BlockLoader minHeight={300} />
      ) : allCategories?.error ? (
        <Alert color="danger">{allCategories?.error}</Alert>
      ) : (
        <>
          <Row md={4} xs={2}>
            {categories.map((item, idx) => (
              <Col key={idx} className="mb-4">
                <Link to={`/categories/${item._id}`}>
                  <ImageLoader
                    image={item?.image}
                    style={{width: "100%", height: "auto"}}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}
    </section>
  );
};

export default CategoriesSection;

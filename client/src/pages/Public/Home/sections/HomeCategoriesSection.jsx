import React from "react";
import {Link} from "react-router-dom";
import {Alert, Col, Container, Row} from "reactstrap";
import BlockLoader from "../../../../common/components/Loaders/BlockLoader";
import ImageLoader from "../../../../common/components/Loaders/ImgLoader";
import useGetCategories from "../../../../common/hooks/categories/useGetCategories";

const HomeCategoriesSection = () => {
  const {allCategories} = useGetCategories();

  return (
    <section className="categories-section">
      <Container className="my-5">
        {allCategories?.loading ? (
          <BlockLoader minHeight={300} />
        ) : allCategories?.error ? (
          <Alert color="danger">{allCategories?.error}</Alert>
        ) : (
          <>
            <Row md={4} xs={2}>
              {allCategories?.categories?.slice(0, 4).map((item, idx) => (
                <Col key={idx} className="mb-3">
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
      </Container>
    </section>
  );
};

export default HomeCategoriesSection;

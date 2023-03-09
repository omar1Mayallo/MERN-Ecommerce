import React from "react";
import {Alert, Col, Row} from "reactstrap";
import ProductCard from "../../../common/components/Cards/ProductCard";
import BlockLoader from "../../../common/components/Loaders/BlockLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import useWishlist from "../../../common/hooks/wishlist/useWishlist";
import SideBarLayout from "../../../layout/SideBarLayout";

const Wishlist = () => {
  const {userWishList} = useWishlist();
  return (
    <>
      <PageHelmet title={"Wishlist"} />
      <SideBarLayout>
        <section className="wishlist-section">
          <h4 className="mb-4">Wishlist</h4>
          {userWishList.loading ? (
            <BlockLoader minHeight={200} />
          ) : userWishList.wishlist.length > 0 ? (
            <Row lg={4} md={3} sm={2} xs={1}>
              {userWishList.wishlist.map((item, idx) => (
                <Col key={idx} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          ) : (
            <Alert color="info">Your wishlist is empty !</Alert>
          )}
        </section>
      </SideBarLayout>
    </>
  );
};

export default Wishlist;

import React from "react";
import {Container} from "reactstrap";
import PageBreadcrumbs from "../../../common/components/Shared/PageBreadcrumbs";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import CartItemsSection from "./sections/CartItemsSection";

const Cart = () => {
  return (
    <>
      <PageHelmet title={"Cart"} />
      <Container className="py-4">
        <PageBreadcrumbs
          pages={[
            {page: "Home", link: "/"},
            {page: "Cart", isActive: true},
          ]}
        />
        <CartItemsSection />
      </Container>
    </>
  );
};

export default Cart;

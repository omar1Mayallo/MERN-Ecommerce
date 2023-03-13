import React, {useState} from "react";
import OverlayLoader from "../../../../common/components/Loaders/OverlayLoader";
import useUserCart from "../../../../common/hooks/cart/useUserCart";
import {Col, Row, Button, Alert, Input, Form} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import CartItemCard from "../../../../common/components/Cards/CartItemCard";
import {Link} from "react-router-dom";
import {applyCoupon, clearCart} from "../../../../features/cart/cartServices";
import pushNotification from "../../../../common/components/Shared/Notification";
const CartItemsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userCart, isMutation} = useUserCart();
  //HANDLE_COUPON
  const [couponCode, setCouponCode] = useState("");
  const [productId, setProductId] = useState("");
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode || !productId) {
      pushNotification("Please enter a coupon code and product Id", "error");
    } else {
      dispatch(applyCoupon({productId, couponCode}));
    }
    setCouponCode("");
    setProductId("");
  };

  return (
    <>
      <OverlayLoader active={isMutation?.loading} />
      <section className="cart-items-section">
        {userCart.loading || userCart.cart?.cartItems?.length > 0 ? (
          <>
            {/* CartHead  */}
            {userCart.cart?.cartItems?.length > 0 && (
              <>
                <Row xs={5} className="my-4 bg-light">
                  {["Image", "Name", "Features", "Qty", "Price"].map(
                    (item, idx) => (
                      <Col className="text-center py-3" key={idx}>
                        <h6 className="m-0" style={{letterSpacing: "0.5px"}}>
                          {item}
                        </h6>
                      </Col>
                    )
                  )}
                </Row>
                {/* CartItems */}
                {userCart.cart?.cartItems?.map((item, idx) => (
                  <CartItemCard item={item} key={idx} />
                ))}
              </>
            )}

            {/* ApplyCoupon & TotalPrice */}
            {userCart.cart?.totalPrice > 0 && (
              <Row md={2} xs={1} className={"my-4"}>
                <Col>
                  <h3 className="mb-3">Apply Coupon</h3>
                  {/* Apply_Coupon */}
                  <Form
                    className="d-flex flex-column gap-3"
                    onSubmit={handleApplyCoupon}
                  >
                    <Input
                      type="text"
                      placeholder="Enter A Product Id"
                      onChange={(e) => setProductId(e.target.value)}
                      value={productId}
                      bsSize="sm"
                    />
                    <Input
                      type="text"
                      placeholder="Enter A Coupon Code"
                      onChange={(e) => setCouponCode(e.target.value)}
                      value={couponCode}
                      bsSize="sm"
                    />
                    <Button type="submit" color="info" size="sm">
                      Apply Coupon
                    </Button>
                  </Form>
                </Col>
                <Col>
                  <div className="bg-light p-3 rounded d-flex flex-column gap-3">
                    {/* TotalPrice */}
                    <p
                      style={{
                        fontFamily: "sans-serif",
                        textDecoration: userCart.cart
                          ?.totalPriceAfterCouponDiscount
                          ? "line-through"
                          : "none",
                        color: userCart.cart?.totalPriceAfterCouponDiscount
                          ? "gray"
                          : "black",
                      }}
                    >
                      Cart Subtotal: $ {userCart.cart?.totalPrice}
                    </p>
                    {userCart.cart?.totalPriceAfterCouponDiscount > 0 && (
                      <p style={{color: "red", fontFamily: "sans-serif"}}>
                        Cart Subtotal After Discount: ${" "}
                        {userCart.cart?.totalPriceAfterCouponDiscount}
                      </p>
                    )}

                    {/* Checkout */}
                    <Button
                      block
                      size="sm"
                      color="dark"
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </Button>
                    <Button
                      block
                      size="sm"
                      color="primary"
                      onClick={() => navigate("/shop")}
                    >
                      Continuo Shopping
                    </Button>

                    {/* ClearCart */}
                    <Button
                      block
                      size="sm"
                      color="danger"
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </>
        ) : (
          <Alert color="info">
            Your Cart Is Empty, <Link to={"/shop"}>Continue Shopping</Link>
          </Alert>
        )}
      </section>
    </>
  );
};

export default CartItemsSection;

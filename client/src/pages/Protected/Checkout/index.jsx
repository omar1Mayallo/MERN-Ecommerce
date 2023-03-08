import React, {useEffect, useState} from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import pushNotification from "../../../common/components/Shared/Notification";
import PageBreadcrumbs from "../../../common/components/Shared/PageBreadcrumbs";
import {createShippingAddress} from "../../../features/address/addressSlice";
import useUserCart from "../../../common/hooks/cart/useUserCart";
import paymentMethods from "../../../assets/imgs/payment-method.png";
import {
  createCashOrder,
  createCardOrder,
} from "../../../features/orders/ordersServices";
import {
  resetMutationResult,
  resetSessionUrl,
} from "../../../features/orders/ordersSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //USER_CART
  const {userCart} = useUserCart();
  // console.log(userCart.cart?.cartItems.length);

  //ADDRESS
  const [address, setAddress] = useState(
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {
          detailedAddress: "",
          city: "",
          phone: "",
          postalCode: "",
        }
  );
  const handleChange = (e) => {
    setAddress({...address, [e.target.name]: e.target.value});
  };

  //PAYMENT
  const [paymentMethod, setPaymentMethod] = useState(null);
  const handlePaymentMethod = (paymentVal) => {
    setPaymentMethod(paymentVal);
  };
  // console.log(paymentMethod);

  //ORDER
  const {isMutation, sessionUrl} = useSelector((state) => state.orders);

  //HANDLE_CREATE_ORDER
  const handleSubmitOrder = (e) => {
    //Handle-Shipping-Address
    e.preventDefault();
    if (
      !address.detailedAddress ||
      !address.city ||
      !address.phone ||
      !address.postalCode
    ) {
      pushNotification("Please fill all shipping address field", "error");
      return;
    }
    localStorage.setItem("shippingAddress", JSON.stringify(address));
    dispatch(createShippingAddress(address));
    //Handle-User-Cart
    if (userCart.cart?.cartItems.length < 1) {
      pushNotification("Your cart is empty", "error");
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
      return;
    }
    //Handle-Payment
    if (!paymentMethod) {
      pushNotification("Please select a payment method", "error");
      return;
    }

    if (paymentMethod === "cash") {
      dispatch(
        createCashOrder({
          cartId: userCart.cart?._id,
          body: {shippingAddress: address},
        })
      );
    } else if (paymentMethod === "card") {
      dispatch(
        createCardOrder({
          cartId: userCart.cart?._id,
          shippingAddress: address,
        })
      );
    }
  };

  useEffect(() => {
    if (!isMutation.loading) {
      if (isMutation.success) {
        if (sessionUrl) {
          dispatch(resetMutationResult());
          //FOR-CARD
          window.location.href = sessionUrl;
          dispatch(resetSessionUrl());
        } else {
          dispatch(resetMutationResult());
          //FOR-CASH
          setTimeout(() => (window.location.href = "/orders"), 1000);
        }
      }
    }
  }, [isMutation, dispatch, navigate, sessionUrl]);

  return (
    <>
      <PageHelmet title={"Checkout"} />
      <Container className="py-4">
        <PageBreadcrumbs
          pages={[
            {page: "Home", link: "/"},
            {page: "Cart", link: "/cart"},
            {page: "Checkout", isActive: true},
          ]}
        />
        <Row>
          <Col md={7}>
            <h3 className="mb-3">Shipping Address</h3>
            <Form>
              <FormGroup>
                <Label for="address">Address In Details</Label>
                <Input
                  id="address"
                  name="detailedAddress"
                  placeholder="Address In Details"
                  type="text"
                  value={address.detailedAddress}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  type="text"
                  value={address.city}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  type="text"
                  value={address.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="Postal Code"
                  type="text"
                  value={address.postalCode}
                  onChange={handleChange}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col md={4}>
            <h3 className="mb-3">Payment Method</h3>
            <div className="bg-light p-3">
              <div className="d-flex flex-column gap-2 ">
                <h5>Price</h5>
                <span
                  style={{
                    fontFamily: "sans-serif",
                    textDecoration: userCart.cart?.totalPriceAfterCouponDiscount
                      ? "line-through"
                      : "none",
                    color: userCart.cart?.totalPriceAfterCouponDiscount
                      ? "gray"
                      : "black",
                  }}
                >
                  Cart Subtotal : ${userCart.cart?.totalPrice}
                </span>
                {userCart.cart?.totalPriceAfterCouponDiscount > 0 && (
                  <span>
                    {" "}
                    Cart Subtotal After Discount : $
                    {userCart.cart?.totalPriceAfterCouponDiscount}
                  </span>
                )}
              </div>
              <hr />
              <div className="d-flex flex-column gap-2">
                <h5>Payment</h5>
                <Form
                  className="d-flex flex-column gap-2"
                  onSubmit={handleSubmitOrder}
                >
                  <div>
                    <Input
                      onChange={(e) => {
                        handlePaymentMethod(e.target.value);
                      }}
                      type="radio"
                      id={"cash"}
                      value={"cash"}
                      name="payment"
                    />{" "}
                    <Label>Cash on delivery</Label>
                  </div>
                  <div>
                    <Input
                      onChange={(e) => {
                        handlePaymentMethod(e.target.value);
                      }}
                      type="radio"
                      id={"card"}
                      value={"card"}
                      name="payment"
                    />{" "}
                    <Label>Credit Card</Label>
                  </div>
                  <div>
                    <img src={paymentMethods} alt="payments-img" />
                  </div>
                  {isMutation.loading ? (
                    <Button
                      size="sm"
                      block
                      color="primary"
                      disabled
                      className="mt-3"
                    >
                      <Spinner size={"sm"} />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      block
                      color="primary"
                      type="submit"
                      className="mt-3"
                    >
                      Place Order
                    </Button>
                  )}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;

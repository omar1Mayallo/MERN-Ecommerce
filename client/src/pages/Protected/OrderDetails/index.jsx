import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Alert, Badge, Col, Container, Row} from "reactstrap";
import BlockLoader from "../../../common/components/Loaders/BlockLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import {getOrderDetails} from "../../../features/orders/ordersServices";
import {resetMutationResult} from "../../../features/orders/ordersSlice";

const OrderDetails = () => {
  const {orderId} = useParams();
  const dispatch = useDispatch();
  const {isMutation, orderDetails} = useSelector((state) => state.orders);
  console.log(orderDetails);
  useEffect(() => {
    if (isMutation.success) {
      dispatch(getOrderDetails(orderId));
      dispatch(resetMutationResult());
    } else {
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId, dispatch, isMutation.success]);
  return (
    <>
      <PageHelmet title={"OrderDetails"} />
      <Container className="py-3">
        {orderDetails.loading ? (
          <BlockLoader minHeight={300} />
        ) : (
          <Row>
            <Col lg={8}>
              <h3>Order Items</h3>
              <div className="d-flex flex-column gap-3 mb-4">
                {orderDetails?.order?.cartItems.map(
                  ({product, price, quantity, color, size}, idx) => (
                    <div className="d-flex align-items-center gap-2" key={idx}>
                      <img
                        src={product?.image}
                        alt="product-img"
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          maxHeight: "70px",
                        }}
                      />
                      <span className="text-capitalize">{product?.name}</span>
                      {color && (
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            background: `${color}`,
                            borderRadius: "100%",
                          }}
                        />
                      )}
                      {size && (
                        <div
                          style={{
                            fontSize: "12px",
                            padding: "10px",
                            border: "1px solid black",
                            background: "black",
                            color: "white",
                          }}
                        >
                          {size}
                        </div>
                      )}
                      <span>
                        ({quantity}) Items X ${price}
                      </span>
                    </div>
                  )
                )}
              </div>
              <h3>Shipping Address</h3>
              <div className="d-flex flex-column gap-2 mb-4">
                <div>
                  <span className="fw-bold">Address : </span>{" "}
                  {orderDetails?.order?.shippingAddress.detailedAddress},
                  {orderDetails?.order?.shippingAddress.city},
                  {orderDetails?.order?.shippingAddress.postalCode}
                </div>
                <div>
                  <span className="fw-bold">Phone : </span>
                  {orderDetails?.order?.shippingAddress.phone}
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="bg-light p-3">
                <h3>Order Info</h3>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <span className="fw-bold">Total Price :</span>&nbsp;$
                    {orderDetails?.order?.totalOrderPrice}
                  </div>
                  <span style={{fontSize: "12px"}} className="text-muted">
                    The price includes tax and shipping price
                  </span>
                  <div className="d-flex">
                    <span className="fw-bold">Payment Method : &nbsp;</span>
                    {orderDetails?.order?.paymentMethod === "cash" ? (
                      <Badge color="primary" className="rounded">
                        Cash
                      </Badge>
                    ) : (
                      <Badge color="info" className="rounded">
                        Card
                      </Badge>
                    )}
                  </div>
                  {orderDetails?.order?.isPaid ? (
                    <Alert className="mb-0 p-1 text-center" color="success">
                      PAID
                    </Alert>
                  ) : (
                    <Alert className="mb-0 p-1 text-center" color="danger">
                      UNPAID
                    </Alert>
                  )}
                  {orderDetails?.order?.isDelivered ? (
                    <Alert className="mb-0 p-1 text-center" color="success">
                      DELIVERED
                    </Alert>
                  ) : (
                    <Alert className="mb-0 p-1 text-center" color="danger">
                      IN-PROGRESS
                    </Alert>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default OrderDetails;

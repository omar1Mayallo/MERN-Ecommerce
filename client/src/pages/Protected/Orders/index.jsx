import React from "react";
import {Link} from "react-router-dom";
import {Alert, Badge, Table} from "reactstrap";
import BlockLoader from "../../../common/components/Loaders/BlockLoader";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import useGetOrders from "../../../common/hooks/orders/useGetOrders";
import SideBarLayout from "../../../layout/SideBarLayout";

const Orders = () => {
  const {allOrders, isMutation} = useGetOrders();

  return (
    <>
      <PageHelmet title={"Orders"} />
      <OverlayLoader active={isMutation?.loading} />
      <SideBarLayout>
        <section className="wishlist-section">
          <h4 className="mb-4">Orders</h4>
          {allOrders.loading ? (
            <BlockLoader minHeight={200} />
          ) : allOrders.orders?.length > 0 ? (
            <Table responsive striped>
              <thead>
                <tr className="text-center">
                  <th>Id</th>
                  <th>Created At</th>
                  <th>Price</th>
                  <th>Payment Method</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.orders?.map((item, idx) => (
                  <tr className="text-center" key={idx}>
                    <th scope="row">
                      <Link to={`/orders/${item._id}`}>{item._id}</Link>
                    </th>
                    <td>
                      {new Date(item.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>$ {item.totalOrderPrice}</td>
                    <td>
                      {item.paymentMethod === "cash" && (
                        <Badge color="primary" className="rounded">
                          cash
                        </Badge>
                      )}
                      {item.paymentMethod === "card" && (
                        <Badge color="info" className="rounded">
                          card
                        </Badge>
                      )}
                    </td>
                    <td>
                      {item.isPaid ? (
                        <Badge color="success" className="rounded">
                          Yes
                        </Badge>
                      ) : (
                        <Badge color="danger" className="rounded">
                          No
                        </Badge>
                      )}
                    </td>
                    <td>
                      {item.isDelivered ? (
                        <Badge color="success" className="rounded">
                          Yes
                        </Badge>
                      ) : (
                        <Badge color="danger" className="rounded">
                          No
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert>Your orders list is empty</Alert>
          )}
        </section>
      </SideBarLayout>
    </>
  );
};

export default Orders;

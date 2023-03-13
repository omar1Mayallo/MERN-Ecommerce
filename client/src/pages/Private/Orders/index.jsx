import React, {useState} from "react";
import {MdDelete} from "react-icons/md";
import {Link} from "react-router-dom";
import {Alert, Badge, Spinner, Table, UncontrolledTooltip} from "reactstrap";
import DashboardHead from "../../../common/components/Heads/DashboardHead";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import PaginateTable from "../../../common/components/Shared/PaginateTable";
import Pagination from "../../../common/components/Shared/Pagination";
import useGetOrders from "../../../common/hooks/orders/useGetOrders";
import useMutateOrders from "../../../common/hooks/orders/useMutateOrders";
import DashboardLayout from "../../../layout/DashboardLayout";

const Orders = () => {
  /*____ALL_ORDERS____*/
  //_PAGINATION
  const [page, setPage] = useState(1);
  const handlePagination = (pg) => {
    setPage(pg);
  };
  const {allOrders, isMutation} = useGetOrders(5, page);

  /*____MUTATION_HANDLERS___*/
  const {
    handleDeleteOrder,
    handleUpdateOrderToDelivered,
    handleUpdateOrderToPaid,
  } = useMutateOrders();

  return (
    <>
      <PageHelmet title={"Orders"} />
      <DashboardLayout>
        <section className="Orders-section">
          {/*____LOADING_OVERLAY____*/}
          <OverlayLoader active={isMutation?.loading} />

          {/*____HEAD____*/}
          <DashboardHead head={"Orders"} loading={allOrders.loading} />

          {allOrders.loading || allOrders.orders?.length > 0 ? (
            <>
              {/*____ORDERS_TABLE____*/}
              <PaginateTable
                allItems={allOrders}
                handlePagination={handlePagination}
              >
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Payment Method</th>
                    <th>Paid Status</th>
                    <th>Delivered Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.orders.map((item) => (
                    <tr key={item._id}>
                      <td style={{fontSize: "11px"}}>
                        <Link to={`/orders/${item._id}`}>{item._id}</Link>
                      </td>
                      <td style={{fontSize: "11px"}}>{item.user}</td>
                      <td style={{fontSize: "13px"}}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        {item.paymentMethod === "cash" ? (
                          <Badge color="primary" className="rounded">
                            {item.paymentMethod}
                          </Badge>
                        ) : (
                          <Badge color="info" className="rounded">
                            {item.paymentMethod}
                          </Badge>
                        )}
                      </td>
                      <td>
                        {item.isPaid ? (
                          <Badge color="success" className="rounded">
                            Paid
                          </Badge>
                        ) : (
                          <>
                            <UncontrolledTooltip
                              placement="top"
                              target="UncontrolledTooltipPaid"
                            >
                              Update Order To Paid
                            </UncontrolledTooltip>
                            <Badge
                              id="UncontrolledTooltipPaid"
                              style={{cursor: "pointer"}}
                              color="danger"
                              className="rounded"
                              onClick={() => handleUpdateOrderToPaid(item._id)}
                            >
                              Unpaid
                            </Badge>
                          </>
                        )}
                      </td>
                      {/* PROGRESS */}
                      <td>
                        {item.isDelivered ? (
                          <Badge color="success" className="rounded">
                            Delivered
                          </Badge>
                        ) : (
                          <>
                            <UncontrolledTooltip
                              placement="top"
                              target="UncontrolledTooltipDelivered"
                            >
                              Update Order To Delivered
                            </UncontrolledTooltip>
                            <Badge
                              id="UncontrolledTooltipDelivered"
                              style={{cursor: "pointer"}}
                              color="danger"
                              className="rounded"
                              onClick={() =>
                                handleUpdateOrderToDelivered(item._id)
                              }
                            >
                              In progress
                            </Badge>
                          </>
                        )}
                      </td>
                      <td>
                        <MdDelete
                          color="red"
                          size={25}
                          onClick={() => handleDeleteOrder(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </PaginateTable>
            </>
          ) : (
            <Alert>No orders Added Yet !</Alert>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Orders;

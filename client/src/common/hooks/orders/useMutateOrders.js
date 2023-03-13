import {useDispatch} from "react-redux";
import {
  deleteOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../../../features/orders/ordersServices";

const useMutateOrders = () => {
  const dispatch = useDispatch();

  /*____UPDATE_ORDER_TO_PAID____*/
  const handleUpdateOrderToPaid = (id) => {
    dispatch(updateOrderToPaid(id));
  };
  /*____UPDATE_ORDER_TO_DELIVERED____*/
  const handleUpdateOrderToDelivered = (id) => {
    dispatch(updateOrderToDelivered(id));
  };
  /*____DELETE_CATEGORY____*/
  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  return {
    handleUpdateOrderToPaid,
    handleUpdateOrderToDelivered,
    handleDeleteOrder,
  };
};
export default useMutateOrders;

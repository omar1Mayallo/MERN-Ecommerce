import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {getAllOrders} from "../../../features/orders/ordersServices";
import {resetMutationResult} from "../../../features/orders/ordersSlice";

const useAllOrders = () => {
  const dispatch = useDispatch();
  const {allOrders, isMutation} = useSelector((state) => state.orders);
  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllOrders());
      dispatch(resetMutationResult());
    } else {
      dispatch(getAllOrders());
    }
  }, [dispatch, isMutation.success]);
  // console.log(isMutation);
  return {allOrders, isMutation};
};
export default useAllOrders;

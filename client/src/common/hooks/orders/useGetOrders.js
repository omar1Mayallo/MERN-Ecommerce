import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllOrders} from "../../../features/orders/ordersServices";
import {resetMutationResult} from "../../../features/orders/ordersSlice";

const useGetOrders = (limit, page) => {
  const dispatch = useDispatch();
  const {allOrders, isMutation} = useSelector((state) => state.orders);

  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllOrders({limit, page}));
      dispatch(resetMutationResult());
    } else {
      dispatch(getAllOrders({limit, page}));
    }
  }, [dispatch, isMutation.success, limit, page]);
  // console.log(isMutation);
  return {allOrders, isMutation};
};
export default useGetOrders;

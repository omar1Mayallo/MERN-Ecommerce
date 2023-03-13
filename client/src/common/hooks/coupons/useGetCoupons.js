import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCoupons} from "../../../features/coupons/couponsServices";
import {resetMutationResult} from "../../../features/coupons/couponsSlice";

const useGetCoupons = (limit, page) => {
  const dispatch = useDispatch();
  const {allCoupons, isMutation} = useSelector((state) => state.coupons);

  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllCoupons({limit, page}));
      dispatch(resetMutationResult());
    } else {
      dispatch(getAllCoupons({limit, page}));
    }
  }, [dispatch, isMutation.success, limit, page]);

  return {
    allCoupons,
    isMutation,
  };
};
export default useGetCoupons;

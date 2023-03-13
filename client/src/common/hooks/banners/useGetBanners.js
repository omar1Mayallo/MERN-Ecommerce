import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllBanners} from "../../../features/banners/bannersServices";
import {resetMutationResult} from "../../../features/banners/bannersSlice";

const useGetBanners = () => {
  const dispatch = useDispatch();
  const {allBanners, isMutation} = useSelector((state) => state.banners);
  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllBanners());
      dispatch(resetMutationResult());
    } else {
      dispatch(getAllBanners());
    }
  }, [dispatch, isMutation.success]);

  return {allBanners, isMutation};
};
export default useGetBanners;

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllBanners} from "../../../features/banners/bannersServices";

const useGetBanners = () => {
  const dispatch = useDispatch();
  const {allBanners} = useSelector((state) => state.banners);
  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  return {allBanners};
};
export default useGetBanners;

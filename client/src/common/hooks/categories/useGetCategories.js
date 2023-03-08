import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../../features/categories/categoriesServices";

const useGetCategories = () => {
  const dispatch = useDispatch();
  const {allCategories} = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return {allCategories};
};
export default useGetCategories;

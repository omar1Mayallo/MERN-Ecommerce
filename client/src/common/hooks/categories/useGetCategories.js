import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../../features/categories/categoriesServices";
import {resetMutationResult} from "../../../features/categories/categoriesSlice";

const useGetCategories = (limit, page) => {
  const dispatch = useDispatch();
  const {allCategories, isMutation} = useSelector((state) => state.categories);

  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllCategories({limit, page}));
      dispatch(resetMutationResult());
    } else {
      dispatch(getAllCategories({limit, page}));
    }
  }, [dispatch, isMutation.success, limit, page]);

  return {allCategories, isMutation};
};
export default useGetCategories;

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllSubcategoriesBelongToCertainCategory} from "../../../features/subcategories/subcategoriesServices";
import {resetMutationResult} from "../../../features/subcategories/subcategoriesSlice";

const useGetNestedSubcategories = (categoryId) => {
  const dispatch = useDispatch();
  const {nestedSubcategories, isMutation} = useSelector(
    (state) => state.subcategories
  );

  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllSubcategoriesBelongToCertainCategory(categoryId));
      dispatch(resetMutationResult());
    } else {
      if (!categoryId) return;
      dispatch(getAllSubcategoriesBelongToCertainCategory(categoryId));
    }
  }, [dispatch, isMutation.success, categoryId]);

  return {nestedSubcategories, isMutation};
};
export default useGetNestedSubcategories;

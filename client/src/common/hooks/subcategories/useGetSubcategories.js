import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllSubcategories} from "../../../features/subcategories/subcategoriesServices";

import {resetMutationResult} from "../../../features/subcategories/subcategoriesSlice";

const useGetSubcategories = (limit, page) => {
  const dispatch = useDispatch();
  const {allSubcategories, isMutation} = useSelector(
    (state) => state.subcategories
  );

  useEffect(() => {
    if (isMutation.success) {
      dispatch(getAllSubcategories({limit, page}));
      dispatch(resetMutationResult());
    } else {
      dispatch(getAllSubcategories({limit, page}));
    }
  }, [dispatch, isMutation.success, limit, page]);

  return {allSubcategories, isMutation};
};
export default useGetSubcategories;

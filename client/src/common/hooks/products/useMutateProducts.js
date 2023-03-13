import {useDispatch} from "react-redux";
import {deleteProduct} from "../../../features/products/productsServices";

const useMutateProducts = () => {
  const dispatch = useDispatch();
  /*____UPDATE_PRODUCT-[in update product modal]____*/
  /*____CREATE_PRODUCT-[in create product modal]____*/
  /*____DELETE_PRODUCT____*/
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return {
    handleDeleteProduct,
  };
};
export default useMutateProducts;

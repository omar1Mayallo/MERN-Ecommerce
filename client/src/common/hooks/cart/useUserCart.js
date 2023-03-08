import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserCart} from "../../../features/cart/cartServices";
import {resetMutationResult} from "../../../features/cart/cartSlice";

const useUserCart = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.user);
  const {isMutation, userCart} = useSelector((state) => state.cart);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (isMutation.success) {
      dispatch(resetMutationResult());
      dispatch(getUserCart());
    } else {
      dispatch(getUserCart());
    }
  }, [dispatch, isMutation.success, isLoggedIn]);

  return {userCart, isMutation};
};
export default useUserCart;

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../../../features/wishlist/wishlistServices";
import {resetMutationResult} from "../../../features/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.user);
  const {userWishList, isMutation} = useSelector((state) => state.wishlist);
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (isMutation.success) {
      dispatch(resetMutationResult());
      dispatch(getUserWishlist());
    } else {
      dispatch(getUserWishlist());
    }
  }, [dispatch, isMutation.success, isLoggedIn]);

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };
  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return {
    userWishList,
    isMutation,
    isLoggedIn,
    handleRemoveFromWishlist,
    handleAddToWishlist,
  };
};
export default useWishlist;

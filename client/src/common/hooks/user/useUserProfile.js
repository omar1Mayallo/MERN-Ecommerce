import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserProfile} from "../../../features/user/userServices";
import {resetMutationResult} from "../../../features/user/userSlice";

const useUserProfile = () => {
  const dispatch = useDispatch();
  const {userProfile, isMutation, isLoggedIn} = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isLoggedIn) {
      if (isMutation.success) {
        dispatch(getUserProfile());
        dispatch(resetMutationResult());
      } else {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, isLoggedIn, isMutation.success]);
  // console.log(isMutation);
  return {userProfile, isMutation};
};
export default useUserProfile;

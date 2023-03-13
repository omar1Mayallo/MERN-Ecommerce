import {useDispatch} from "react-redux";
import {deleteUser, updateUserRole} from "../../../features/user/userServices";

const useMutateUsers = () => {
  const dispatch = useDispatch();

  /*____UPDATE_ORDER_TO_DELIVERED____*/
  const handleUpdateUserRole = (userId, role) => {
    dispatch(updateUserRole({userId, role}));
  };
  /*____DELETE_CATEGORY____*/
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return {
    handleUpdateUserRole,
    handleDeleteUser,
  };
};
export default useMutateUsers;

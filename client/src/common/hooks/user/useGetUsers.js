import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../../features/user/userServices";
import {resetMutationAdminResult} from "../../../features/user/userSlice";

const useGetUsers = (limit, page) => {
  const dispatch = useDispatch();
  const {allUsers, isMutationAdmin} = useSelector((state) => state.user);

  useEffect(() => {
    if (isMutationAdmin.success) {
      dispatch(getAllUsers({limit, page}));
      dispatch(resetMutationAdminResult());
    } else {
      dispatch(getAllUsers({limit, page}));
    }
  }, [dispatch, isMutationAdmin.success, limit, page]);

  return {allUsers, isMutationAdmin};
};
export default useGetUsers;

// const useAllUsers = (limit) => {
//   const dispatch = useDispatch();
//   const {allUsers, isMutationAdmin} = useSelector((state) => state.user);

//   const [page, setPage] = useState(1);
//   //_PAGINATION_//
//   const handlePagination = (pg) => {
//     setPage(pg);
//   };
//   //_GET_ALL_USERS_//
//   useEffect(() => {
//     if (isMutationAdmin.success) {
//       dispatch(getAllUsers({limit, page}));
//       dispatch(resetMutationAdminResult());
//     } else {
//       dispatch(getAllUsers({limit, page}));
//     }
//   }, [dispatch, isMutationAdmin.success, limit, page]);

//   //_UPDATE_USER_ROLE_//
//   const handleUpdateUserRole = (userId, role) => {
//     dispatch(updateUserRole({userId, role}));
//   };

//   //_DELETE_USER_//
//   const handleDeleteUser = (userId) => {
//     dispatch(deleteUser(userId));
//   };

//   return {
//     allUsers,
//     isMutationAdmin,
//     handleUpdateUserRole,
//     handleDeleteUser,
//     handlePagination,
//   };
// };
// export default useAllUsers;

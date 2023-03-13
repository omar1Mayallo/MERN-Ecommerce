import React, {useState} from "react";
import {MdDelete} from "react-icons/md";
import {Alert, Badge} from "reactstrap";
import DashboardHead from "../../../common/components/Heads/DashboardHead";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import PaginateTable from "../../../common/components/Shared/PaginateTable";
import useGetUsers from "../../../common/hooks/user/useGetUsers";
import useMutateUsers from "../../../common/hooks/user/useMutateUsers";
import DashboardLayout from "../../../layout/DashboardLayout";

const Users = () => {
  /*____ALL_USERS____*/
  //_PAGINATION
  const [page, setPage] = useState(1);
  const handlePagination = (pg) => {
    setPage(pg);
  };
  const {allUsers, isMutationAdmin} = useGetUsers(5, page);

  /*____MUTATION_HANDLERS___*/
  const {handleDeleteUser, handleUpdateUserRole} = useMutateUsers();

  return (
    <>
      <PageHelmet title={"Users"} />
      <DashboardLayout>
        <section className="Users-section">
          {/*____LOADING_OVERLAY____*/}
          <OverlayLoader active={isMutationAdmin?.loading} />

          {/*____HEAD____*/}
          <DashboardHead head={"Users"} loading={allUsers.loading} />

          {allUsers.loading || allUsers.users.length > 0 ? (
            <>
              {/*____USERS_TABLE____*/}
              <PaginateTable
                allItems={allUsers}
                handlePagination={handlePagination}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Register Date</th>
                    <th>Update Role</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.users.map((item) => (
                    <tr key={item._id}>
                      <td
                        className="text-capitalize"
                        style={{fontSize: "13px"}}
                      >
                        {item.username}
                      </td>
                      <td style={{fontSize: "13px"}}>{item.email}</td>
                      <td>
                        {item.role === "user" ? (
                          <Badge color="info" className="rounded">
                            {item.role.toUpperCase()}
                          </Badge>
                        ) : (
                          <Badge color="danger" className="rounded">
                            {item.role.toUpperCase()}
                          </Badge>
                        )}
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          name="user-roles"
                          id="user-roles"
                          defaultValue={item.role}
                          onChange={(e) =>
                            handleUpdateUserRole(item._id, e.target.value)
                          }
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td>
                        <MdDelete
                          color="red"
                          size={25}
                          onClick={() => handleDeleteUser(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </PaginateTable>
            </>
          ) : (
            <Alert>No User Registered Yet</Alert>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Users;

import React, {useState} from "react";
import {MdDelete, MdEdit} from "react-icons/md";
import {Link} from "react-router-dom";
import {Alert} from "reactstrap";
import DashboardHead from "../../../common/components/Heads/DashboardHead";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import PaginateTable from "../../../common/components/Shared/PaginateTable";
import useGetCategories from "../../../common/hooks/categories/useGetCategories";
import useMutateCategories from "../../../common/hooks/categories/useMutateCategories";
import DashboardLayout from "../../../layout/DashboardLayout";
import {CreateCategoryModal, UpdateCategoryModal} from "./MutateModals";

const Categories = () => {
  /*____ALL_CATEGORIES____*/
  //_PAGINATION
  const [page, setPage] = useState(1);
  const handlePagination = (pg) => {
    setPage(pg);
  };
  const {allCategories, isMutation} = useGetCategories(5, page);

  /*____UPDATE_MODAL____*/
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  /*____CREATE_MODAL____*/
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  /*____MUTATION_HANDLERS___*/
  const {
    category,
    setCategory,
    name,
    setName,
    description,
    setDescription,
    setNewImage,
    setImage,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useMutateCategories();

  return (
    <>
      <PageHelmet title={"Categories"} />
      <DashboardLayout>
        <section className="Categories-section">
          {/*____LOADING_OVERLAY____*/}
          <OverlayLoader active={isMutation?.loading} />

          {/*____HEAD____*/}
          <DashboardHead
            head={"Categories"}
            toggleCreateModal={toggleCreateModal}
            loading={allCategories.loading}
          />

          {/*____CREATE_MODAL____*/}
          <CreateCategoryModal
            modalState={createModal}
            toggle={toggleCreateModal}
            ModalHead={"Create Category"}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            setNewImage={setNewImage}
            handleCreateCategory={handleCreateCategory}
          />

          {allCategories.loading || allCategories.categories?.length > 0 ? (
            <>
              {/*____UPDATE_MODAL____*/}
              <UpdateCategoryModal
                modalState={updateModal}
                toggle={toggleUpdateModal}
                ModalHead={"Update Category"}
                category={category}
                setCategory={setCategory}
                setImage={setImage}
                handleUpdateCategory={handleUpdateCategory}
              />
              {/*____CATEGORIES_TABLE____*/}
              <PaginateTable
                allItems={allCategories}
                handlePagination={handlePagination}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Img</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.categories.map((item) => (
                    <tr key={item._id}>
                      <td style={{fontSize: "11px"}}>
                        <Link to={`/categories/${item._id}`}>{item._id}</Link>
                      </td>
                      <td style={{fontSize: "13px", fontStyle: "italic"}}>
                        {item.name.toUpperCase()}
                      </td>
                      <td>
                        <img
                          src={item.image}
                          alt="category-img"
                          width={30}
                          height={50}
                          style={{objectFit: "contain"}}
                        />
                      </td>
                      <td>
                        <MdEdit
                          size={25}
                          onClick={() => {
                            setCategory(item);
                            toggleUpdateModal();
                          }}
                        />
                      </td>
                      <td>
                        <MdDelete
                          color="red"
                          size={25}
                          onClick={() => handleDeleteCategory(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </PaginateTable>
            </>
          ) : (
            <Alert>No Categories Added Yet !</Alert>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Categories;

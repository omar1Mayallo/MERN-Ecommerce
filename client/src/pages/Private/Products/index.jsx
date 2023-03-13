import React, {useState} from "react";
import {MdDelete, MdEdit} from "react-icons/md";
import {Link} from "react-router-dom";
import {Alert, Badge} from "reactstrap";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import useGetProducts from "../../../common/hooks/products/useGetProducts";
import DashboardLayout from "../../../layout/DashboardLayout";
import PaginateTable from "../../../common/components/Shared/PaginateTable";
import {CreateProductModal, UpdateProductModal} from "./MutateModals";
import DashboardHead from "../../../common/components/Heads/DashboardHead";
import useMutateProducts from "../../../common/hooks/products/useMutateProducts";
import useGetCategories from "../../../common/hooks/categories/useGetCategories";

const Products = () => {
  /*____ALL_PRODUCTS____*/
  const {allProducts, isMutation, handlePagination} = useGetProducts(5);
  /*____ALL_CATEGORIES____*/
  const {allCategories} = useGetCategories();

  /*____UPDATE_MODAL____*/
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);
  /*____CREATE_MODAL____*/
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  /*____MUTATION_HANDLERS___*/
  const {handleDeleteProduct} = useMutateProducts();

  //_PRODUCT_TO_UPDATE
  const [product, setProduct] = useState(null);
  // console.log(product);
  return (
    <>
      <PageHelmet title={"Products"} />
      <DashboardLayout>
        <section className="Products-section">
          {/*____LOADING_OVERLAY____*/}
          <OverlayLoader active={isMutation?.loading} />

          {/*____HEAD____*/}
          <DashboardHead
            head={"Products"}
            toggleCreateModal={toggleCreateModal}
            loading={allProducts.loading}
          />

          {/*____CREATE_MODAL____*/}
          <CreateProductModal
            modalState={createModal}
            toggle={toggleCreateModal}
            ModalHead={"Create Product"}
            allCategories={allCategories}
          />

          {allProducts.loading || allProducts.products?.length > 0 ? (
            <>
              {/*____UPDATE_MODAL____*/}
              <UpdateProductModal
                modalState={updateModal}
                toggle={toggleUpdateModal}
                ModalHead={"Update Product"}
                allCategories={allCategories}
                product={product}
                setProduct={setProduct}
              />

              {/*____PRODUCTS_TABLE____*/}
              <PaginateTable
                allItems={allProducts}
                handlePagination={handlePagination}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Img</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>discount</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Sold</th>
                    <th>Rating</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.products.map((item) => (
                    <tr key={item._id}>
                      <td style={{fontSize: "11px"}}>
                        <Link to={`/products/${item._id}`}>{item._id}</Link>
                      </td>
                      <td>
                        <img
                          src={item.image}
                          alt="category-img"
                          width={50}
                          height={50}
                          style={{objectFit: "contain"}}
                        />
                      </td>
                      <td style={{fontSize: "13px", fontStyle: "italic"}}>
                        {item.name.toUpperCase()}
                      </td>
                      <td style={{fontSize: "13px", color: "red"}}>
                        ${item.price}
                      </td>
                      <td style={{fontSize: "13px", color: "gray"}}>
                        {item.discount === 0 ? "_" : `$${item.discount}`}
                      </td>
                      <td style={{fontSize: "13px"}}>
                        <Badge color="info">{item?.category?.name}</Badge>
                      </td>
                      <td style={{fontSize: "13px"}}>{item.quantityInStock}</td>
                      <td style={{fontSize: "13px"}}>{item.sold}</td>
                      <td style={{fontSize: "13px"}}>{item.ratingAverage}</td>
                      <td>
                        <MdEdit
                          size={25}
                          onClick={() => {
                            setProduct(item);
                            setTimeout(() => {
                              toggleUpdateModal();
                            }, 100);
                          }}
                        />
                      </td>
                      <td>
                        <MdDelete
                          color="red"
                          size={25}
                          onClick={() => handleDeleteProduct(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </PaginateTable>
            </>
          ) : (
            <Alert>No Products Added Yet !</Alert>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Products;

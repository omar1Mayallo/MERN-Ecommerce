import React, {useState} from "react";
import {Alert} from "reactstrap";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import DashboardLayout from "../../../layout/DashboardLayout";
import {MdDelete, MdEdit} from "react-icons/md";
import useGetCoupons from "../../../common/hooks/coupons/useGetCoupons";
import useMutateCoupons from "../../../common/hooks/coupons/useMutateCoupons";
import DashboardHead from "../../../common/components/Heads/DashboardHead";
import PaginateTable from "../../../common/components/Shared/PaginateTable";
import {CreateCouponModal, UpdateCouponModal} from "./MutateModals";

const Coupons = () => {
  /*____ALL_COUPONS____*/
  //_PAGINATION
  const [page, setPage] = useState(1);
  const handlePagination = (pg) => {
    setPage(pg);
  };
  const {allCoupons, isMutation} = useGetCoupons(5, page);

  /*____UPDATE_MODAL____*/
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  /*____CREATE_MODAL____*/
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  /*____MUTATION_HANDLERS___*/
  const {
    handleChangeValues,
    handleCreateCoupon,
    handleDeleteCoupon,
    handleUpdateCoupon,
    getDateToInput,
    setCoupon,
    coupon,
  } = useMutateCoupons();

  return (
    <>
      <PageHelmet title={"Coupons"} />
      <DashboardLayout>
        <section className="Coupons-section position-relative">
          {/*____LOADING_OVERLAY____*/}
          <OverlayLoader active={isMutation?.loading} />

          {/*____HEAD____*/}
          <DashboardHead
            head={"Coupons"}
            toggleCreateModal={toggleCreateModal}
            loading={allCoupons.loading}
          />

          {/*____CREATE_MODAL____*/}
          <CreateCouponModal
            modalState={createModal}
            toggle={toggleCreateModal}
            ModalHead={"Create Coupon"}
            handleCreateCoupon={handleCreateCoupon}
            handleChangeValues={handleChangeValues}
          />

          {allCoupons.loading || allCoupons.coupons?.length > 0 ? (
            <>
              {/* UPDATE_MODAL */}
              <UpdateCouponModal
                modalState={updateModal}
                toggle={toggleUpdateModal}
                ModalHead={"Update Coupon"}
                handleUpdateCoupon={handleUpdateCoupon}
                getDateToInput={getDateToInput}
                coupon={coupon}
                setCoupon={setCoupon}
              />

              {/*____COUPONS_TABLE____*/}
              <PaginateTable
                allItems={allCoupons}
                handlePagination={handlePagination}
              >
                <thead>
                  <tr>
                    <th>Coupon Code</th>
                    <th>Expire At</th>
                    <th>ProductID</th>
                    <th>% Discount</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allCoupons.coupons.map((item) => (
                    <tr key={item._id}>
                      <td style={{fontSize: "12px"}}>{item.name}</td>
                      <td style={{fontSize: "12px"}}>
                        <div>{getDateToInput(item.expire)}</div>
                      </td>
                      <td style={{fontSize: "12px"}}>{item.product}</td>
                      <td style={{fontSize: "14px", color: "red"}}>
                        %{item.discount}
                      </td>
                      <td>
                        <MdEdit
                          size={25}
                          onClick={() => {
                            setCoupon(item);
                            toggleUpdateModal();
                          }}
                        />
                      </td>
                      <td>
                        <MdDelete
                          color="red"
                          size={25}
                          onClick={() => handleDeleteCoupon(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </PaginateTable>
            </>
          ) : (
            <Alert>No Coupons Added Yet !</Alert>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Coupons;

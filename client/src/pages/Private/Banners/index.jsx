import React, {useState} from "react";
import {Alert, Col, Row} from "reactstrap";
import BannerCard from "../../../common/components/Cards/BannerCard";
import OverlayLoader from "../../../common/components/Loaders/OverlayLoader";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import useGetBanners from "../../../common/hooks/banners/useGetBanners";
import DashboardLayout from "../../../layout/DashboardLayout";
import DashboardHead from "../../../common/components/Heads/DashboardHead";
import CreateBannerModal from "./MutateModals";
import useMutateBanners from "../../../common/hooks/banners/useMutateBanners";

const Banners = () => {
  /*____ALL_BANNERS____*/
  const {allBanners, isMutation} = useGetBanners();

  /*____CREATE_MODAL____*/
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  /*____MUTATION_HANDLERS___*/
  const {handleChangeImage, handleCreateBanner, handleDeleteBanner} =
    useMutateBanners();

  return (
    <>
      <PageHelmet title={"Banners"} />
      <DashboardLayout>
        <section className="Banners-section">
          {/*____LOADING_OVERLAY____*/}
          <OverlayLoader active={isMutation?.loading} />
          {/*____HEAD____*/}
          <DashboardHead
            head={"Banners"}
            toggleCreateModal={toggle}
            loading={allBanners.loading}
          />
          {/*____CREATE_MODAL____*/}
          <CreateBannerModal
            ModalHead={"Upload Banner Image"}
            handleChangeImage={handleChangeImage}
            handleCreateBanner={handleCreateBanner}
            modalState={modal}
            toggle={toggle}
          />
          {/*____BANNERS_LIST____*/}
          {allBanners.loading || allBanners.banners?.length > 0 ? (
            <Row lg={3} md={2} xs={1}>
              {allBanners.banners?.map((item, idx) => (
                <Col key={idx} className="mb-3">
                  <BannerCard
                    imgUrl={item?.image}
                    handleDeleteBanner={() => handleDeleteBanner(item._id)}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Alert>No Banners Added Yet !</Alert>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Banners;

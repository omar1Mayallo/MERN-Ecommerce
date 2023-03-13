import React from "react";
import {Carousel} from "react-responsive-carousel";
import {Alert} from "reactstrap";
import useGetBanners from "../../../hooks/banners/useGetBanners";
import BlockLoader from "../../Loaders/BlockLoader";

const BannersCarousel = () => {
  const {allBanners} = useGetBanners();

  return (
    <>
      {allBanners?.loading ? (
        <BlockLoader minHeight={400} />
      ) : allBanners?.error ? (
        <Alert color="danger">{allBanners?.error}</Alert>
      ) : (
        <>
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            transitionTime={800}
            autoPlay
            infiniteLoop
            interval={3000}
          >
            {allBanners?.banners?.map((item, idx) => (
              <div key={idx}>
                <img
                  src={item?.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    // objectFit: "cover",
                  }}
                  alt={"banner-img"}
                />
              </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default BannersCarousel;

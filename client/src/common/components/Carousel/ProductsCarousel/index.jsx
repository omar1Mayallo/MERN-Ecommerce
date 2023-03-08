import React from "react";
import ProductCard from "../../Cards/ProductCard";
import Carousel from "react-multi-carousel";
import {Alert, Container} from "reactstrap";
import CenterHead from "../../Heads/CenterHead";
import BlockLoader from "../../Loaders/BlockLoader";

const ProductsCarousel = ({item, secHead}) => {
  return (
    <Container className="my-5">
      {/* CarouselHead */}
      <CenterHead head={item?.secHead || secHead} />

      {/* CarouselTrack */}
      {item?.loading ? (
        <BlockLoader minHeight={300} />
      ) : item?.error ? (
        <Alert color="danger">{item?.error}</Alert>
      ) : (
        <>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 992,
                },
                items: 4,
                partialVisibilityGutter: 40,
              },
              tablet: {
                breakpoint: {
                  max: 992,
                  min: 768,
                },
                items: 3,
                partialVisibilityGutter: 30,
              },
              mobile: {
                breakpoint: {
                  max: 768,
                  min: 576,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
              xsMobile: {
                breakpoint: {
                  max: 576,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {item?.products?.map((item, idx) => (
              <div className="m-2" key={idx}>
                <ProductCard item={item} />
              </div>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
};

export default ProductsCarousel;

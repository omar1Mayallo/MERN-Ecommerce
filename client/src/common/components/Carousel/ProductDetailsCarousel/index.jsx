import React from "react";
import Carousel from "react-multi-carousel";

const ProductDetailsCarousel = ({sliderImages, image}) => {
  return (
    <>
      {sliderImages && sliderImages.length > 0 ? (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass=""
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
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
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 40,
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
          {sliderImages.map((img, idx) => (
            <div className="mx-auto" style={{maxWidth: "400px"}} key={idx}>
              <img src={img} alt={img} className="img-fluid" />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="text-center mx-auto" style={{maxWidth: "400px"}}>
          <img src={image} alt="product-img" className="img-fluid mx-auto" />
        </div>
      )}
    </>
  );
};

export default ProductDetailsCarousel;

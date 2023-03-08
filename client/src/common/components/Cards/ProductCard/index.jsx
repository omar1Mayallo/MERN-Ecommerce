import React from "react";
import RatingStars from "../../Shared/RatingStars";
import {LinkContainer} from "react-router-bootstrap";
import {ProductItemStyled} from "./styles";
import ImageLoader from "../../Loaders/ImgLoader";

const ProductCard = ({
  item: {
    name,
    image,
    reviewsNumber,
    ratingAverage,
    price,
    discount,
    quantityInStock,
    _id,
  },
}) => {
  return (
    <LinkContainer
      to={`/products/${_id}`}
      className={"mx-auto rounded"}
      style={{
        maxWidth: "230px",
        cursor: "pointer",
      }}
    >
      <ProductItemStyled>
        {/* SoldOut */}
        {quantityInStock <= 0 && (
          <div className="sold-out">
            <span>Sold out</span>
          </div>
        )}

        {/* Image */}
        <div className="img-box text-center p-2">
          <ImageLoader
            image={image}
            style={{
              maxHeight: "160px",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="info-box d-flex flex-column p-3">
          {/* Name */}
          <h5 style={{height: "29px", fontSize: "14px"}}>
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </h5>

          {/* Rating */}
          <div className="my-1 d-flex align-items-center">
            <RatingStars ratingAverage={ratingAverage} size={19} />
            <span className="text-muted">({reviewsNumber})</span>
          </div>
          {/* Price&Discount */}
          <div className="d-flex justify-content-between">
            <span style={{color: "#ff6262"}}>${price - discount}</span>
            {discount > 0 && (
              <span className="text-muted text-decoration-line-through">
                ${price}
              </span>
            )}
          </div>
        </div>
      </ProductItemStyled>
    </LinkContainer>
  );
};

export default ProductCard;

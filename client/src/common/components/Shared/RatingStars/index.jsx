import React from "react";
import ReactStars from "react-rating-stars-component";
import {MdStar, MdStarHalf, MdStarBorder} from "react-icons/md";

const RatingStars = ({ratingAverage, size}) => {
  const setting = {
    size,
    value: ratingAverage,
    isHalf: true,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
    edit: false,
  };
  return <ReactStars {...setting} />;
};

export default RatingStars;

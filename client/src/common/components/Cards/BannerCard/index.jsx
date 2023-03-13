import React from "react";
import {MdOutlineDeleteOutline} from "react-icons/md";
import ImageLoader from "../../Loaders/ImgLoader";
import {BannerCardStyled} from "./styles";

const BannerCard = ({imgUrl, handleDeleteBanner}) => {
  return (
    <BannerCardStyled className="p-1" style={{background: "#dddddd"}}>
      <div className="remove-icon" onClick={handleDeleteBanner}>
        <MdOutlineDeleteOutline size={20} />
      </div>
      <ImageLoader
        image={imgUrl}
        style={{maxWidth: "100%", height: "auto", objectFit: "contain"}}
      />
    </BannerCardStyled>
  );
};

export default BannerCard;

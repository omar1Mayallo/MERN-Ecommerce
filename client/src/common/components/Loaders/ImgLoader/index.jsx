import React, {useState} from "react";
import BlockLoader from "../BlockLoader";

const ImageLoader = ({image, style}) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const handleImageLoaded = () => {
    setIsImgLoaded(true);
  };
  return (
    <>
      {!isImgLoaded && <BlockLoader />}
      <img
        src={image}
        alt="item-img"
        style={{display: `${!isImgLoaded ? "none" : "inline"}`, ...style}}
        onLoad={handleImageLoaded}
      />
    </>
  );
};

export default ImageLoader;

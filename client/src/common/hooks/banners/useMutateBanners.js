import {useState} from "react";
import {useDispatch} from "react-redux";
import {
  createBanner,
  deleteBanner,
} from "../../../features/banners/bannersServices";
import pushNotification from "../../components/Shared/Notification";

const useMutateBanners = () => {
  const dispatch = useDispatch();

  /*____CREATE_BANNER____*/
  //__IMAGE
  const [image, setImage] = useState(null);
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateBanner = () => {
    const formData = new FormData();

    if (!image) {
      pushNotification("Please select image", "error");
      return;
    }
    formData.set("image", image);
    dispatch(createBanner({image}));
    setImage(null);
  };

  /*____DELETE_BANNER____*/
  const handleDeleteBanner = (id) => {
    dispatch(deleteBanner(id));
  };

  return {handleChangeImage, handleCreateBanner, handleDeleteBanner};
};
export default useMutateBanners;

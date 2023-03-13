import {useState} from "react";
import {useDispatch} from "react-redux";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../../features/categories/categoriesServices";
import pushNotification from "../../components/Shared/Notification";

const useMutateCategories = () => {
  const dispatch = useDispatch();

  /*____UPDATE_CATEGORY____*/
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const handleUpdateCategory = () => {
    const formData = new FormData();
    formData.set("name", category?.name);
    formData.set("description", category?.description);
    if (image) {
      formData.set("image", image);
    }
    dispatch(updateCategory({categoryId: category?._id, body: formData}));
  };

  /*____CREATE_CATEGORY____*/
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const handleCreateCategory = () => {
    const formData = new FormData();
    if (!name || !newImage) {
      pushNotification("Name and image is required", "error");
      return;
    }
    formData.set("name", name);
    formData.set("description", description);
    if (newImage) {
      formData.set("image", newImage);
    }
    dispatch(createCategory(formData));
    setName("");
    setDescription("");
    setNewImage(null);
  };

  /*____DELETE_CATEGORY____*/
  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return {
    category,
    setCategory,
    name,
    setName,
    description,
    setDescription,
    setNewImage,
    setImage,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};
export default useMutateCategories;

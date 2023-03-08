import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../../features/cart/cartServices";
import pushNotification from "../../components/Shared/Notification";

const useAddToCart = (product) => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colorIdx, setColorIdx] = useState("");
  const [sizeIdx, setSizeIdx] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  // Color
  const handleSelectColor = (idx, colorSelected) => {
    setColor(colorSelected);
    setColorIdx(idx);
  };
  // Size
  const handleSelectSize = (idx, sizeSelected) => {
    setSize(sizeSelected);
    setSizeIdx(idx);
  };
  // Quantity
  const handleQtyClick = (idx) => {
    setQuantity(idx);
  };

  const handleAddToCart = () => {
    if (product.colors.length !== 0) {
      if (!color) {
        pushNotification("Please select a color", "error");
        return;
      }
    } else {
      setColor("");
    }
    if (product.size.length !== 0) {
      if (!size) {
        pushNotification("Please select a size", "error");
        return;
      }
    } else {
      setSize("");
    }

    dispatch(
      addToCart({
        productId: product?._id,
        color,
        size,
        quantity,
      })
    );
  };

  return {
    colorIdx,
    sizeIdx,
    handleSelectColor,
    handleSelectSize,
    handleQtyClick,
    handleAddToCart,
    cartState,
  };
};

export default useAddToCart;

import {useState} from "react";
import {useDispatch} from "react-redux";
import {
  createCoupon,
  deleteCoupon,
  updateCoupon,
} from "../../../features/coupons/couponsServices";

const useMutateCoupons = () => {
  const dispatch = useDispatch();

  /*____CREATE_CATEGORY____*/
  const [values, setValues] = useState({
    name: "",
    product: "",
    expire: "",
    discount: "",
  });
  // console.log(values);
  const handleChangeValues = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleCreateCoupon = () => {
    dispatch(createCoupon(values));
  };

  /*____UPDATE_CATEGORY____*/
  //_FORMATTING_DATE
  //@desc the date field use date format yyyy-MM-dd
  const getDateToInput = (date) => {
    if (date) {
      let day = new Date(date).getDate();
      let month = new Date(date).getMonth() + 1;
      let year = new Date(date).getFullYear();
      if (month < 10) month = `0${month}`;
      if (day < 10) day = `0${day}`;
      // console.log("MONTH" + month);
      // console.log("DAY" + month);
      return year + "-" + month + "-" + day;
    }
  };

  const [coupon, setCoupon] = useState(null);
  const handleUpdateCoupon = () => {
    dispatch(
      updateCoupon({
        couponId: coupon._id,
        body: {
          product: coupon.product,
          discount: coupon.discount,
          name: coupon.name,
          expire: getDateToInput(coupon.expire),
        },
      })
    );
  };

  /*____DELETE_CATEGORY____*/
  const handleDeleteCoupon = (id) => {
    dispatch(deleteCoupon(id));
  };

  return {
    handleChangeValues,
    handleCreateCoupon,
    handleDeleteCoupon,
    handleUpdateCoupon,
    getDateToInput,
    setCoupon,
    coupon,
  };
};
export default useMutateCoupons;

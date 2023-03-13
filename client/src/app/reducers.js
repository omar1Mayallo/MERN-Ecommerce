import {combineReducers} from "@reduxjs/toolkit";
import productsSlice from "../features/products/productsSlice";
import cartSlice from "../features/cart/cartSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import userSlice from "../features/user/userSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import addressSlice from "../features/address/addressSlice";
import couponsSlice from "../features/coupons/couponsSlice";
import ordersSlice from "../features/orders/ordersSlice";
import bannersSlice from "../features/banners/bannersSlice";
import reviewsSlice from "../features/reviews/reviewsSlice";
import subcategoriesSlice from "../features/subcategories/subcategoriesSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  banners: bannersSlice,
  user: userSlice,
  coupons: couponsSlice,
  categories: categoriesSlice,
  wishlist: wishlistSlice,
  cart: cartSlice,
  orders: ordersSlice,
  address: addressSlice,
  reviews: reviewsSlice,
  subcategories: subcategoriesSlice,
});

export default rootReducer;

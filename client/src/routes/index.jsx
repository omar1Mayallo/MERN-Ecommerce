import {lazy} from "react";
import {useSelector} from "react-redux";
import {Routes, Route, Navigate} from "react-router-dom";
import ProtectRoutes from "./ProtectRoutes";

// PUBLIC_ROUTES
const Home = lazy(() => import("../pages/Public/Home"));
const Cart = lazy(() => import("../pages/Public/Cart"));
const Categories = lazy(() => import("../pages/Public/Categories"));
const CategoryDetails = lazy(() => import("../pages/Public/CategoryDetails"));
const Shop = lazy(() => import("../pages/Public/Shop"));
const ProductDetails = lazy(() => import("../pages/Public/ProductDetails"));
const Login = lazy(() => import("../pages/Public/Login"));
const Register = lazy(() => import("../pages/Public/Register"));

// PROTECTED_ROUTES
const Checkout = lazy(() => import("../pages/Protected/Checkout"));
const UserOrders = lazy(() => import("../pages/Protected/Orders"));
const OrderDetails = lazy(() => import("../pages/Protected/OrderDetails"));
const Wishlist = lazy(() => import("../pages/Protected/Wishlist"));
const Profile = lazy(() => import("../pages/Protected/Profile"));

// ADMIN_ROUTES
const Users = lazy(() => import("../pages/Private/Users"));
const Products = lazy(() => import("../pages/Private/Products"));
const Banners = lazy(() => import("../pages/Private/Banners"));
const AdminCategories = lazy(() => import("../pages/Private/Categories"));

const Orders = lazy(() => import("../pages/Private/Orders"));
const Coupons = lazy(() => import("../pages/Private/Coupons"));

const AppRoutes = () => {
  const {isLoggedIn} = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/">
        {/* PUBLIC_ROUTES */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path=":categoryId" element={<CategoryDetails />} />
        </Route>
        <Route
          path="login"
          element={!isLoggedIn ? <Login /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="register"
          element={!isLoggedIn ? <Register /> : <Navigate to={"/"} replace />}
        />

        {/* PROTECTED_ROUTES */}
        <Route element={<ProtectRoutes />}>
          <Route path="profile" element={<Profile />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders">
            <Route index element={<UserOrders />} />
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
        </Route>

        {/* ADMIN_ROUTES */}
        <Route path={"admin"} element={<ProtectRoutes isAdmin={true} />}>
          <Route index path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="banners" element={<Banners />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Route>

      {/* NOTFOUND_ROUTES */}
      <Route path="*" element={<div>Not Found Page</div>} />
    </Routes>
  );
};

export default AppRoutes;

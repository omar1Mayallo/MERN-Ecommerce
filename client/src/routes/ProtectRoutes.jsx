import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectRoutes = ({isAdmin, children}) => {
  const {isLoggedIn, userProfile} = useSelector((state) => state.user);
  if (!isLoggedIn) {
    window.location.href = "/login";
    return;
  }
  if (userProfile.loading === false) {
    if (isAdmin && userProfile?.user?.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
  }
};

export default ProtectRoutes;

import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectRoutes = ({isAdmin, children}) => {
  const {isLoggedIn, userProfile} = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userProfile.loading === false) {
    if (isAdmin && userProfile.user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
  }
};

export default ProtectRoutes;

import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Outlet, Navigate } from "react-router-dom";
import { APP_ROUTE_PATHS } from "../../constants";

const PrivateRouteHandlerForAdmin: React.FC = () => {
  const { loggedInUser } = useSelector((state: any) => state.user);

  // If admin user is logged in, render the child components
  // else redirect to landing page
  return loggedInUser && loggedInUser?.userRole == "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTE_PATHS.LANDING} />
  );
};

export default PrivateRouteHandlerForAdmin;

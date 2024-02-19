import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Outlet, Navigate } from "react-router-dom";
import { APP_ROUTE_PATHS } from "../../constants";

const PrivateRouteHandler: React.FC = () => {
  const { loggedInUser } = useSelector((state: any) => state.user);

  // If user is logged in, render the child components
  // else redirect to login page
  return loggedInUser ? <Outlet /> : <Navigate to={APP_ROUTE_PATHS.LOGIN} />;
};

export default PrivateRouteHandler;

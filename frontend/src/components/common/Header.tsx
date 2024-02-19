import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Menu,
  MenuItem,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
  pageRoutes,
  protectedPageRoutes,
  userRoutes,
  constantMessages,
  APP_ROUTE_PATHS,
} from "../../constants";
import { StyledLink } from "./styles";
import { SignInLinkContainer } from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RenderOneSpotLogoForMobile = () => {
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate(APP_ROUTE_PATHS.LANDING);
  };
  return (
    <>
      <Box
        component="h1"
        sx={{
          mr: 1,
          ml: 1,
          display: { xs: "none", md: "flex" },
          fontWeight: 900,
          color: "black",
          letterSpacing: ".2rem",
          textDecoration: "none",
        }}
      >
        <div onClick={goToLanding}>
          <img src="/OneSpotLogo2.png" alt="logo" width={100} height={100} />
        </div>
      </Box>
    </>
  );
};

const RenderPageRoutes = () => {
  const [pageRoutesDropDown, setRoutesDropDown] =
    React.useState<HTMLElement | null>(null);

  const openNavSideMenu = (event: React.MouseEvent<HTMLElement>) => {
    setRoutesDropDown(event.currentTarget);
  };

  const closeNavSideMenu = () => {
    setRoutesDropDown(null);
  };

  const isLoggedIn = useSelector(
    (state: any) => state?.user?.loggedInUser !== null
  );
  const routes = isLoggedIn ? protectedPageRoutes : pageRoutes;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="menu side bar"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openNavSideMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={pageRoutesDropDown}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(pageRoutesDropDown)}
        onClose={closeNavSideMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {routes.map((page) => (
          <MenuItem key={page.name}>
            <StyledLink to={page.path} $header>
              {" "}
              {page.name}
            </StyledLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const RenderHeaderForMobile = () => {
  const [userRouteDropDown, setUserRouteDropDown] =
    React.useState<HTMLElement | null>(null);

  const { t } = useTranslation();
  const { loggedInUser } = useSelector((state: any) => state.user);
  const routes = loggedInUser != null ? protectedPageRoutes : pageRoutes;

  const openDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setUserRouteDropDown(event.currentTarget);
  };

  const closeDropDown = () => {
    setUserRouteDropDown(null);
  };

  const RenderProfileImage = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="User Routes">
          <IconButton onClick={openDropDown} sx={{ p: 0, mr: 1 }}>
            <Avatar alt="User Avatar" src={loggedInUser?.profilePicture} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={userRouteDropDown}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(userRouteDropDown)}
          onClose={closeDropDown}
        >
          {userRoutes.map((route) => (
            <MenuItem key={route.name}>
              <StyledLink to={route.path} $header={true}>
                {route.name}
              </StyledLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  const RenderSignInLink = () => {
    return (
      <SignInLinkContainer>
        <StyledLink to={APP_ROUTE_PATHS.LOGIN} $header={true}>
          {t("login.button.text")}
        </StyledLink>
      </SignInLinkContainer>
    );
  };

  const navigate = useNavigate();

  const goToLanding = () => {
    navigate(APP_ROUTE_PATHS.LANDING);
  };

  return (
    <>
      <Box
        component="h1"
        sx={{
          mr: 1,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 900,
          letterSpacing: ".2rem",
          color: "black",
        }}
      >
        <div onClick={goToLanding}>
          <img src="/OneSpotLogo2.png" alt="logo" width={100} height={100} />
        </div>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {routes.map((page) => (
          <StyledLink $header={true} to={page.path} $enableHorizontalPadding>
            {page.name}
          </StyledLink>
        ))}
      </Box>

      {loggedInUser ? RenderProfileImage() : RenderSignInLink()}
    </>
  );
};

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <CssBaseline />
      <Container maxWidth="xl"></Container>
      <Toolbar disableGutters>
        {RenderOneSpotLogoForMobile()}
        {RenderPageRoutes()}
        {RenderHeaderForMobile()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

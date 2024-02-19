import React, { useState } from "react";
import * as userService from "../../services/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { openToast } from "../../redux/slices/common-toast-slice";
import {
  UserPageContainer,
  PageTitle,
  ImageContainer,
  StyledImage,
  Container,
  StyledFormHandler,
  FormInput,
  ActionsContainer,
  DropdownContainer,
  DropdownButton,
  DropdownList,
  ListItem,
} from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setUserData } from "../../redux/slices/user-slice";
import { APP_ROUTE_PATHS } from "../../constants";

const UserPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { loggedInUser } = useSelector((state: any) => state.user);
  const [loader, setLoader] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<String>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const VernacularLanguages = [
    {
      title: t("languages.english"),
      key: "en",
    },
    {
      title: t("languages.tamil"),
      key: "ta",
    },
    {
      title: t("languages.telugu"),
      key: "te",
    },
  ];

  const RenderProfileImage = () => {
    return (
      <ImageContainer>
        <StyledImage
          src={loggedInUser?.profilePicture || "./images/vis_profile.jpeg"}
        />
      </ImageContainer>
    );
  };

  if (!loggedInUser) {
    return (
      <UserPageContainer>
        <PageTitle>{t("user.issue_in_profile_page")}</PageTitle>
      </UserPageContainer>
    );
  }

  const RenderUserDetails = () => {
    const [initialFormValues, setInitialFormValues] = useState({});

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoader(true);
      try {
        const response = await userService.update_profile(
          loggedInUser._id,
          initialFormValues
        );

        if (response.status === 200) {
          // we are adding user data to redux store
          dispatch(setUserData(response?.data));
          dispatch(
            openToast({
              message: `${t("user.profile_updated")}`,
              open: true,
              severity: "success",
            })
          );
        }
      } catch (error: any) {
        dispatch(
          openToast({
            message:
              error?.response?.data?.message || `${t("something_went_wrong")}`,
            open: true,
            severity: "warning",
          })
        );
      } finally {
        setLoader(false);
      }
    };

    return (
      <Container>
        <StyledFormHandler onSubmit={handleProfileUpdate}>
          <FormInput
            type="text"
            name="email"
            placeholder={t("email.placeholder")}
            defaultValue={loggedInUser.email}
            onChange={(e) =>
              setInitialFormValues({
                ...initialFormValues,
                email: e.target.value,
              })
            }
          />
          <FormInput
            type="text"
            name="userName"
            placeholder={t("user.user_name")}
            defaultValue={loggedInUser.userName}
            onChange={(e) =>
              setInitialFormValues({
                ...initialFormValues,
                userName: e.target.value,
              })
            }
          />
          <FormInput
            type="password"
            name="password"
            placeholder={t("user.password")}
            defaultValue={loggedInUser.password}
            onChange={(e) =>
              setInitialFormValues({
                ...initialFormValues,
                password: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loader}
            sx={{ mt: 4 }}
          >
            {t("user.update_profile")}
          </Button>
        </StyledFormHandler>
      </Container>
    );
  };

  const handleSignOut = async () => {
    setLoader(true);
    try {
      const response = await userService.sign_out();
      if (response.status === 200) {
        // we are removing user data from redux store
        dispatch(setUserData(null));
        navigate(APP_ROUTE_PATHS.LOGIN);
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        openToast({
          message:
            error?.response?.data?.message || `${t("something_went_wrong")}`,
          open: true,
          severity: "warning",
        })
      );
    } finally {
      setLoader(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoader(true);
    try {
      const response = await userService.delete_profile(loggedInUser._id);
      if (response.status === 200) {
        // we are removing user data from redux store
        dispatch(setUserData(null));
        navigate(APP_ROUTE_PATHS.LOGIN);
      }
    } catch (error: any) {
      dispatch(
        openToast({
          message:
            error?.response?.data?.message || `${t("something_went_wrong")}`,
          open: true,
          severity: "warning",
        })
      );
    } finally {
      setLoader(false);
    }
  };

  const RenderAdditonalUserActions = () => {
    return (
      <Container>
        <ActionsContainer>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={loader}
            sx={{ mt: 2 }}
            onClick={handleSignOut}
          >
            {t("user.sign_out")}
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={loader}
            sx={{ mt: 2, mb: 2 }}
            onClick={handleDeleteAccount}
          >
            {t("user.delete_account")}
          </Button>
        </ActionsContainer>
      </Container>
    );
  };

  return (
    <UserPageContainer>
      <PageTitle>{t("user.profile_title")}</PageTitle>
      {RenderProfileImage()}
      <RenderUserDetails />
      <RenderAdditonalUserActions />
      <DropdownContainer>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {selectedLanguage || t("languages.choose_language")}
        </DropdownButton>
        <DropdownList $isOpen={isOpen}>
          {VernacularLanguages.map((language: any, index: number) => (
            <ListItem key={index} onClick={() => changeLanguage(language.key)}>
              {language.title}
            </ListItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    </UserPageContainer>
  );
};

export default UserPage;

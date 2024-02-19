import { Button } from "@mui/material";
import { useState } from "react";
import * as authenticationService from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/user-slice";
import Link from "@mui/material/Link";
import {
  LoginContainer,
  StyledFormHandler,
  FormInput,
  PageTitle,
  ErrorMessageContainer,
  SignUpContainer,
  TextContainer,
} from "./styles";
import { APP_ROUTE_PATHS } from "../../constants";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [userMail, setUserMail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await authenticationService.login_user({
        email: userMail,
        password: userPassword,
      });

      if (response.status === 200) {
        dispatch(setUserData(response?.data));
        navigate(APP_ROUTE_PATHS.HOME);
      }

      if (response.status === 204) {
        setErrorMessage(`${t("user.user_disabled")}`);
      }
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || `${t("something_went_wrong")}`
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <LoginContainer>
      <StyledFormHandler onSubmit={handleUserLogin}>
        <PageTitle>{t("login.button.text")}</PageTitle>
        <FormInput
          type="text"
          name="email"
          placeholder={t("user.email")}
          required
          onChange={(e) => setUserMail(e.target.value)}
        />
        <FormInput
          type="password"
          name="password"
          placeholder={t("user.password")}
          required
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <ErrorMessageContainer
          $enable={errorMessage}
        >{`${errorMessage}`}</ErrorMessageContainer>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loader}
          sx={{ mt: 1 }}
        >
          {t("login.button.text")}
        </Button>
        <SignUpContainer>
          <TextContainer>
            {t("common_constants.dont_have_account")}
          </TextContainer>
          <Link href={APP_ROUTE_PATHS.SIGN_UP} underline="none">
            {t("signup.button.text")}
          </Link>
        </SignUpContainer>
      </StyledFormHandler>
    </LoginContainer>
  );
};

export default Login;

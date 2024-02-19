import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, styled, TextField, MenuItem } from "@mui/material";
import {
  genderOptions,
  countries,
  APP_ROUTE_PATHS,
} from "../../constants/index";
import * as authenticationService from "../../services/authentication";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/slices/common-toast-slice";
import { SignUpContainer, SignInContainer } from "./styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "8px",
  padding: "8px",
  width: "300px",
  borderRadius: "150px",
}));

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp: React.FC = () => {
  const [loader, setLoader] = React.useState(false);
  const initialFormValues = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    gender: "",
    dateOfBirth: "",
    country: "",
  };
  const { t } = useTranslation("common");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLoginScreen = () => {
    navigate(APP_ROUTE_PATHS.LOGIN);
  };

  const handleSubmit = async (values: any) => {
    setLoader(true);
    try {
      const response = await authenticationService.signup_user(values);

      if (response.status === 201) {
        console.log("User has been created successfully");
        goToLoginScreen();
      }
    } catch (error: any) {
      console.error("Error in signup: ", error);
      dispatch(
        openToast({
          message:
            error?.response?.data?.message || `${t("something_went_wrong")}`,
          open: true,
          severity: "warning",
        })
      );
      // Handle API error
    } finally {
      setLoader(false);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      disabled={loader}
    >
      {({ errors, touched }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 8px 0 8px",
          }}
        >
          <Field
            name="userName"
            label={t("user.user_name")}
            as={StyledTextField}
            variant="filled"
            required
            type="text"
          />
          <Field
            label={t("user.password")}
            name="password"
            as={StyledTextField}
            variant="filled"
            required
            type="password"
          />
          <Field
            label={t("email.placeholder")}
            name="email"
            as={StyledTextField}
            variant="filled"
            required
            type="email"
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field
            label={t("user.first_name")}
            name="firstName"
            as={StyledTextField}
            variant="filled"
            required
            type="text"
          />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <Field
            label={t("user.last_name")}
            name="lastName"
            as={StyledTextField}
            variant="filled"
            required
            type="text"
          />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}

          <Field
            label={t("user.phone_number")}
            name="phoneNo"
            as={StyledTextField}
            variant="filled"
            required
            type="tel"
          />
          <Field
            label={t("user.date_of_birth")}
            name="dateOfBirth"
            as={StyledTextField}
            variant="filled"
            required
            type="date"
          />
          <Field
            name="gender"
            label={t("user.gender")}
            as={StyledTextField}
            variant="filled"
            select
            required
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="" disabled>
              {t("user.select_gender")}
            </MenuItem>
            {genderOptions.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Field>

          <Field
            name="country"
            label={t("user.country")}
            as={StyledTextField}
            variant="filled"
            select
            required
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="" disabled>
              {t("user.select_country")}
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Field>

          <SignUpContainer>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loader}
              aria-disabled={loader}
              sx={{ margin: "16px 0", width: "300px" }}
            >
              Sign up
            </Button>
            <SignInContainer>
              {t("already_have_account")}{" "}
              <a
                href="/login"
                style={{ textDecoration: "none" }}
                aria-disabled={loader}
              >
                {t("login.button.text")}{" "}
              </a>
            </SignInContainer>
          </SignUpContainer>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;

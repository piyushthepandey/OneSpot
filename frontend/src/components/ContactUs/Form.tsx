import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  FormContainer,
  ContactUsForm,
  PageTitle,
  FormInput,
  FormTextArea,
} from "./styles";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/slices/common-toast-slice";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form: React.FC = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = "service_dk3yety";
    const templateId = "template_6wvu3ka";
    const publicKey = "uiFVaNuTAjgnOezSa";

    const templateParams = {
      from_name: data.name,
      email_id: data.email,
      to_name: "Onespot",
      message: data.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          message: "",
          email: "",
          name: "",
        }));
        dispatch(
          openToast({
            message: `${t("user.message_sent_successfully")}`,
            open: true,
            severity: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          openToast({
            message: `${t("user.message_not_sent")}`,
            open: true,
            severity: "error",
          })
        );
      });
  };

  return (
    <FormContainer>
      <ContactUsForm onSubmit={handleSubmit}>
        <PageTitle>{t("common_constants.contact_us")}</PageTitle>
        <h1></h1>
        <FormInput
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          placeholder={t("user.name")}
          required
        />
        <FormInput
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder={t("user.email")}
          required
        />

        <FormTextArea
          name="message"
          id="message"
          cols={30}
          rows={10}
          onChange={handleChange}
          placeholder={t("user.message")}
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 1 }}
        >
          {t("common_constants.send")}
        </Button>
      </ContactUsForm>
    </FormContainer>
  );
};

export default Form;

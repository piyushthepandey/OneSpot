import React from "react";
import Form from "../../components/ContactUs/Form";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import TransitionsModal from "../../components/common/filterModal";
import WhatsApp from "../../components/WhatsApp/whatsapp";

const ContactUs: React.FC = () => {
  return (
    <>
      <WhatsApp />
      <Form />
    </>
  );
};

export default ContactUs;

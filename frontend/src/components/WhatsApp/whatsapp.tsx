import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const avatar = "/OneSpotLogo2.png";

const WhatsApp: React.FC = () => {
  return (
    <>
      <FloatingWhatsApp
        phoneNumber="+919158234433"
        accountName="OneSpot"
        allowEsc
        allowClickAway
        chatMessage="Welcome to OneSpot! How can we help?"
        avatar={avatar}
      />
    </>
  );
};

export default WhatsApp;

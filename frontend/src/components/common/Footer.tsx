import React from "react";
import {
  FooterContainer,
  Section,
  SectionTitle,
  SocialIcons,
  ListContainer,
  StyledLink,
} from "./styles";
import Facebook from "../../assets/logos/facebook.svg";
import Instagram from "../../assets/logos/instagram.svg";
import Twitter from "../../assets/logos/twitter.svg";
import { APP_ROUTE_PATHS } from "../../constants";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <FooterContainer>
      <Section>
        <SectionTitle>{t("common_constants.about")}</SectionTitle>
        <ListContainer>
          <StyledLink to={APP_ROUTE_PATHS.CONTACT_US}>
            {t("common_constants.contact_us")}
          </StyledLink>
          <StyledLink to={APP_ROUTE_PATHS.ABOUT}>
            {t("common_constants.about_us")}
          </StyledLink>
        </ListContainer>
      </Section>

      <Section>
        <SectionTitle>{t("common_constants.help")}</SectionTitle>
        <ListContainer>
          <StyledLink to={APP_ROUTE_PATHS.FAQS}>
            {t("common_constants.faq")}
          </StyledLink>
        </ListContainer>
      </Section>

      <Section>
        <SectionTitle>{t("common_constants.consumer_policy")}</SectionTitle>
        <ListContainer>
          <StyledLink to={APP_ROUTE_PATHS.TERMS_AND_CONDITIONS}>
            {t("common_constants.terms_of_use")}
          </StyledLink>
          <StyledLink to={APP_ROUTE_PATHS.PRIVACY_POLICY}>
            {t("common_constants.privacy")}
          </StyledLink>
        </ListContainer>
      </Section>

      <Section>
        <SectionTitle>{t("common_constants.socials")}</SectionTitle>
        <SocialIcons>
          <a href="https://www.facebook.com" target="_blank">
            <img src={Facebook} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img src={Instagram} alt="Instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <img src={Twitter} alt="Twitter" />
          </a>
        </SocialIcons>
      </Section>
    </FooterContainer>
  );
};

export default Footer;

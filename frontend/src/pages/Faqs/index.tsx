import React from "react";
import ContentRenderer, {
  IStaticContentProps,
} from "../../components/common/ContentRenderer";
import {
  PageTitle,
  PrivacyPageContainer,
  PageTitleContainer,
} from "../../components/common/styles";
import { useTranslation } from "react-i18next";
import WhatsApp from "../../components/WhatsApp/whatsapp";

const Faqs: React.FC = () => {
  const { t } = useTranslation();

  const termsAndConditions = [
    {
      title: t("faq_page.section_1.title"),
      content: t("faq_page.section_1.content"),
    },
    {
      title: t("faq_page.section_2.title"),
      content: t("faq_page.section_2.content"),
    },
    {
      title: t("faq_page.section_3.title"),
      content: t("faq_page.section_3.content"),
    },
    {
      title: t("faq_page.section_4.title"),
      content: t("faq_page.section_4.content"),
    },
    {
      title: t("faq_page.section_4.title"),
      content: t("faq_page.section_5.content"),
    },
  ];

  return (
    <PrivacyPageContainer>
      <PageTitleContainer>
        <PageTitle>{t("faq_page.page_title")}</PageTitle>
      </PageTitleContainer>
      {termsAndConditions.map((privacypolicy: IStaticContentProps) => (
        <ContentRenderer
          key={privacypolicy.title}
          title={privacypolicy.title}
          content={privacypolicy.content}
        />
      ))}
      <WhatsApp />
    </PrivacyPageContainer>
  );
};

export default Faqs;

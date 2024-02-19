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

const TermsAndConditions: React.FC = () => {
  const { t } = useTranslation();

  const termsAndConditions = [
    {
      title: t("terms_of_use.section_1.title"),
      content: t("terms_of_use.section_1.content"),
    },
    {
      title: t("terms_of_use.section_2.title"),
      content: t("terms_of_use.section_2.content"),
    },
    {
      title: t("terms_of_use.section_3.title"),
      content: t("terms_of_use.section_3.content"),
    },
  ];

  return (
    <PrivacyPageContainer>
      <PageTitleContainer>
        <PageTitle>{t("terms_of_use.page_title")}</PageTitle>
      </PageTitleContainer>
      {termsAndConditions.map((privacypolicy: IStaticContentProps) => (
        <ContentRenderer
          key={privacypolicy.title}
          title={privacypolicy.title}
          content={privacypolicy.content}
        />
      ))}
    </PrivacyPageContainer>
  );
};

export default TermsAndConditions;

import React from "react";
import { useTranslation } from "react-i18next";
import ContentRenderer, {
  IStaticContentProps,
} from "../../components/common/ContentRenderer";
import {
  PageTitle,
  PrivacyPageContainer,
  PageTitleContainer,
} from "../../components/common/styles";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  const privacypolicies = [
    {
      title: t("privacy_policy.section_1.title"),
      content: t("privacy_policy.section_1.content"),
    },
    {
      title: t("privacy_policy.section_2.title"),
      content: t("privacy_policy.section_2.content"),
    },
    {
      title: t("privacy_policy.section_3.title"),
      content: t("privacy_policy.section_3.content"),
    },
  ];

  return (
    <PrivacyPageContainer>
      <PageTitleContainer>
        <PageTitle>{t("privacy_policy.page_title")}</PageTitle>
      </PageTitleContainer>
      {privacypolicies.map((privacypolicy: IStaticContentProps) => (
        <ContentRenderer
          key={privacypolicy.title}
          title={privacypolicy.title}
          content={privacypolicy.content}
        />
      ))}
    </PrivacyPageContainer>
  );
};

export default PrivacyPolicy;

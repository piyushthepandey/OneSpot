import React from "react";
import { useTranslation } from "react-i18next";
import {
  PageContainer,
  Section,
  ImageContainer,
  Image,
  SubSectionContainer,
  TextContainer,
  TextTitle,
} from "./styles";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Section>
        <ImageContainer>
          <Image src="/images/404_Image.png" alt="Company Logo" />
        </ImageContainer>
        <SubSectionContainer>
          <TextContainer>
            <TextTitle> {t("404")} </TextTitle>
          </TextContainer>
        </SubSectionContainer>
      </Section>
    </PageContainer>
  );
};

export default NotFound;

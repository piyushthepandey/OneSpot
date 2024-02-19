import React from "react";
import { useTranslation } from "react-i18next";
import {
  LandingPageContainer,
  Section,
  ImageContainer,
  Image,
  SubSectionContainer,
  SectionDescription,
  TextContainer,
  TextTitle,
} from "./styles";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <LandingPageContainer>
      {/* Company Section */}
      <Section $order={1}>
        <ImageContainer>
          <Image src="/images/OneSpot.png" alt="Company Logo" />
        </ImageContainer>
        <SubSectionContainer>
          <TextContainer>
            <TextTitle> {t("landing_page.about.title")} </TextTitle>
            <SectionDescription>
              {t("landing_page.about.content")}
            </SectionDescription>
          </TextContainer>
        </SubSectionContainer>
      </Section>

      <Section $order={2}>
        <SubSectionContainer>
          <TextContainer>
            <TextTitle>{t("landing_page.housing.title")}</TextTitle>
            <SectionDescription>
              {t("landing_page.housing.content")}
            </SectionDescription>
          </TextContainer>
        </SubSectionContainer>
        <ImageContainer>
          <Image src="/images/housing_image.png" alt="House Logo" />
        </ImageContainer>
      </Section>

      <Section $order={3}>
        <ImageContainer>
          <Image src="/images/activities_image.png" alt="Activities Logo" />
        </ImageContainer>
        <SubSectionContainer>
          <TextContainer>
            <TextTitle>{t("landing_page.activities.title")}</TextTitle>
            <SectionDescription>
              {t("landing_page.activities.content")}
            </SectionDescription>
          </TextContainer>
        </SubSectionContainer>
      </Section>
    </LandingPageContainer>
  );
};

export default LandingPage;

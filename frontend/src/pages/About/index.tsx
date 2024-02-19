// This page will be used to talk about our Mission, Vision, and Values
// Addon we can also have 4 cards to talk about our team members

import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import WhatsApp from "../../components/WhatsApp/whatsapp";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Section = styled.div`
  margin: 24px;
`;

const SectionContent = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Card = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: lightblue;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  flex: 1 0 300px;
`;

const CardImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: t("about_us.team_member_1.name"),
      image: "./images/ajay_profile.jpeg",
    },
    {
      name: t("about_us.team_member_2.name"),
      image: "./images/mohit_profile.jpeg",
    },
    {
      name: t("about_us.team_member_3.name"),
      image: "./images/piyush_profile.jpeg",
    },
    {
      name: t("about_us.team_member_4.name"),
      image: "./images/vis_profile.jpeg",
    },
  ];

  return (
    <AboutContainer>
      <Title>{t("common_constants.about_us")}</Title>
      <Section>
        <SectionContent>{t("about_us.mission")}</SectionContent>
      </Section>
      <Section>
        <SectionContent>{t("about_us.vission")}</SectionContent>
      </Section>

      <Section>
        <SectionContent>{t("about_us.the_team")}</SectionContent>
        <CardContainer>
          {teamMembers.map((teamMember) => (
            <Card>
              <CardImage src={teamMember.image} alt="Profile" />
              <h3>{teamMember.name}</h3>
            </Card>
          ))}
        </CardContainer>
      </Section>
      <WhatsApp />
    </AboutContainer>
  );
};

export default AboutUsPage;

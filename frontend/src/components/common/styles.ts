import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: rgb(27, 51, 82);
  color: #fff;
  display: flex;
  padding: 18px;
  margin-top: auto;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: row;
    padding: 8px;
  }
`;

export const Section = styled.div`
  margin-bottom: 0;
`;

export const SectionTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #878787;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    margin-right: 15px;
    text-decoration: none;
  }

  img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
`;

export const StyledLink = styled(Link)<{
  $header?: boolean;
  $enableHorizontalPadding?: boolean;
}>`
  color: ${(props) => (props.$header ? "black" : "#fff")};
  ${(props) => props.$enableHorizontalPadding && "padding:0 8px"};
  text-decoration: none;
  font-size: 16px;
  line-heigth: 12px;
  position: relative;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const HideOnMobile = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SignInLinkContainer = styled.div`
  margin-right: 12px;
  font-size: 16px;

  a {
    text-decoration: none;
    color: black;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 8px;
`;

export const ContentTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: black;
`;

export const ContentBody = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #878787;
`;

export const PrivacyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  overflow: scroll;
  max-width: 100%;
`;

export const PageTitleContainer = styled.div`
  display: flex;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

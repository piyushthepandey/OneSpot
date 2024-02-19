import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Text = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin: 16px 0px;
`;

export const TextContainer = styled.div`
  margin: 0 32px;
`;

export const SubSectionContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 32px 0px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 32px;
`;

export const TextTitle = styled.h1`
  font-size: 18px;
  font-weight: 800;
  margin: 16px 0px;

  @media (max-width: 768px) {
    margin: 8px 0px;
    font-size: 24px;
  }
`;

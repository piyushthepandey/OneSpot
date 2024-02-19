import styled, { keyframes } from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
`;

export const Heading = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  animation: ${keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`} 2s ease-in-out;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Subtitle = styled.p`
  font-size: 28px;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  animation: ${keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `} 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 16px;
  }
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

export const TextContainer = styled.div`
  margin: 0 32px;
`;

export const TextTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 16px 0px;
  @media (max-width: 768px) {
    margin: 8px 0px;
    font-size: 24px;
  }
`;

export const SectionDescription = styled.p`
  font-size: 18px;
  padding: 16px 0px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    @media (min-width: 769px) {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    }
  }

  @media (min-width: 769px) {
    width: 300px;
  }
`;

export const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const CTAButton = styled.button`
  padding: 10px;
  margin-top: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ImageTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CTACardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CarouselContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

export const CarouselImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
`;

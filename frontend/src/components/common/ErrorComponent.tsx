import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ErrorComponent: React.FC = () => {
  return (
    <ErrorContainer>
      <ImageContainer>
        <Image src="/images/something_went_wrong.png" alt="Company Logo" />
      </ImageContainer>
    </ErrorContainer>
  );
};

export default ErrorComponent;

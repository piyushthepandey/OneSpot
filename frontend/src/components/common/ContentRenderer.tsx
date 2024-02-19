import React from "react";
import { ContentContainer, ContentTitle, ContentBody } from "./styles";

export interface IStaticContentProps {
  title: string;
  content: string;
}

const ContentRenderer: React.FC<IStaticContentProps> = ({ title, content }) => {
  return (
    <ContentContainer>
      <ContentTitle>{title}</ContentTitle>
      <ContentBody>{content}</ContentBody>
    </ContentContainer>
  );
};

export default ContentRenderer;

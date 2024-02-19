import styled, { css } from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
  justify-content: center;
`;

export const ContactUsForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 8px;

  ${(props) => css`
    width: 80vw; // Default width for mobile screens

    @media (min-width: 600px) {
      width: 300px;
    }
  `}
`;

export const FormInput = styled.input`
  height: 50px;
  border-radius: 8px;
  border: 1px solid grey;
  padding: 8px;
  margin: 8px 0px;
  font-size: 16px;
`;

export const FormTextArea = styled.textarea`
  height: 100px;
  border-radius: 8px;
  border: 1px solid grey;
  padding: 8px;
  margin: 8px 0px;
  font-size: 16px;
`;

export const PageTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

import styled, { css } from "styled-components";

export const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 16px 0 32px 0;
`;

export const ImageContainer = styled.div`
  border-radius: 50%;
  height: 150px;
  width: 150px;
  border: 1px solid #e0e0e0;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledFormHandler = styled.form`
  display: flex;
  flex-direction: column;
  margin: 8px 0px 0px;

  ${(props) => css`
    width: 80vw; // Default width for mobile screens

    @media (min-width: 600px) {
      width: 300px;
    }
  `}
`;

export const MessageContainer = styled.div`
  height: 20px;
  widht: 100px;
  margin-top: 8px;
`;
export const ErrorMessageContainer = styled.span<{ $enable?: string }>`
  color: red;
  font-size: 12px;
  text-overlow: ellipsis;
  display: ${(props) => (props.$enable ? "block" : "hidden")};
`;

export const SuccessMessageContainer = styled(ErrorMessageContainer)`
  color: green;
`;

export const FormInput = styled.input<{ $disabled?: boolean }>`
  width: 100%;
  height: 50px;
  padding: 8px;
  margin: 16px 0px 0px;
  font-size: 16px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 8px;

  ${(props) => css`
    width: 80vw; // Default width for mobile screens

    @media (min-width: 600px) {
      width: 300px;
    }
  `}
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 18px;
`;

export const DropdownButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

export const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

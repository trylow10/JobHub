import styled from "styled-components";


export const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
`;

export const FormHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077b5;
  color: #fff;
  border: none;
  cursor: pointer;
`;
export const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 5px;
`;

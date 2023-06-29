import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const SuggestionList = styled.ul`
  margin-top: 16px;
  position: absolute;
  top: 100%; /* Adjust this value to position the suggestions properly */
  left: 0;
  padding: 0;
  list-style: none;
  z-index: 99;
  width: 240px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-track {
    background-color: #edf2f7;
    border-radius: 3px;
  }
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }
`;

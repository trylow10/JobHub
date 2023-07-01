import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const SearchWrapper = styled.div`
  position: relative;
  z-index: 69;
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

export const Wrapper = styled.div`
  padding: 20px;
  margin: 0 164px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: start;
  margin-bottom: 24px;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: start;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  dislay: flex;
  align-items: center;
  justify-content: start;
`;

export const ListItem = styled.li`
  display: flex;
  width: fit-content;
  align-items: start;
  margin-bottom: 16px;
  border: 1px solid gray;
  border-radius: 20px;
  padding: 8px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

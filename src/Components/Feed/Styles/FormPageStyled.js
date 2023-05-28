import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostContainer = styled.div`
  padding-top: 10px;

  img.loading {
    margin: 0 auto;
    display: block;
  }

  .show-more {
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: capitalize;
    width: 100%;
    background: #8080808c;
    margin-bottom: 2rem;
    padding: 0.5rem 0;
    color: var(--blackish-gray);
    font-weight: bold;
    border-radius: 9px;
    cursor: pointer;
    transition: var(--quick-transition);

    &:hover {
      background: var(--blackish-gray);
      color: white;
    }
  }
`;

export const SecondaryBtn = styled.button`
  padding: 2px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--quick-transition);

  &:hover {
    background-color: var(--secondary-color-hover);
  }
`;

export const PrimaryBtn = styled.button`
  padding: 2px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--quick-transition);

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

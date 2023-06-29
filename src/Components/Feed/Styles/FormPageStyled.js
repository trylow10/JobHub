import styled from "styled-components";
//TODO:/form page styled
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const InputContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 32px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  border: 1px solid #f7f7f7;
  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    display: block;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #666;
    margin-bottom: 24px;
  }

  input {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;

    &::placeholder {
      color: #999;
    }
  }
  button.forget-pass {
    margin-top: 12px;
    color: white;
    border: 1px solid #0073b1;
    border-radius: 4px;
    padding: 8px 24px;
    font-size: 16px;
    background-color: #0073b1;
    margin-bottom: 16px;
    margin-right: 12px;
    cursor: pointer;
  }
  button.back {
    margin-top: 12px;
    color: white;
    border: 1px solid #0073b1;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    background-color: #0073b1;
    margin-bottom: 16px;
    cursor: pointer;
  }
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

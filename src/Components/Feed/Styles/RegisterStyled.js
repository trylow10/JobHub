import styled from "styled-components";
import { Link } from "react-router-dom";

export const InputContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 32px;
  max-width: 400px;
  margin: 0 auto;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    display: block;
  }

  p {
    font-size: 12px;
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

  .pass-container {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    input {
      flex-grow: 1;
      margin-right: 8px;
    }

    strong {
      font-size: 12px;
      font-weight: 400;
      color: #666;
      cursor: pointer;
    }
  }

  .error {
    font-size: 12px;
    font-weight: 400;
    color: #d93025;
    margin-bottom: 16px;
  }
`;

export const PrimaryBtn = styled.button`
  background-color: #0073b1;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #046293;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  margin: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    background-color: #ddd;
    height: 1px;
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    padding: 0 8px;
    background-color: #fff;
  }
`;

export const GoogleBtn = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 24px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f2f2f2;
  }

  img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
`;

export const LinkBtn = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: #0073b1;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #046293;
  }
`;

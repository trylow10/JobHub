import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoaderImage = styled.img`
  width: 50px; /* Adjust the width to your desired size */
  height: 50px; /* Adjust the height to your desired size */
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderImage src="/images/loading.gif" alt="Loading" />
    </LoaderContainer>
  );
};

export default Loader;

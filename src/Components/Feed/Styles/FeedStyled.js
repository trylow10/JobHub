import styled from "styled-components";

export const MobContainer = styled.div`
  display: none;
  position: fixed;
  bottom: 65px;
  width: 100%;
  z-index: -5;
  background: white;
  left: 0;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
  margin: 0;
  padding-right: 0;
  z-index: 4 !important;
  box-shadow: 0px -1px 0px grey;

  .reply-posting {
    margin: 1px -0.5rem 0.5rem;
    border-bottom: 1px solid gray;
    padding: 0 10px 5px;
    font-size: 14px;

    strong {
      margin-left: 4px;
      font-size: 15px;
      font-weight: 900;
      color: red;
    }
  }

  @media screen and (min-width: 530px) {
    display: none !important;
  }

  @media screen and (max-width: 340px) {
    bottom: 38px;
  }
`;

// Main Holding Container
export const Container = styled.div`
  padding: 0 2rem;
  max-width: 630px;
  margin: 0 auto;
  width: 100%;

  @media screen and (max-width: 991px){
    padding-right: 0;
  }

  @media screen and (max-width: 620px){
    padding: 0;
  }
`;
export const ExploreHolder  = styled.div`
  padding: 0 2rem;
  max-width: 630px;
  margin: 0 auto;
  width: 100%;
`
export const NetworkHolder = styled.div`
  padding: 0 2rem;
  max-width: 630px;
  margin: 0 auto;
  width: 100%;
`

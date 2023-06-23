// Libraries
import React from "react";

// Functional Components
import Header from "../Components/Welcome/Header";
import Feature from "../Components/Welcome/Feature"
import MainImg from "../Components/Welcome/MainImg"
// import OpenSection from "../Components/Welcome/OptionSection"
// import Review from "../Components/Welcome/OptionSection"
// import Video from "../Components/Welcome/OptionSection"
// Styled Components


const Welcome = ()=>{
  return (
    <div>
     <Header></Header>
    <MainImg></MainImg>
     <Feature></Feature>
    {/* <OpenSection></OpenSection> */}
    {/* <Review></Review>
    <Video></Video> */}

    </div>
  );
};

export default Welcome;

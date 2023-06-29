// Libraries
import React from "react";

// Functional Components
import Header from "../Components/Welcome/Header";
import Feature from "../Components/Welcome/Feature";
import MainImg from "../Components/Welcome/MainImg";
import OpenSection from "../Components/Welcome/OptionSection";
import Review from "../Components/Welcome/OptionSection";
import Video from "../Components/Welcome/Video";
// Styled Components

const options = ["See All Topics", "Science And Environment"];

const Welcome = () => {
  return (
    <div>
      <Header></Header>
      <MainImg></MainImg>
      <Feature></Feature>
      <OpenSection
        heading={"Explore topic in your section"}
        optionTitle={"CONTENT TOPICS"}
        options={options}
      />
      <Review></Review>
      <Video></Video>
    </div>
  );
};

export default Welcome;

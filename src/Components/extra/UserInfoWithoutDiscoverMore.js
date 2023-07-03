// Libraries
import { React } from "react";
import { useSelector } from "react-redux"; // redux

// Styled Components
import { Container, Section, Profile } from "../Feed/Styles/UserInfoStyled";
import {
  Connection,
  Premium,
  InfoConatiner,
} from "../Feed/Styles/UserInfoStyled";

import { BACKGROUND_IMG, HEADLINE, PROFILE_IMG } from "../../env";

const MainContainer = ({ userInfo }) => {
  return (
    <Container>
      {/* User Profile */}
      <Section>
        <InfoConatiner>
          <img
            src={
              (userInfo.bg || BACKGROUND_IMG) +
              "?tr=w-800,h-300,cm-extract,fo-center,q-90"
            }
            alt=""
          />

          <Profile>
            <img
              src={(userInfo.profile || PROFILE_IMG) + "?tr=w-100,h-100"}
              alt=""
            />
            <h4 className="user-name">{userInfo.uname}</h4>
            <p className="headline">{userInfo.headline || HEADLINE}</p>
          </Profile>
          <hr />

          <Connection className="connection-section">
            <div className="heading">
              <span>Connections</span>
              <i className="fa-solid fa-user-plus" />
            </div>
            <p>Connect with alumni</p>
          </Connection>
          <hr />

          <Premium className="premium-section">
            <span>Access exclusive tools & insights</span>
            <div>
              <i className="fa-solid fa-square" />
              <p>Try Premium for free</p>
            </div>
          </Premium>
          <hr />

          <Section className="items-section">
            <i className="fa-solid fa-bookmark" />
            <span>My items</span>
          </Section>
        </InfoConatiner>
      </Section>
    </Container>
  );
};

// Main Container
const UserInfo = () => {
  const user = useSelector((state) => state.user);

  const width = useSelector((state) => state.width);
  return (
    <>
      {width > 827 && (
        <MainContainer token={user?.token} userInfo={user?.info} />
      )}
    </>
  );
};

export default UserInfo;

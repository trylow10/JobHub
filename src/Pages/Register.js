// Libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../app/slice/userSlice"; // Redux
import { Navigate } from "react-router-dom";

// Functional Components
import Header from "../Components/Welcome/Header";

// Styled Components
import {
  InputContainer,
  PrimaryBtn,
  LinkBtn,
  GoogleBtn,
  Divider,
} from "../Components/Feed/Styles/RegisterStyled.js";

// ENV
import { API } from "../env";

const Register = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [err, setErr] = useState("");
  const [correctInfo, setCorrectInfo] = useState(false);
  const [passInputType, setPassInputType] = useState("password");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", pass: "" });
  const [userLogged, setUserLogged] = useState(user.token);

  useEffect(() => {
    const registerBtn = document.getElementById("register-btn");
    const confirmPass = document.getElementById("confirm-password");

    [confirmPass].forEach((field) => {
      field.addEventListener("input", () => {
        if (confirmPass.value !== field.value && confirmPass.value !== "") {
          setErr("Confirm Password does not match");
          field.classList.add("wrong");
          registerBtn.style.backgroundColor = "#36404a";
          registerBtn.disabled = true;
        } else {
          setErr("");
          field.classList.remove("wrong");
          registerBtn.style.backgroundColor = "var(--primary-color)";
          registerBtn.disabled = false;
        }
      });
    });
  }, []);

  const toggleInputType = () => {
    setPassInputType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const signup = async (e) => {
    e.preventDefault();

    const userName = document.getElementById("username");
    const email = document.getElementById("email");
    const pass = document.getElementById("password");
    const confirmPass = document.getElementById("confirm-password");

    if (!userName.value || !email.value || !pass.value) {
      return;
    }

    if (pass.value !== confirmPass.value) {
      setErr("Confirm Password does not match");
      confirmPass.classList.add("wrong");
      return;
    }

    const request = await fetch(`${API}/api/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: userName.value,
        email: email.value,
        pass: pass.value,
      }),
    });

    const data = await request.json();
    console.log(data);
    if (!data.success) {
      setErr(data.error.msg);
      const fieldMap = {
        4: userName,
        5: email,
      };
      const field = fieldMap[data.error.code];
      if (field) {
        field.classList.toggle("wrong");
      }
      return;
    }

    // saving data - if needed for resending code
    setUserInfo({ name: userName.value, email: email.value, pass: pass.value });
    console.log("CODE:", data.code);

    setErr("");
    setCorrectInfo(true);
  };

  // Checking Verification Code
  const checkCode = async (e) => {
    e.preventDefault();

    // user typed code
    const code = document.getElementById("code");

    // preventing bad requests
    if (!code.value) return;

    code.addEventListener("click", () => {
      code.classList.remove("wrong");
      code.value = "";
      setErr("");
    });

    // Verification API call
    const request = await fetch(`${API}/api/register/verify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userInfo.email, code: code.value }),
    });

    // API response
    const data = await request.json();

    // If an error occurred, exit
    if (!data.success) {
      setErr(data.error.msg);
      if (data.error.code === 7) {
        code.classList.add("wrong");
      }
      return;
    }

    // set received user token
    localStorage.setItem("token", data.token);
    setUserLogged(true);
    // set user id
    dispatch(update({ id: data.userId }));
  };

  // For resending Code
  const resendCode = async () => {
    setErr("");

    // Register API call
    const request = await fetch(`${API}/api/register/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: userInfo.name,
        email: userInfo.email,
        pass: userInfo.pass,
      }),
    });

    // API response
    const data = await request.json();

    // If an error occurred
    if (!data.success) {
      setErr(data.error.msg);
      return;
    }

    console.log("NEW CODE:", data.code);
  };

  if (userLogged) {
    return <Navigate to="/feed" />;
  }

  return (
    <div>
      <Header hidden={true} />
      <InputContainer>
        {!correctInfo && (
          <form className="holder" onSubmit={signup}>
            <label htmlFor="username">Register</label>
            <p>Join your professional community</p>
            <input type="text" id="username" placeholder="Username" />
            <input type="email" id="email" placeholder="Email" />
            <input
              type={passInputType}
              id="password"
              placeholder="Password"
              required
            />
            <div className="pass-container">
              <input
                required
                placeholder="Confirm Password"
                type={passInputType}
                id="confirm-password"
              />
              <strong onClick={toggleInputType}>
                {passInputType === "password" ? "show" : "hide"}
              </strong>
            </div>
            {err && <p className="error">{err}</p>}
            <PrimaryBtn type="submit" id="register-btn">
              Register
            </PrimaryBtn>
            <Divider className="button-divider">or</Divider>
            <GoogleBtn type="submit" onClick={signup}>
              <img src="/images/google.svg" alt="" />
              <span>Continue with Google</span>
            </GoogleBtn>
            <p style={{ marginTop: "24px" }}>
              Already a member?{" "}
              <LinkBtn to="/" className="link">
                Login
              </LinkBtn>
            </p>
          </form>
        )}

        {/* Verification Form */}
        {correctInfo && (
          <form className="holder code-holder" onSubmit={checkCode}>
            <label htmlFor="code">Code</label>
            <p>Open Your Email Inbox</p>
            <input
              maxLength={4}
              required
              type="text"
              id="code"
              placeholder="XXXX"
            />
            <div style={{ marginBottom: "12px" }} onClick={resendCode}>
              Didn't Receive? Resend Code
            </div>
            {err && <p className="error">{err}</p>}
            <PrimaryBtn type="submit">Let's Go</PrimaryBtn>
          </form>
        )}
      </InputContainer>
    </div>
  );
};

export default Register;

// Libraries
import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Functional Components
import Header from "../Components/Welcome/Header";

//TODO:icon forgot pass
// Styled Components
import { InputContainer } from "../Components/Feed/Styles/FormPageStyled.js";

// ENV
import { API } from "../env";

const ForgetPass = () => {
  const user = useSelector((state) => state.user);
  const [correctName, setCorrectName] = useState(false);
  const [correctCode, setCorrectCode] = useState(false);
  const [success, setSuccess] = useState(user.token);
  const [exit, setExit] = useState(false);
  const [err, setErr] = useState("");

  const checkUserName = async (username = false) => {
    setErr("");
    setCorrectName(false);
    const mail = username || document.getElementById("user-name").value;
    if (!mail) return;
    const req = await fetch(`${API}/api/user/forgot-pass?user=${mail}`, {
      method: "POST",
    });
    const data = await req.json();
    if (!data.success) {
      setErr(data.error.msg);
      return;
    }
    console.log(data.code);
    setCorrectName(mail);
  };

  const checkCode = async () => {
    setErr("");
    setCorrectCode(false);
    const code = document.getElementById("code").value;
    if (!code) return;
    const req = await fetch(
      `${API}/api/user/forgot-pass/validity?user=${correctName}&code=${code}`
    );
    const data = await req.json();
    console.log(data);
    if (!data.success) {
      setErr(data.error.msg);
      return;
    }
    setCorrectCode(code);
  };

  const resetPass = async () => {
    const newPass = document.getElementById("new-pass").value;
    if (!newPass) {
      setErr("no password is given");
    }
    const req = await fetch(`${API}/api/user/forgot-pass/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: correctName, code: correctCode, newPass }),
    });
    const data = await req.json();
    if (!data.success) {
      setErr(data.error.msg);
      return;
    }
    setSuccess(true);
  };

  const hideUserName = () => {
    setExit(true);
  };

  const hideCode = () => {
    setCorrectName(false);
  };

  const hidePass = () => {
    setCorrectName(false);
    setCorrectCode(false);
  };

  const clear = () => {
    document.getElementById("code").value = "";
    setErr("");
  };

  return (
    <div>
      {success && <Navigate to="/feed" />}
      {exit && <Navigate to="/" />}
      <Header hidden={true} />
      <InputContainer>
        {!correctName && (
          <form
            className="holder"
            onSubmit={(e) => {
              e.preventDefault();
              checkUserName();
            }}
          >
            <label htmlFor="user-name">Forgot Password?</label>
            <p>Reset password in two quick steps</p>
            <input
              required
              type="text"
              id="user-name"
              placeholder="username or email"
            />
            {err && <p className="error">{err}</p>}
            <button type="submit" className="forget-pass">
              next
            </button>
            <button className="back" onClick={hideUserName}>
              <i className="far fa-arrow-left"></i>
              {"back"}
            </button>
          </form>
        )}

        {correctName && !correctCode && (
          <form
            className="holder code-holder"
            onSubmit={(e) => {
              e.preventDefault();
              checkCode();
            }}
          >
            <label htmlFor="code">Code</label>
            <p>Please check your registered email inbox</p>
            <input
              maxLength={4}
              required={true}
              type="text"
              id="code"
              placeholder="XXXX"
              onClick={clear}
            />
            {err && <p className="error">{err}</p>}
            <div
              className="resend"
              onClick={() => {
                checkUserName(correctName);
              }}
            >
              Didn't Gt? Resend Code
            </div>
            <button type="submit" className="forget-pass">
              next
            </button>
            <button type="submit" className="forget-pass" onClick={hideCode}>
              <i className="fa-regular fa-arrow-left-long"></i>{" "}
            </button>
          </form>
        )}

        {correctName && correctCode && (
          <form
            className="holder"
            onSubmit={(e) => {
              e.preventDefault();
              resetPass();
            }}
          >
            <label htmlFor="new-pass">Almost Done !!</label>
            <p>Enter your new password</p>
            <input
              required={true}
              type="text"
              id="new-pass"
              placeholder="New Password"
            />
            {err && <p className="error">{err}</p>}
            <button className="forget-pass" id="reset">
              Reset Password
            </button>
            <button onClick={hidePass} className="forget-pass">
              <i className="fa-regular fa-arrow-left-long"></i>{" "}
            </button>
          </form>
        )}
      </InputContainer>
    </div>
  );
};

export default ForgetPass;

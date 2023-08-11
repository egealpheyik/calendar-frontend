import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login-signin-styles.css";
import { Login, convertData } from "./login-register-functions";
import * as functions from "../../ActiveUser.jsx";
import { Typography } from "@mui/material";
import { MyContext } from "../../App";
import { useContext } from "react";

export const SignInPage = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [wrongUsernameOrPassword, setWrongUsernameOrPassword] = useState(false);
  const { userId, setUserId } = useContext(MyContext);

  async function onLoginClick(e) {
    e.preventDefault();

    const loginResponse = await Login(
      convertData(
        document.getElementById("username").value,
        document.getElementById("password").value
      )
    );
    if (loginResponse.userId == 0) {
      setWrongUsernameOrPassword(true);
    } else {
      window.open("/mainpage");
      console.log("aaa", loginResponse.userId);
      console.log(loginResponse);
      localStorage.setItem("user", JSON.stringify(loginResponse));
      //setUserId(JSON.stringify(loginResponse));
      //getUserInfo(loginResponse["userId"], loginResponse["userName"], loginResponse["password"]);
      //functions.setUserId --> buradan devam et
    }
  }

  return (
    <form className="fullscreen">
      <div className="loginElements">
        <div className="calender-name">
          <img className="logo" src="src\images\logo3.png" alt="Logo"></img>
        </div>

        <div className="divInput">
          <input
            id="username"
            className="UsernameInput"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="divInput">
          {" "}
          <input
            id="password"
            className="PasswordInput"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </div>

        <button id="loginbutton" onClick={onLoginClick}>
          Log In
        </button>
        <a href="https://www.google.com/search?q=how+to+remember+my+password&rlz=1C1GCEU_trTR1066TR1066&oq=how+to+remember+my+password&aqs=chrome..69i57j0i19i512l4j0i19i22i30l5.219j0j7&sourceid=chrome&ie=UTF-8">
          {" "}
          Forgot password?
        </a>
        <br></br>
        <Link to="/register">
          <button>Create a new account</button>
        </Link>
        <br></br>
        <Link to="/mainpage">Takvim</Link>

        <p
          className={
            wrongUsernameOrPassword ? "wrong-login-inputs" : "true-login-inputs"
          }
        >
          Wrong username or password !
        </p>
      </div>
    </form>
  );
};

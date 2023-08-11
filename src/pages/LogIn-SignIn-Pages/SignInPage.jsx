import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login-signin-styles.css";
import { Login, convertData } from "./login-register-functions";
import * as functions from "../../ActiveUser.jsx";
import { Typography } from "@mui/material";
import { MyContext } from "../../App";
import { useContext } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { ChangePassword } from "./ForgetPassDiaolg";

export const SignInPage = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [wrongUsernameOrPassword, setWrongUsernameOrPassword] = useState(false);
  const { userId, setUserId } = useContext(MyContext);
  const SignupSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username is too Short!")
      .max(50, "Usernam is too Long!")
      .required("Required"),
    password: Yup.string()
      .min(3, "Password is too short!")
      .max(50, "Too Long!")
      .required("Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
    },
  });

  const BasicForm = () => {};

  async function onLoginClick(e) {
    // e.preventDefault();

    const loginResponse = await Login(
      convertData(
        document.getElementById("username").value,
        document.getElementById("password").value
      )
    );
    if (loginResponse.userId == 0) {
      setWrongUsernameOrPassword(true);
    } else {
      window.open("/mainpage", "_self");

      console.log("aaa", loginResponse.userId);
      console.log(loginResponse);
      localStorage.setItem("user", JSON.stringify(loginResponse));
      //setUserId(JSON.stringify(loginResponse));
      //getUserInfo(loginResponse["userId"], loginResponse["userName"], loginResponse["password"]);
      //functions.setUserId --> buradan devam et
    }
  }

  return (
    <form className="fullscreen" onSubmit={formik.handleSubmit}>
      <div className="loginElements">
        <div className="calender-name">
          <img className="logo" src="src\images\logo4.png" alt="Logo"></img>
        </div>
        <div className="login-input-divs">
          <div className="divInput">
            <input
              id="username"
              name="username"
              className="UsernameInput"
              type="text"
              placeholder="Username"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="divInput">
            <input
              id="password"
              name="password"
              className="PasswordInput"
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="password-formik">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            className="loginbutton"
            id="loginbutton"
            type="submit"
            onClick={onLoginClick}
            disabled={!formik.isValid}
          >
            Log In
          </button>
          <Link to="/register">
            <button className="create-new-acc">Create a new account</button>
          </Link>
          {/* <a
            className="forgetpass"
            href="https://www.google.com/search?q=how+to+remember+my+password&rlz=1C1GCEU_trTR1066TR1066&oq=how+to+remember+my+password&aqs=chrome..69i57j0i19i512l4j0i19i22i30l5.219j0j7&sourceid=chrome&ie=UTF-8"
          >
            Forget your password?
          </a> */}
          <ChangePassword></ChangePassword>
        </div>

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

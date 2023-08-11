import React, { useState } from "react";
import "./login-register-functions";
import { Register, convertData } from "./login-register-functions";
import "../calender.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";

export const RegisterPage = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccessfullInfo, setshowSuccessfullInfo] = useState(false);

  function onRegisterClick(e) {
    e.preventDefault();

    let isRegister = Register(
      convertData(
        document.getElementById("username").value,
        document.getElementById("password").value
      )
    );
    isRegister.then(
      (result) => {
        console.log("res", result);
        if (result) {
          setShowWarning(true);
          setshowSuccessfullInfo(false);
        } else {
          setShowWarning(false);
          setshowSuccessfullInfo(true);
        }
      },
      (error) => console.log("err", error)
    );
    //console.log("isr", isRegister);
    //if (!isRegister) setShowWarning(true);
  }
  return (
    <section className="container">
      <form>
        <div className="form-container">
          <img className="logo" src="src\images\logo4.png" alt="Logo"></img>
          <h2 className="opacity">Register</h2>
          <div className="divInput">
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="UsernameInput"
              autoComplete="off"
            />
          </div>
          <div className="divInput">
            <input
              id="password"
              className="PasswordInput"
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <div>
            <button onClick={onRegisterClick}>Submit</button>
          </div>

          <div className="login-registerChange">
            <a href="/">Already have an account? Log in</a>
          </div>
          <Box sx={{ height: 70 }}>
            <Box sx={{ display: "flex" }}>
              <Fade in={showWarning}>
                {
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert
                      variant="filled"
                      severity="warning"
                      className="register-warning"
                    >
                      This username is used by another user.
                    </Alert>
                  </Stack>
                }
              </Fade>
            </Box>
          </Box>
          <Box sx={{ height: 70 }}>
            <Box sx={{ display: "flex" }}>
              <Fade in={showSuccessfullInfo}>
                {
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert
                      variant="filled"
                      severity="info"
                      className="register-success"
                    >
                      User created.
                    </Alert>
                  </Stack>
                }
              </Fade>
            </Box>
          </Box>
        </div>
      </form>
    </section>
  );
};

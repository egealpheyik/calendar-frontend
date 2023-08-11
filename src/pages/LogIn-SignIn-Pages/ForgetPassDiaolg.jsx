import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { ChangePasswordAPI, convertData } from "./login-register-functions";
import { Fade } from "@mui/material";

export function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [isUserExist, setIsUserExist] = useState(false);
  const [newPassSuccess, setNewPassSuccess] = useState(false);
  const onChangeClick = async () => {
    console.log("here::", name, pass);
    const response = await ChangePasswordAPI(convertData(name, pass)).then(
      (e) => {
        if (e.userId == -1) {
          setIsUserExist(true);
          setNewPassSuccess(false);
        } else {
          setNewPassSuccess(true);
          setIsUserExist(false);
        }
      }
    );
  };
  return (
    <Grid className="changepass-maingrid">
      <Typography
        style={{ cursor: "pointer" }}
        className="forgetpass"
        onClick={() => setOpen(true)}
      >
        Forget your password?
      </Typography>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid>
            <input
              className="changepassinputs"
              autoComplete="off"
              placeholder="Username"
              id="username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>

            <input
              className="changepassinputs"
              autoComplete="off"
              placeholder="New Password"
              id="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            ></input>
            <Fade in={isUserExist}>
              <Alert severity="warning">
                There is no user with given username
              </Alert>
            </Fade>
            <Fade in={newPassSuccess}>
              <Alert severity="info">New password saved</Alert>
            </Fade>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            // onClick={handleDelete(item)}
            onClick={() => {
              onChangeClick();
            }}
            autoFocus
            style={{ background: "#fff !important" }}
          >
            Save new password
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

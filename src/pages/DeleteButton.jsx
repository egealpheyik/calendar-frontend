import {
  DatePicker,
  LocalizationProvider,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import React, { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers";
import ButtonAppBar from "../Navbar.jsx";
//import './styles.css'
import "./calender.css";
import { addDays, setDefaultOptions } from "date-fns";
import { enGB } from "date-fns/locale";
import { Typography, Grid, Button, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import "./mainpage-functions.jsx";
import { AddEvent, GetEvents, convertData } from "./mainpage-functions.jsx";
import { CheckBox, Highlight } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { GetUpcomingEvents } from "./Upcoming.jsx";
import { convertToDate } from "./dateConverter.jsx";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleDeleteClose = () => {
  setOpen(false);
};

export function DeleteButton() {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Selected Event?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            buraya event bilgileri yaz
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

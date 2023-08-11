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
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./mainpage-functions.jsx";
import {
  AddEvent,
  GetEvents,
  DeleteEvent,
  convertData,
} from "./mainpage-functions.jsx";
import { GetUpcomingEvents } from "./Upcoming.jsx";
import { convertToDate } from "./dateConverter.jsx";
import { MyDialog } from "./Diolog.jsx";
import { MyEditDialog } from "./EditDialog.jsx";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LogoutIcon from "@mui/icons-material/Logout";

setDefaultOptions({ locale: enGB });

export const MainPage = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateDate, setSelectedDateDate] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [events, setEvents] = useState([]);
  const [checked, setChecked] = useState(false);
  const [difficulity, setDifficulity] = useState(2);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [value, setValue] = useState("importance");
  const [importance, setImportance] = useState(1);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    Upcoming(importance);
    GetEvents();
  }, []);
  useEffect(() => {
    console.log("importance", importance);
    Upcoming(importance);
  }, [isAdded, importance]);

  console.log(events);

  const Upcoming = async (imp) => {
    const events = await GetUpcomingEvents(new Date(), imp);
    setUpcomingEvents(events);
    console.log("events:", events);
  };

  const onDateChange = async (e) => {
    let dateObj = new Date(e);
    dateObj.setTime(dateObj.getTime() + 6 * 60 * 1000 * 60);
    setSelectedDateDate(dateObj);
    //console.log(dateObj);
    const dateString = dateObj.toString();
    console.log(dateString);
    setShowAddEvent(false);
    setSelectedDate(dateString);
    const my_event = await GetEvents(dateObj);
    console.log(my_event);
    //console.log(JSON.parse(localStorage.getItem('user')).userName);
    setEvents(my_event);
    setShowTimePicker(false);
  };
  const onDateAccept = (e) => {
    setShowTimePicker(true);
    console.log("e");
  };
  const onTimeAccept = (e) => {
    let timeObj = e;
    console.log("test: ", "test", e);
    //timeObj.getTimezoneOffset();
    setSelectedTime(e);
    console.log("test: ", e);
    console.log("finaltest", e);
    setShowAddEvent(true);
  };
  function timefix(e) {
    let hour = e.getHours();
    if (hour > 20) {
      hour -= 24;
    }
    hour += 3;
    e.setHours(hour);
    return e;
  }

  const onDifficulityChange = (e) => {
    setDifficulity(e.target.value);
  };
  function isFieldsValid() {
    let eventname = document.querySelector(".name-input input").value;
    let description = document.querySelector(".description-input input").value;
    if (eventname.length() == 0 && description.length() == 0) {
      setIsInputsValid(true);
    } else {
      setIsInputsValid(false);
    }
  }
  function getEventData() {
    const eventData = JSON.stringify({
      userId: JSON.parse(localStorage.getItem("user")).userId,
      eventName: document.querySelector(".name-input input").value,
      description: document.querySelector(".description-input input").value,
      importance: difficulity,
      startDate: selectedDateDate,
      endDate: addDays(
        document.getElementsByClassName("date"),
        document.getElementsByClassName("eventdays-input")
      ).toDateString,
      time: timefix(selectedTime),
      autoFinish: checked,
      isFinished: false,
    });
    AddEvent(eventData);
    setIsAdded(!isAdded);
  }

  function getFullDate(e) {
    let date = new Date(e);
    return date.toLocaleDateString("en-GB");
  }
  function getFullTime(e) {
    let date = new Date(e);
    return date.toLocaleTimeString([], { hour: "2-digit" });
  }
  console.log(events);
  useEffect(() => {
    console.log("renderer");
    console.log(
      "USER ID - mainpage - > ",
      JSON.parse(localStorage.getItem("user")).userId
    );
  }, [events]);
  const handleValue = (event, newAlignment) => {
    setValue(newAlignment);
    console.log("newalignment:", newAlignment);
    if (newAlignment == "date") {
      //Upcoming(0);
      setImportance(0);
    } else {
      //Upcoming(1);
      setImportance(1);
    }

    //Upcoming(importance);
    console.log("events after update:", upcomingEvents);
    //setUpcomingEvents(!upcomingEvents);
  };

  const onLogOut = () => {
    console.log("hheeeheheh");
    localStorage.removeItem("user");
    //localStorage.setItem("id", 0);
    window.open("/", "_self");
  };

  return (
    <div>
      {/* {ButtonAppBar()} */}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid className="calender-time">
          <Grid className="column1">
            <Grid className="date">
              <StaticDatePicker
                className="calender"
                onAccept={(e) => onDateAccept(e)}
                onChange={(e) => onDateChange(e)}
              />
            </Grid>
            <Grid className="time"></Grid>
            <StaticTimePicker
              className={showTimePicker ? "timePicker-on" : "timePicker-off"}
              onAccept={(e) => onTimeAccept(e)}
            ></StaticTimePicker>
          </Grid>

          <Grid className="column2">
            <Grid className={showAddEvent ? "add-event" : "empty"}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                className="column2-1"
              >
                <Grid xs={3} justifyContent="center">
                  <Typography>Event Name:</Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    className="name-input"
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    color="warning"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                className="column2-2"
                alignItems="center"
              >
                <Grid xs={3}>
                  <Typography>Event Description:</Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    className="description-input"
                    id="filled-basic"
                    label="Description"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                className="column2-3"
                container
                spacing={2}
                alignItems="center"
              >
                <Grid xs={3}>
                  <Typography>Event Importancy:</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth className="importance-input">
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      className="select-add"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={difficulity}
                      label="Difficulity"
                      onChange={onDifficulityChange}
                    >
                      <MenuItem value={2}>High</MenuItem>
                      <MenuItem value={1}>Medium</MenuItem>
                      <MenuItem value={0}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                className="column2-4"
                container
                spacing={2}
                alignItems="center"
              >
                <Grid xs={3}>
                  <Typography>Event Days:</Typography>
                </Grid>
                <Grid xs={9}>
                  <TextField
                    fullWidth
                    variant="filled"
                    className="eventdays-input"
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                className="add-button"
                variant="text"
                onClick={() => getEventData()}
              >
                Add Event
              </Button>
            </Grid>

            <Grid className={showAddEvent ? "empty" : "show-event"}>
              <Typography>{getFullDate(selectedDate)}</Typography>

              {events &&
                events.map((item, index) => (
                  <Grid
                    id={`${item.eventId}-${index}`}
                    key={index}
                    className="column2-events"
                  >
                    <Grid className="column2-name-date">
                      <Typography>Name: {item.eventName}</Typography>
                      <Typography>Description: {item.description}</Typography>
                      <Typography>
                        Date: {getFullDate(item.startDate)}
                      </Typography>
                      <Typography>
                        Time:
                        {getFullTime(item.time)}.
                        {new Date(item.time).getMinutes()}
                      </Typography>
                    </Grid>
                    <Grid className="delete-edit-buttons">
                      <MyDialog
                        item={item}
                        index={index}
                        statefunc={(e) => setEvents(e)}
                        upcomingStateFunc={(e) => setUpcomingEvents(e)}
                      />
                      <MyEditDialog item={item} index={index}></MyEditDialog>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid className="column3">
            <Button
              onClick={onLogOut}
              className="logoutbutton"
              style={{
                marginLeft: "50%",
                marginBottom: "4%",
                alignItems: "center",
                display: "flex",
              }}
            >
              Log out
              <LogoutIcon />
            </Button>
            <Box>
              <Grid className="filter">
                <Typography>Filter by</Typography>
                <Grid>
                  <ToggleButtonGroup
                    toggle-color="asd"
                    value={value}
                    exclusive
                    onChange={handleValue}
                    aria-label="Platform"
                  >
                    <ToggleButton value="date">Date</ToggleButton>
                    <ToggleButton value="importance">Importance</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>

              {/* sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} */}
              <Typography className="upcoming-title">
                Your Upcoming Events
              </Typography>
              <Grid className="right-panel-events">
                {upcomingEvents?.map((item) => {
                  let importance = "importance" + item.importance;
                  return (
                    <Grid
                      style={{ cursor: "pointer" }}
                      className="right-panel"
                      key={item.eventId}
                      onClick={() => onDateChange(item.startDate)}
                    >
                      <Typography className={importance}>
                        {item.eventName}, {convertToDate(item.startDate)}{" "}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
};

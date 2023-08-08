import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteEvent } from "./mainpage-functions";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { UpdateEvent } from "./mainpage-functions";
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("/");
}

export function MyEditDialog({ item, index }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setdesc] = useState("");
  const [date, setSelectedDate] = useState(null);
  const [time, setSelectedTime] = useState(null);
  function timefix(e) {
    let hour = e.getHours();
    console.log("before:", hour);
    if (hour > 20) {
      hour -= 24;
    }
    hour += 3;
    console.log("after", hour);
    e.setHours(hour);
    return e;
  }

  const dateAccept = (e) => {
    let dateObj = new Date(e);
    console.log("before:", dateObj);
    dateObj.setTime(dateObj.getTime() + 6 * 60 * 1000 * 60);
    console.log("after:", time);
    setSelectedDate(dateObj);
  };
  const timeAccept = (e) => {
    setSelectedTime(e);
  };

  return (
    <>
      <Button
        className="edit-button"
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<EditIcon />}
        color="error"
      >
        Edit
      </Button>
      <Dialog
        key={`${item.eventId}-${index}`}
        id={`${item.eventId}-${index}`}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {<EditIcon></EditIcon>} Editing Event
        </DialogTitle>
        <DialogContent>
          <Grid className="edit-event">
            <Grid className="edit-name">
              <TextField
                fullWidth
                defaultValue={item.eventName}
                label="Name"
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Grid>
            <Grid className="edit-desc">
              <TextField
                fullWidth
                defaultValue={item.description}
                label="Description"
                onChange={(e) => setdesc(e.target.value)}
              ></TextField>
            </Grid>
            <Typography>
              current date: {formatDate(item.startDate).toString()}
            </Typography>

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <Grid className="edit-date">
              <DatePicker
                label="Set new date"
                onAccept={(e) => dateAccept(e)}
              />
            </Grid>
            <Grid className="edit-time">
              <TimePicker
                label="Set new time"
                onAccept={(e) => timeAccept(e)}
              />
            </Grid>

            {/* </LocalizationProvider> */}
          </Grid>

          <DialogContentText
            id="alert-dialog-description"
            fontSize={20}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            // onClick={handleDelete(item)}
            onClick={() => {
              console.log(item.eventId);
              item.eventName = name;
              item.description = desc;
              item.startDate = date;
              item.time = timefix(time);
              console.log("testdeneme:", item);
              UpdateEvent(item);
              //UPDATE FONKSİYONU ÇAĞIRILACAK
              setOpen(false);
              console.log("done");
            }}
            autoFocus
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

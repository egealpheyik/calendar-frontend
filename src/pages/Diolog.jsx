import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteEvent, GetEvents } from "./mainpage-functions";
import { GetUpcomingEvents } from "./Upcoming";
export function MyDialog({ item, index, statefunc, upcomingStateFunc }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="delete-button"
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
        color="error"
      >
        Delete
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
          {"Delete Selected Event?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {item.eventName} event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            // onClick={handleDelete(item)}
            onClick={() => {
              console.log("testdeneme:", item);
              const aa = DeleteEvent(item)
                .then((x) => {
                  GetEvents(item.startDate).then((result) => {
                    console.log(result);
                    statefunc(result);
                  });

                  //console.log(zo);
                  // statefunc(zo);
                })
                .then((x) => {
                  GetUpcomingEvents(new Date()).then((result) => {
                    upcomingStateFunc(result);
                  });
                });
              // const zo = GetEvents(item.startDate);
              console.log("aa", aa);
              setOpen(false);
              console.log("done");
              // statefunc(zo);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

"use client";

import {
  createReservation,
  removeReservation,
  updateReservation,
} from "@/lib/api/reservation";
import {
  removeRestaurant,
  updateRestaurant,
  createRestaurant,
} from "@/lib/api/restaurant";
import {
  ReservationModel,
  ReservationResponse,
  RestaurantModel,
  reservationModel,
} from "@/lib/interface/restaurant";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState, Fragment, useEffect } from "react";

export default function Reservation({
  reservationList,
}: {
  reservationList: ReservationResponse[];
}) {
  const [openCreate, setCreate] = useState(false);
  //console.log(reservationList);
  return (
    <div>
      <div className="mb-5 mx-5 flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          Reservation List
        </Typography>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {reservationList.length > 0 ? (
          reservationList.map((reservation: ReservationResponse) => (
            <ReservationCard key={reservation._id} reservation={reservation} />
          ))
        ) : (
          <Typography>You do not have any reservation</Typography>
        )}
      </div>
    </div>
  );
}

function ReservationCard({
  reservation,
}: {
  reservation: ReservationResponse;
}) {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("Removed reservation!");
  const [openCreate, setCreate] = useState(false);
  const { data: session } = useSession();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const remove = async (id: string) => {
    try {
      const res = await removeReservation(id, session?.user.token);

      setSuccessText("Removed Reservation!");
      setSnackOpen(true);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {reservation.restaurant.name}
        </Typography>

        <Typography variant="body2">
          Booking name: {reservation.user}
        </Typography>
        <Typography variant="body2">
          Number of Guests: {reservation.numOfGuests}
        </Typography>
        <Typography variant="body2">
          Booking Date: {reservation.bookingDate}
        </Typography>
        <Typography variant="body2">
          Created At: {reservation.createdAt}
        </Typography>
        <Typography variant="body2">Reserved By: {reservation.user}</Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button size="small" variant="outlined" onClick={() => setCreate(true)}>
          Edit Reservation
        </Button>
        <EditReservation
          openState={[openCreate, setCreate]}
          reservationProp={reservation}
          idProp={reservation._id}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={() => remove(reservation._id)}
          size="small">
          Delete
        </Button>
      </CardActions>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
          {successText}
        </Alert>
      </Snackbar>
    </Card>
  );
}

function EditReservation({
  openState: [open, setOpen],
  reservationProp,
  idProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  reservationProp: ReservationResponse;
  idProp: string;
}) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const [reservation, setReservation] =
    useState<ReservationModel>(reservationModel);
  useEffect(() => {
    setReservation({
      ...reservation,
      ["numOfGuests"]: reservationProp.numOfGuests,
    });
  }, [reservationProp]);
  const onChange = (e: any) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      let res = await updateReservation(
        reservation,
        idProp,
        session?.user.token
      );
      console.log(res);

      if (res.success) {
        setSnackOpen(true);
        setOpen(false);
        setSuccessText("Edited Reservation!");
        setReservation(reservationModel);
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "background.paper",
              border: "1px solid #3f93e8",
              boxShadow: 24,
              p: 4,
            }}
            className="rounded-xl">
            <form action={onSubmit} className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="flex items-center justify-center mb-2">
                Edit Reservation
              </Typography>
              <TextField
                id="name"
                name="numOfGuests"
                label="Number of guest"
                type="number"
                onChange={onChange}
                value={reservation.numOfGuests}
                fullWidth
                sx={{ display: "block" }}
              />
              <LocalizationProvider
                adapterLocale={"en-gb"}
                dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic date time picker"
                  value={reservation.bookingDate}
                  onChange={(newValue) => {
                    if (newValue != null) {
                      setReservation({
                        ...reservation,
                        bookingDate: newValue.toString(),
                      });
                    }
                  }}
                />
              </LocalizationProvider>

              <Button variant="outlined" type="submit">
                Add Reservation
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        {!error ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}>
            {successText}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Cannot make more than 3 reservations
          </Alert>
        )}
      </Snackbar>
    </Fragment>
  );
}

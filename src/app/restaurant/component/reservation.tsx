"use client";

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
  return (
    <div>
      <div className="mb-5 mx-5 flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          Reservation List
        </Typography>
        <Button variant="outlined" onClick={() => setCreate(true)}>
          Add Reservation
        </Button>
        {/* <AddRestaurant openState={[openCreate, setCreate]} /> */}
      </div>
      <div className="grid grid-cols-2 gap-5">
        {reservationList.length >= 0 ? (
          reservationList.map((reservation: ReservationResponse) => (
            <ReservationCard key={reservation._id} reservation={reservation} />
          ))
        ) : (
          <Typography>Not joined any reservation</Typography>
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
      const res = await removeRestaurant(id);
      console.log(res);
      if (res.success) {
        setSuccessText("Removed Restaurant!");
        setSnackOpen(true);

        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {reservation.user}
        </Typography>

        <Typography variant="body2">
          Restaurant: {reservation.restaurant.name}
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
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button size="small" variant="outlined" onClick={() => setCreate(true)}>
          Edit restautant
        </Button>
        {/* <AddRestaurant
          openState={[openCreate, setCreate]}
          reservationProp={reservation}
          idProp={reservation._id}
        /> */}
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

function AddRestaurant({
  openState: [open, setOpen],
  reservationProp,
  idProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  reservationProp?: RestaurantModel;
  idProp?: string;
}) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const router = useRouter();

  const [reservation, setRestaurant] =
    useState<ReservationModel>(reservationModel);
  const onChange = (e: any) => {
    setRestaurant({ ...reservation, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (reservationProp) {
      //setRestaurant(reservationProp);
    }
  }, [reservationProp]);

  const onSubmit = async () => {
    try {
      let res;
      if (reservationProp && idProp) {
        //res = await updateRestaurant(reservation, idProp);
        setSuccessText("Edited Restaurant!");
      } else {
        // res = await createRestaurant(reservation);
        setSuccessText("Add Restaurant Completed!");
      }

      if (res.success) {
        setSnackOpen(true);
        setOpen(false);
        setRestaurant(reservationModel);
        router.refresh();
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
                Add Restaurant
              </Typography>
              <TextField
                id="name"
                name="name"
                label="Name"
                onChange={onChange}
                value={reservation.name}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="foodtype"
                name="foodtype"
                label="Food Type"
                onChange={onChange}
                value={reservation.foodtype}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="address"
                name="address"
                label="Address"
                onChange={onChange}
                value={reservation.address}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="province"
                name="province"
                label="Province"
                onChange={onChange}
                value={reservation.province}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="postalcode"
                name="postalcode"
                label="Postal Code"
                onChange={onChange}
                value={reservation.postalcode}
                fullWidth
                sx={{ display: "block" }}
                inputProps={{ minLength: 5, maxLength: 5 }}
              />
              <TextField
                id="tel"
                name="tel"
                label="Telephone"
                onChange={onChange}
                value={reservation.tel}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="picture"
                name="picture"
                label="Picture URL"
                onChange={onChange}
                value={reservation.picture}
                fullWidth
                sx={{ display: "block" }}
              />

              <Button variant="outlined" type="submit">
                Add Restaurant
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successText}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

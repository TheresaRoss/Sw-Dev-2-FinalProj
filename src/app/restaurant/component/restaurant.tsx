"use client";
import {
  removeRestaurant,
  updateRestaurant,
  createRestaurant,
} from "@/lib/api/restaurant";
import {
  RestaurantResponse,
  RestaurantModel,
  restaurantModel,
  ReservationModel,
  reservationModel,
} from "@/lib/interface/restaurant";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  Modal,
  Backdrop,
  Fade,
  Box,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, Fragment } from "react";
import { createReservation } from "@/lib/api/reservation";
import { useSession } from "next-auth/react";

export default function Restaurant({
  restaurantList,
}: {
  restaurantList: RestaurantResponse[];
}) {
  const { data: session } = useSession();
  const [openCreate, setCreate] = useState(false);
  return (
    <div>
      <div className="mb-5 mx-5 flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          Restaurant List
        </Typography>
        {session?.user.data.role === "admin" ? (
          <Button variant="outlined" onClick={() => setCreate(true)}>
            Add restautant
          </Button>
        ) : (
          <></>
        )}
        <AddRestaurant openState={[openCreate, setCreate]} />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {restaurantList.length >= 0 ? (
          restaurantList.map((restaurant: RestaurantResponse) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <Typography>Not joined any restaurant</Typography>
        )}
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant }: { restaurant: RestaurantResponse }) {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("Removed restaurant!");
  const [openCreate, setCreate] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);
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
      const res = await removeRestaurant(id, session?.user.token);
      console.log(res);
      if (res.success) {
        setSuccessText("Removed Restaurant!");
        setSnackOpen(true);

        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {restaurant.name}
        </Typography>

        <Typography variant="body2">
          Food Type: {restaurant.foodtype}
        </Typography>
        <Typography variant="body2">Address: {restaurant.address}</Typography>
        <Typography variant="body2">Province: {restaurant.province}</Typography>
        <Typography variant="body2">
          Postal Code: {restaurant.postalcode}
        </Typography>
        <Typography variant="body2">Telephone: {restaurant.tel}</Typography>
        <Typography variant="body2">
          Picture URL: {restaurant.picture}
        </Typography>
      </CardContent>
      {session?.user.data.role === "admin" ? (
        <CardActions sx={{ float: "right" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenReserve(true)}>
            Add Reservation
          </Button>
          <AddReservation
            openState={[openReserve, setOpenReserve]}
            idProp={restaurant.id}
          />
          <Button
            size="small"
            variant="outlined"
            onClick={() => setCreate(true)}>
            Edit Restautant
          </Button>
          <AddRestaurant
            openState={[openCreate, setCreate]}
            restaurantProp={restaurant}
            idProp={restaurant.id}
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(restaurant.id)}
            size="small">
            Delete
          </Button>
        </CardActions>
      ) : (
        <CardActions sx={{ float: "right" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenReserve(true)}>
            Add Reservation
          </Button>
          <AddReservation
            openState={[openReserve, setOpenReserve]}
            idProp={restaurant.id}
          />
        </CardActions>
      )}
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
  restaurantProp,
  idProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  restaurantProp?: RestaurantModel;
  idProp?: string;
}) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = React.useState(false);

  const [restaurant, setRestaurant] =
    useState<RestaurantModel>(restaurantModel);
  const onChange = (e: any) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (restaurantProp) {
      setRestaurant(restaurantProp);
    }
  }, [restaurantProp]);

  const onSubmit = async () => {
    try {
      let res;
      if (restaurantProp && idProp) {
        res = await updateRestaurant(restaurant, idProp, session?.user.token);
        setSuccessText("Edited Restaurant!");
      } else {
        res = await createRestaurant(restaurant, session?.user.token);
        setSuccessText("Add Restaurant Completed!");
      }

      if (res.success) {
        setSnackOpen(true);
        setOpen(false);
        setRestaurant(restaurantModel);
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        setSnackOpen(true);
        setOpen(false);
        setError(true);
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
                value={restaurant.name}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="foodtype"
                name="foodtype"
                label="Food Type"
                onChange={onChange}
                value={restaurant.foodtype}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="address"
                name="address"
                label="Address"
                onChange={onChange}
                value={restaurant.address}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="province"
                name="province"
                label="Province"
                onChange={onChange}
                value={restaurant.province}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="postalcode"
                name="postalcode"
                label="Postal Code"
                onChange={onChange}
                value={restaurant.postalcode}
                fullWidth
                sx={{ display: "block" }}
                inputProps={{ minLength: 5, maxLength: 5 }}
              />
              <TextField
                id="tel"
                name="tel"
                label="Telephone"
                onChange={onChange}
                value={restaurant.tel}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="picture"
                name="picture"
                label="Picture URL"
                onChange={onChange}
                value={restaurant.picture}
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
        {!error ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}>
            {successText}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Cannot create restaurant
          </Alert>
        )}
      </Snackbar>
    </Fragment>
  );
}
function AddReservation({
  openState: [open, setOpen],

  idProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];

  idProp: string;
}) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const [reservation, setReservation] =
    useState<ReservationModel>(reservationModel);
  const onChange = (e: any) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      let res = await createReservation(
        reservation,
        idProp,
        session?.user.token
      );
      console.log(res);

      if (res.success) {
        setSnackOpen(true);
        setOpen(false);
        setSuccessText("Added Reservation!");
        setReservation(reservationModel);
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        setSnackOpen(true);
        setOpen(false);
        setError(true);
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
                Add Reservation
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

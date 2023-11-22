"use client";

import {
  createRestaurant,
  getMe,
  removeRestaurant,
  updateRestaurant,
} from "@/lib/api/restaurant";
import {
  ReservationResponse,
  RestaurantModel,
  RestaurantResponse,
  restaurantModel,
} from "@/lib/interface/restaurant";
import { AddTask } from "@mui/icons-material";
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
  Tab,
  Tabs,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import React, { useState, Fragment, useEffect } from "react";
import Restaurant from "./restaurant";
import Reservation from "./reservation";
import { useSession } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@emotion/react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function MainRes({
  restaurantList,
  reservationList,
}: {
  restaurantList: RestaurantResponse[];
  reservationList: ReservationResponse[];
}) {
  const [tab, setTab] = useState(0);
  const { data: session } = useSession();
  const theme = useTheme();
  const [mode, setMode] = useState(lightTheme);
  const [modename, setModeName] = useState("light");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <ThemeProvider theme={mode}>
      <div
        className={` p-5  min-h-screen ${
          modename === "light" ? "bg-slate-50" : "bg-black"
        }`}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="Restaurant" />
              <Tab label="Reservation" />
              <Box className="flex  justify-end items-center flex-1">
                <div
                  className={`mb-2 pl-7 bg-opacity-80 px-4 rounded-full 
                    ${
                      modename === "light"
                        ? "text-white  bg-black"
                        : "text-black bg-white"
                    }`}>
                  <span>{modename} mode </span>
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={() => {
                      if (modename === "dark") {
                        setModeName("light");
                        setMode(lightTheme);
                      } else {
                        setModeName("dark");
                        setMode(darkTheme);
                      }
                    }}
                    color="inherit">
                    {modename === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                </div>
              </Box>
            </Tabs>
          </Box>

          <CustomTabPanel value={tab} index={0}>
            <Restaurant restaurantList={restaurantList} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <Reservation reservationList={reservationList} />
          </CustomTabPanel>
        </Box>
      </div>
    </ThemeProvider>
  );
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
}

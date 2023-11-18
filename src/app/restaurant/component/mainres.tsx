"use client";

import {
  createRestaurant,
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
} from "@mui/material";

import React, { useState, Fragment, useEffect } from "react";
import Restaurant from "./restaurant";
import Reservation from "./reservation";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <div className="mb-5">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Restaurant" />
            <Tab label="Reservation" />
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

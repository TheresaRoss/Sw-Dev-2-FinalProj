import { ReservationModel } from "../interface/restaurant";

export async function getReservationList(token: any) {
  //console.log(token);
  try {
    const res = await fetch(process.env.API_ROUTE + "/api/v1/bookings", {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
export async function createReservation(
  reservation: ReservationModel,
  resid: string,
  token: any
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE +
        `/api/v1/restaurants/${resid}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(reservation),
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function updateReservation(
  reservation: ReservationModel,
  id: string,
  token: any
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/bookings/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(reservation),
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}
export async function removeReservation(id: string, token: any) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/bookings/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getReservationList(token: any) {
  console.log(token);
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

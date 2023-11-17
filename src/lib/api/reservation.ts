export async function getReservationList() {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_ROUTE + "/api/v1/restaurants",
        {
          method: "GET",
          cache: "no-store",
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
  
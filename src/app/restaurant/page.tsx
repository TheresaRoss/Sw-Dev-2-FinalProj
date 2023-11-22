import { getRestaurantList } from "@/lib/api/restaurant";
import MainRes from "./component/mainres";
import { getReservationList } from "@/lib/api/reservation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  const restaurantList = await getRestaurantList();
  //console.log(restaurantList);
  const reservationList = await getReservationList(session?.user.token);

  //console.log(reservationList);
  return (
    <main className="">
      <MainRes
        restaurantList={restaurantList.data}
        reservationList={reservationList.data}
      />
    </main>
  );
}

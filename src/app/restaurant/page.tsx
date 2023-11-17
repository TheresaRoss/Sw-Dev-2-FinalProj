import { getRestaurantList } from "@/lib/api/restaurant";
import MainRes from "./component/mainres";

export default async function Admin() {
  const restaurantList = await getRestaurantList();
  const reservationList = await console.log(restaurantList);

  return (
    <main className="p-5">
      <MainRes restaurantList={restaurantList.data} />
    </main>
  );
}

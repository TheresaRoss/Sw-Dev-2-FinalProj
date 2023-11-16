import { getRestaurantList } from "@/lib/api/restaurant";
import MainRes from "./component/mainres";

export default async function Admin() {
  const restaurantList = await getRestaurantList();
  console.log(restaurantList);

  return (
    <main className="p-5">
      <div className="flex mb-5 flex-col justify-center items-center">
        <div className="text-3xl mb-2">Welcome to Restaurant</div>
      </div>
      <MainRes restaurantList={restaurantList.data} />
    </main>
  );
}

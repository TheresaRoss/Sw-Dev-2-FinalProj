import { RestaurantModel } from "../interface/restaurant";

export async function createRestaurant(restaurant: RestaurantModel) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + "/api/v1/restaurants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
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

export async function updateRestaurant(
  restaurant: RestaurantModel,
  id: string
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/restaurants/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
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

export async function getRestaurantList() {
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

export async function removeRestaurant(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/restaurants/${id}`,
      {
        method: "DELETE",
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

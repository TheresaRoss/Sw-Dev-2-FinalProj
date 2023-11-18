import { RestaurantModel } from "../interface/restaurant";

export async function createRestaurant(
  restaurant: RestaurantModel,
  token: any
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + "/api/v1/restaurants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(restaurant),
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function updateRestaurant(
  restaurant: RestaurantModel,
  id: string,
  token: any
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/restaurants/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + token,
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

export async function getRestaurant(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/restaurants/${id}`,
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

export async function getRestaurantList() {
  try {
    const res = await fetch(process.env.API_ROUTE + "/api/v1/restaurants", {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function removeRestaurant(id: string, token: any) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + `/api/v1/restaurants/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
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

export async function getMe(token: any) {
  try {
    const res = await fetch(process.env.API_ROUTE + "/api/v1/auth/me", {
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

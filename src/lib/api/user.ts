import { UserModel } from "../interface/user";

export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ROUTE + "/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to log-in");
  }

  return await response.json();
}

export async function registerUser(user: UserModel) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + "/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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

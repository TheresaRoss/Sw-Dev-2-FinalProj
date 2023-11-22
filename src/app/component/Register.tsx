"use client";
import { registerUser } from "@/lib/api/user";
import React, { useState } from "react";
import { UserModel } from "@/lib/interface/user";

export default function Register() {
  const [user, setUser] = useState<UserModel>({
    name: "",
    email: "",
    tel: "",
    role: "user",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(user);

      if (response) {
        // Registration successful
        window.location.href = "/api/auth/signin";
        console.log("User registered successfully:", response);
      } else {
        // Registration failed
        alert("Please fill out the information completely.");
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div>
      <div className="container mx-auto mt-8">
        <form
          id="userRegistrationForm"
          className="max-w-md mx-auto"
          onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              id="name"
              className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              id="email"
              className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              id="tel"
              className="block text-gray-700 text-sm font-bold mb-2">
              Tel:
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              minLength={10}
              value={user.tel}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              id="password"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              minLength={6}
              value={user.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input type="hidden" id="role" name="role" value="user" />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

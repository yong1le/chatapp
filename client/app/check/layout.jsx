"use client"

import { navigateToPage } from "@/api/Navigation";
import { useRouter } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const router = useRouter();
  navigateToPage(router);

  return (
    <div className="w-screen h-screen  flex justify-center items-center">
      <div className="w-full sm:w-1/2 xl:w-1/3 h-1/2 bg-white rounded-xl m-2">
        <form className="flex flex-col p-4 pt-10">
          <p className="place-self-center font-bold text-2xl mb-10">
            Sign in to your account
          </p>

          <label for="user" className="text-xl font-semibold my-2">
            User
          </label>
          <input
            type="text"
            name="user"
            id="user"
            className="text-xl border-2 border-black my-2 p-2 rounded-xl"
            required
            placeholder="Username"
          />

          <label for="password" className="text-xl font-semibold my-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-xl my-2 p-2 border-2 border-black rounded-xl"
            required
            placeholder="Password"
          />

          <div className="place-self-center flex flex-col w-full">
            {children}
          </div>
        </form>
      </div>
    </div>
  );
};

export default layout;

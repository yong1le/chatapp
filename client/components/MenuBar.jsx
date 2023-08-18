"use client";

import { navigateToPage } from "@/api/Navigation";
import { setUser } from "@/api/Session";
import { useRouter } from "next/navigation";
import React from "react";

const MenuBar = ({ user }) => {
  const router = useRouter();
  const handleLogout = () => {
    setUser("");
    navigateToPage(router);
  };
  return (
    <div
      className="
      h-full w-full px-10 bg-black
      flex flex-row justify-between items-center 
      "
    >
      <span className="text-xl text-white">Chat App - {user}</span>
      <button onClick={handleLogout} className="bg-white text-black p-3 rounded-xl hover:bg-slate-300">
        Logout
      </button>
    </div>
  );
};

export default MenuBar;

"use client";

import { getUser } from "@/api/Session";
import { useRouter } from "next/navigation";
import React from "react";

const Friend = ({ friend }) => {
  const router = useRouter();

  const goToFriend = (e) => {
    const friend = e.target.innerText;
    const user = getUser();
    router.push(`/${user}/${friend}`);
  };
  return (
    <button
      onClick={goToFriend}
      className="
      px-10 w-full border-b-2 border-black 
      h-28 flex items-center
      hover:px-20 hover:bg-black hover:text-white
      "
    >
      <p className="text-xl">{friend}</p>
    </button>
  );
};

export default Friend;

"use client";

import { navigateToPage } from "@/api/Navigation";
import FriendsPanel from "@/components/FriendsPanel";
import MenuBar from "@/components/MenuBar";
import { useRouter } from "next/navigation";
import React from "react";

const MainLayout = ({ params, children }) => {
  const user = params.sender;

  const router = useRouter();
  navigateToPage(router, user);

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="border-b-2 border-black min-h-content" style={{ height: "10%" }}>
        <MenuBar user={user} />
      </div>
      <div className="flex flex-row" style={{ height: "90%" }}>
        <div className="w-1/6 md:w-1/4 border-r-2 border-black">
          <FriendsPanel user={user} />
        </div>
        <div className="w-5/6 md:w-3/4 h-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

"use client";

import { navigateToPage } from "@/api/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    navigateToPage(router);
  }, []);
};

export default Home;

"use client";

import { navigateToPage } from "@/api/Navigation";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  navigateToPage(router);
};

export default Home;

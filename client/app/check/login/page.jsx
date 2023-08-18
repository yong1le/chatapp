"use client";

import { navigateToPage } from "@/api/Navigation";
import { setUser } from "@/api/Session";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    const data = new FormData(e.target.form);
    const user = data.get("user");
    const password = data.get("password");

    // Don't do anything if any field is empty
    if (!user || !password) {
      return;
    }

    e.preventDefault();
    const res = await axios.get(
      `http://localhost:8000/users/check/${user}/${password}`
    );
    if (!res.data) {
      alert("error");
      return;
    }
    setUser(user);
    navigateToPage(router);
  };
  return (
    <>
      <input
        onClick={handleLogin}
        type="submit"
        value="Login!"
        className="bg-black p-3 text-white rounded-xl hover:bg-slate-600 cursor-pointer my-3"
      />

      <Link href="/check/signup">No Account? Sign up now!</Link>
    </>
  );
};

export default page;

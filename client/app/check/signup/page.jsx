"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const handleSignup = async (e) => {
    const data = new FormData(e.target.form);
    const user = data.get("user");
    const password = data.get("password");
    // only prevent when things are empty so we get check
    if (!user || !password) {
      return;
    }

    e.preventDefault();
    const res = await axios.post(
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
        onClick={handleSignup}
        type="submit"
        value="Signup!"
        className="bg-black p-3 text-white rounded-xl hover:bg-slate-600 cursor-pointer my-3"
      />

      <Link href="/check/login">Have an account? Log in!</Link>
    </>
  );
};

export default page;

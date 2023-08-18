import { useRouter } from "next/navigation";
export default function () {
  const user = localStorage.getItem("user");

  const router = useRouter();
  if (!user) {
    router.push("/check/login");
  } else {
    router.push(`/${user}`);
  }
}

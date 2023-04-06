import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    // Remove JWT token from session storage
    sessionStorage.removeItem("token");
    // Redirect to sign-in page
    router.push("/signin");
  }, []);

  return null;
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AUTH_COOKIE = "gym-crm-auth";

// Middleware redirects "/" before we ever get here, but this acts as a
// belt-and-suspenders fallback if middleware is somehow disabled.
export default function Home() {
  const hasSession = !!cookies().get(AUTH_COOKIE)?.value;
  redirect(hasSession ? "/dashboard" : "/login");
}

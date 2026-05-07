"use server";

import { cookies } from "next/headers";
import type { Session } from "@/lib/auth";

const AUTH_COOKIE = "gym-crm-auth";
const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;

export interface SignInResult {
  ok: boolean;
  error?: string;
  session?: Session;
}

/**
 * Server-side credential check against env vars.
 * The credentials never leave the server — only the success/error result
 * and a sanitized session payload are returned to the client.
 */
export async function signInAction(
  email: string,
  password: string,
): Promise<SignInResult> {
  // Slight delay so brute-force attempts feel sluggish.
  await new Promise((r) => setTimeout(r, 400));

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return { ok: false, error: "Server is not configured. Contact support." };
  }

  if (
    email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() ||
    password !== adminPassword
  ) {
    return { ok: false, error: "Invalid email or password" };
  }

  const namePart = email.split("@")[0];
  const session: Session = {
    email,
    name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
    role: "Admin",
    loggedInAt: new Date().toISOString(),
  };

  cookies().set({
    name: AUTH_COOKIE,
    value: encodeURIComponent(JSON.stringify(session)),
    httpOnly: false, // client mirrors to localStorage for the Topbar avatar/name
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK_SECONDS,
  });

  return { ok: true, session };
}

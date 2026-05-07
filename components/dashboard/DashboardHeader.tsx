"use client";

import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";

function timeOfDayGreeting(hour: number) {
  if (hour < 5) return "Working late";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function DashboardHeader() {
  const [name, setName] = useState("there");
  const [greeting, setGreeting] = useState("Welcome back");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const session = getSession();
    if (session?.name) setName(session.name);
    const now = new Date();
    setGreeting(timeOfDayGreeting(now.getHours()));
    setDateStr(`${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`);
  }, []);

  return (
    <div className="sticky top-16 z-20 -mx-4 border-b border-slate-200/70 bg-slate-50/85 px-4 py-4 backdrop-blur-md sm:py-5 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500" suppressHydrationWarning>
            {dateStr || " "}
          </p>
          <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl" suppressHydrationWarning>
            {greeting},{" "}
            <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {name}
            </span>{" "}
            <span aria-hidden className="inline-block origin-[70%_70%] animate-wave">
              👋
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening at your gym today.
          </p>
        </div>
      </div>
    </div>
  );
}

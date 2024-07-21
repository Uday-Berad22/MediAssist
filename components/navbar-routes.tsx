"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import ModeToggle from "./DarkMode";
import Link from "next/link";

export const NavbarRoutes = () => {
  const { userId } = useAuth();

  return (
    <>
      <div className="flex justify-around items-center w-screen">
        <div>
          <Link href="/dashboard" className="text-navy text-lg">
            Dashboard
          </Link>
        </div>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

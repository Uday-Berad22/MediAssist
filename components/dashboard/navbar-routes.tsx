"use client";

import { UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/DarkMode";

export const NavbarRoutes = () => {
  return (
    <>
      <div className="flex gap-x-2 items-center ml-auto">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

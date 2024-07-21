"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import ModeToggle from "@/components/DarkMode";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import Logo from "../navbar/logo";

const Links = [
  { name: "Home", href: "/" },
  { name: "Get Started", href: "/user" },
  { name: "Contact Us", href: "/contact" },
];

export const NavbarRoutes = () => {
  const { userId } = useAuth();

  return (
    <>
      <div className="flex justify-between items-center w-screen">
        <MobileSidebar />
        <div className="hidden lg:block">
          <Logo />
        </div>
        <div className="flex lg:px-2 items-center">
          {Links.map((link) => (
            <div className="mx-4 hidden lg:block" key={link.href}>
              <Link href={link.href} key={link.name}>
                {link.name}
              </Link>
            </div>
          ))}
          <div className="lg:mx-4 mx-2">
            <ModeToggle />
          </div>
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="bg-blue-600 p-3 rounded-xl text-white">
              <SignInButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

"use client";

import {
  Calendar,
  Compass,
  Presentation,
  Layout,
  MehIcon,
  TvIcon,
  SigmaIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Home",
    href: "/",
  },
  {
    icon: TvIcon,
    label: "Get Started",
    href: "/user",
  },
  {
    icon: Layout,
    label: "Contact Us",
    href: "/contact",
  },
];
export const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

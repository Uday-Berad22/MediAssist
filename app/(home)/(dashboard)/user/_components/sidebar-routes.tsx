"use client";

import {
  Calendar,
  Compass,
  Presentation,
  Layout,
  MehIcon,
  TvIcon,
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
    label: "Profile",
    href: "/user",
  },
  {
    icon: Layout,
    label: "Insurance",
    href: "/user/insurance",
  },
  {
    icon: Calendar,
    label: "Medical History",
    href: "/user/medical-history",
  },
  {
    icon: Presentation,
    label: "Checkup History",
    href: "/user/checkup-history",
  },
  {
    icon: MehIcon,
    label: "Available Doctors",
    href: "/user/available-doctors",
  },
  {
    icon: Compass,
    label: "Appointments",
    href: "/user/appointments",
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

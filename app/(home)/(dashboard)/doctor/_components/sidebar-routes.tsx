"use client";

import { BaggageClaim, Layout, MedalIcon, Smile } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Home",
    href: "/",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/doctor",
  },
  {
    icon: Smile,
    label: "Waiting Appointment",
    href: "/doctor/appointments",
  },
  {
    icon: MedalIcon,
    label: "Medical Report",
    href: "/doctor/medical-report",
  },
  {
    icon: BaggageClaim,
    label: "Checkup History",
    href: "/doctor/checkup-history",
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

"use client";

import {
  BarChart,
  Box,
  Calendar,
  Compass,
  Presentation,
  Layout,
  Lightbulb,
  List,
  MehIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: Calendar,
    label: "EduEvent",
    href: "/events",
  },
  {
    icon: Presentation,
    label: "EduBoard",
    href: "https://eboard.onrender.com/",
  },
  {
    icon: MehIcon,
    label: "Focus Mode",
    href: "https://edetection.vercel.app/",
  },
  {
    icon: Box,
    label: "Fun Hub",
    href: "https://odetection.vercel.app/",
  },
  {
    icon: Lightbulb,
    label: "Idea of the Day",
    href: "/iotd",
  },
  // {
  //   icon: FileQuestion,
  //   label: "EduQuiz",
  //   href: "https://quizmify.vercel.app",
  // },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
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

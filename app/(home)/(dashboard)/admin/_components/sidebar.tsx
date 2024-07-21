import Logo from "@/components/navbar/logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="flex flex-row p-6">
        <Logo />
        <span className="mt-1 font-bold text-blue-500"> EduPulse </span>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

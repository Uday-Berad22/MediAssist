import { NavbarRoutes } from "./navbar-routes";
export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex z-40 bg-white dark:bg-black items-centershadow-sm">
      <NavbarRoutes />
    </div>
  );
};

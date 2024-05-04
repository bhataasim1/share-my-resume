import Nav from "./Nav";
import { dashboardNavItems } from "@/constant";

const DashboardLeftSidebarNav = () => {
  return (
    <div className="hidden md:flex fixed inset-0 sm:relative sm:w-[20%] overflow-y-auto rounded-lg mt-2 border-r">
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-2xl font-bold tracking-tight">
            Navigation Menu 🚀
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto m-2">
          <Nav items={dashboardNavItems} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftSidebarNav;

import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserCog, Settings, ChevronRight, Menu } from "lucide-react";
import { ROUTES } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";
import { useSidebar } from "@/store/useSidebar";

const getMenuItems = (userRole: string) => {
  const baseItems = [
    { path: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
    { path: ROUTES.PRODUCTS, label: "Products", icon: Users },
  ];
  
  if (userRole === 'admin') {
    baseItems.push({ path: ROUTES.LOCAL_USERS, label: "Local Users", icon: UserCog });
  }
  
  baseItems.push({ path: "/settings", label: "Settings", icon: Settings });
  return baseItems;
};

export default function Sidebar() {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();
  const { isMinimized, toggleSidebar } = useSidebar();
  
  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 flex flex-col transition-all duration-300",
      isMinimized ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-700 px-4">
        <button
          onClick={toggleSidebar}
          className={cn(
            "rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300",
            isMinimized ? "p-3" : "p-2"
          )}
        >
          <Menu className={cn(
            "transition-all duration-300",
            isMinimized ? "h-6 w-6" : "h-5 w-5"
          )} />
        </button>
        {!isMinimized && (
          <h1 className="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Panel</h1>
        )}
      </div>
      <nav className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {getMenuItems(userRole).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md text-sm font-medium transition-all duration-300",
                  isMinimized ? "justify-center px-2 py-3" : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                )
              }
              title={isMinimized ? item.label : undefined}
            >
              <item.icon className={cn(
                "transition-all duration-300",
                isMinimized ? "h-6 w-6" : "h-4 w-4"
              )} />
              {!isMinimized && (
                <>
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

    </div>
  );
}

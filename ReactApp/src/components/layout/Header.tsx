import { Bell, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/useAuth";
import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const navigate = useNavigate();
  const { logout, getUserName } = useAuth();
  const { isMinimized } = useSidebar();
  const userName = getUserName();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 z-10 transition-all duration-300",
      isMinimized ? "left-16" : "left-64"
    )}>
      <h2 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">Welcome to Admin Panel</h2>
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden md:block">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <Settings className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

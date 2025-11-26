import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isMinimized } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      <main className={cn(
        "mt-16 p-6 text-gray-900 dark:text-gray-100 transition-all duration-300",
        isMinimized ? "ml-16" : "ml-64"
      )}>
        {children}
      </main>
    </div>
  );
}

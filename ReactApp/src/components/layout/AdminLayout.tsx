import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-16 p-6 text-gray-900 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDetailPage = pathname.startsWith("/products/");

  return (
    <ProtectedRoute>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          isDetailPage ? "bg-white" : "bg-login-gray"
        }`}
      >
        <Navbar />
        <main className="flex-1 container mx-auto w-full py-8 px-4">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

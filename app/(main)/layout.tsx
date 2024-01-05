"use client";

import ProtectRoute from "@/components/AuthProvider";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function MainLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <ProtectRoute>
      <div className="flex justify-center text-white w-full">
        <Header />
        <Navbar />
        {modal}
        <div className="sm:pl-mbNav lg:pl-nav w-full">{children}</div>
      </div>
    </ProtectRoute>
  );
}
export default MainLayout;

import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="flex justify-center text-white w-full">
      <Navbar />
      {modal}
      <div className="pl-mbNav lg:pl-nav w-full">{children}</div>
    </div>
  );
}

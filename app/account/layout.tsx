import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Social Media - Authorize",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative bg-blue-500">{children}</div>;
}

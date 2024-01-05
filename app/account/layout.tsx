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
  return (
    <div className="relative">
      <Image
        src="/images/auth/thumbnail.avif"
        alt="thumbnail"
        height={2000}
        width={2000}
        className="fixed inset-0 h-screen object-cover"
        blurDataURL="/images/auth/thumbnail.avif"
      />
      {children}
    </div>
  );
}

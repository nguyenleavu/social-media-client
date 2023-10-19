import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Main Layout</h1>
      {children}
    </div>
  );
}

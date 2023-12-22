import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex justify-center text-white">
      <Navbar />
      <div className="pl-mbNav lg:pl-nav w-full">
        {children}
        {modal}
      </div>
    </div>
  );
}

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}
export default function MainLayout({ children, modal }: Props) {
  console.log("modal1", modal);
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

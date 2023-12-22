import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}
export default function MainLayout({ modal, children }: Props) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

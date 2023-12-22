import { ReactNode } from "react";
import Information from "./Information";
import Content from "./Content";

export default function ProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string };
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full px-5 pt-8 flex flex-col items-center justify-center">
        <Information params={params} />
        <Content params={params} />
        <div>{children}</div>
      </div>
    </div>
  );
}

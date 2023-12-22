import { links } from "@/constants/footer";
import { map } from "lodash";
import React from "react";

const Footer = () => {
  return (
    <div className="px-4 flex flex-wrap mt-5">
      {map(links, (link, index) => (
        <span
          key={index}
          className="text-xs text-[#737373] mr-2 hover:underline transition-all"
        >
          {link}
        </span>
      ))}
      <p className="text-xs text-[#737373] mt-4">
        © 2023 SOCIAL MEDIA FROM NGUYENVU
      </p>
    </div>
  );
};

export default Footer;

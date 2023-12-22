import { links } from "@/constants/footer";
import { map } from "lodash";

const Footer = () => {
  return (
    <div className="px-4 flex flex-col items-center gap-4 pt-16">
      <div className="w-[400px] flex gap-4 items-center flex-wrap justify-center">
        {map(links, (link, index) => (
          <span
            key={index}
            className="text-sm font-medium uppercase text-white hover:underline transition-all"
          >
            {link}
          </span>
        ))}
      </div>
      <p className="text-xs text-[#737373]">
        © 2023 SOCIAL MEDIA FROM NGUYENVU
      </p>
    </div>
  );
};

export default Footer;

import { PostAudience, SizesAvatar, TypeAvatar } from "@/constants/enum";
import moment from "moment";
import Image from "next/image";
import { ReactNode } from "react";
import Tooltip from "../Tooltip";
import Link from "next/link";
import { truncateName } from "@/utils/common";
import classNames from "classnames";

interface Props {
  type: TypeAvatar;
  size: SizesAvatar;
  name: string;
  subTitle?: string;
  createAt?: string;
  audience?: PostAudience;
  src: string;
  truncate?: boolean;
  fullWidth?: boolean;
}

const sizes = {
  small: "h-9 w-9",
  medium: "h-11 w-11",
  large: "h-14 w-14",
};

const Avatar = ({
  truncate = false,
  src,
  name,
  size = SizesAvatar.Medium,
  subTitle,
  createAt,
  audience,
  fullWidth = false,
}: Props) => {
  return (
    <div>
      <div className={classNames("flex items-center", fullWidth && "w-full")}>
        <Link href={`/${name}`} className={`${sizes[size]}`}>
          <Image
            width={2000}
            height={2000}
            src={src}
            className="h-full w-full rounded-full"
            alt={name}
          />
        </Link>
        <div className="ml-2 flex flex-col justify-center items-start">
          <Link href={`/${name}`} className="font-medium block  leading-tight">
            {truncate ? truncateName(name) : name}
          </Link>
          {createAt && (
            <div className="flex items-center gap-1 text-grayA8 h-4">
              <span className="text-xs leading-tight">
                {moment(new Date(createAt)).fromNow()}
              </span>
              {createAt && <i className="fa-solid fa-period mb-2"></i>}
              {audience === PostAudience.Everyone && (
                <Tooltip content="Public">
                  <i className="fa-regular fa-earth-asia text-xs"></i>
                </Tooltip>
              )}
              {audience === PostAudience.PostCircle && (
                <Tooltip content="Friends">
                  <i className="fa-solid fa-user-group text-xs"></i>
                </Tooltip>
              )}
            </div>
          )}
          {subTitle && <p className="text-xs text-grayA8">{subTitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default Avatar;

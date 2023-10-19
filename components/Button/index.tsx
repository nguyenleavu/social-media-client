import { ElementType, ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "contained" | "outlined" | "transparent";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "fullWidth" | "medium";
  component?: ElementType;
  disable?: boolean;
  loading?: boolean;
}

const variantOptions = {
  contained:
    "border border-transparent h-9 text-white bg-primary transition-all hover:bg-primary/90 focus:ring-2 focus:outline-none focus:ring-bg-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-bg-primary/55 ",
  outlined:
    "border border-primary h-9 text-primary bg-white hover:text-white transition-all hover:bg-primary/90 focus:ring-2 focus:outline-none focus:ring-bg-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-bg-primary/55",
  transparent: "",
};

const sizes = {
  fullWidth: "w-full",
  medium: "",
};

const Button = ({
  href,
  variant = "contained",
  className,
  component: Tag = "button",
  children,
  onClick,
  type = "button",
  size = "medium",
  disable = false,
  loading,
}: ButtonProps) => {
  return (
    <Tag
      to={href}
      onClick={onClick}
      type={type}
      className={`${variantOptions[variant]} ${className} ${sizes[size]} ${
        disable && "opacity-70 cursor-not-allowed"
      }`}
      disable={disable.toString()}
    >
      {loading ? (
        <span>
          <i className="animate-spin fa-solid fa-circle-notch"></i>
        </span>
      ) : (
        children
      )}
    </Tag>
  );
};

export default Button;

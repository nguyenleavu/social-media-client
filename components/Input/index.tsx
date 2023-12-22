import { isEmpty } from "lodash";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "file";
  placeholder: string;
  className?: string;
  name: string;
  fullWidth?: boolean;
  register: UseFormRegister<any>;
  error?: string;
}

const Input = ({
  type = "text",
  placeholder,
  className = "",
  fullWidth,
  name,
  error,
  register,
}: InputProps) => {
  return (
    <div className={`${className} ${fullWidth && "w-full"} mb-2`}>
      <input
        className="w-full h-10 outline-none border border-gray-400 rounded text-xs px-2 focus:border-gray-500"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {!isEmpty(error) && (
        <p className="text-red-500 text-xs my-[2px]">{error}</p>
      )}
    </div>
  );
};

export default Input;

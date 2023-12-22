import { ChangeEvent } from "react";

interface Props {
  label: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RangeSlider = ({ value, label, onChange }: Props) => {
  return (
    <div>
      <label htmlFor={label} className="text-white block h-12 py-[14px]">
        {label}
      </label>
      <div className="h-9 flex items-center">
        <input
          onChange={onChange}
          id={label}
          type="range"
          value={value}
          className="w-full h-[2px] rounded-lg appearance-none cursor-pointer range-sm bg-white track"
        />
      </div>
    </div>
  );
};

export default RangeSlider;

import { isEmpty } from "lodash";
import Flatpickr, { DateTimePickerProps } from "react-flatpickr";

interface DatePickerProps extends DateTimePickerProps {
  error?: string;
}

const DatePicker = ({ value, onChange, error }: DatePickerProps) => {
  return (
    <div className="mb-2 bg-white">
      <div className="border border-gray-400 px-2 h-10 flex items-center rounded text-xs">
        <Flatpickr
          options={{
            disable: [(now) => now > new Date()],
            dateFormat: "d-m-Y",
            enableTime: false,
          }}
          placeholder="Select your date of birth"
          value={value}
          onChange={onChange}
        />
      </div>
      {!isEmpty(error) && (
        <p className="text-red-500 text-xs my-[2px]">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;

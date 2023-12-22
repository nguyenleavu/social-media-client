import { Dialog } from "@headlessui/react";
import { ChangeEvent } from "react";

interface Props {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadFile = ({ handleFileChange }: Props) => {
  return (
    <div className="h-full">
      <Dialog.Title
        as="h3"
        className="h-11 text-white text-sm flex items-center justify-center border-b border-grayF14 font-semibold"
      >
        Create new post
      </Dialog.Title>
      <div className="mt-2 p-6 flex items-center justify-center h-[724px] flex-col ]">
        <span className="text-sm text-gray-500">
          <i className="fa-thin fa-photo-film text-6xl text-white"></i>
        </span>
        <p className="text-lg mt-4 text-white">Drag photos and videos here</p>
        <div className="mt-4">
          <label
            htmlFor="upload_post"
            className="h-8 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-all rounded-lg text-xs font-semibold  cursor-pointer"
          >
            Select from computer
          </label>
          <input
            onChange={handleFileChange}
            id="upload_post"
            type="file"
            className="hidden"
            accept="image/*,video/*"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

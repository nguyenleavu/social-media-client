import React from "react";

const CreateComment = () => {
  return (
    <div className="flex flex-col gap-1 absolute left-0 right-0 bottom-0 px-5 bg-gray26 py-3 rounded-b-lg">
      <div className="flex">
        <div className="h-10 w-10 mt-1 bg-white rounded-full"></div>
        <div className="ml-1 px-3 w-full">
          <div className="rounded-2xl px-3 border border-gray26 h-20">
            <input className="bg-transparent w-full block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;

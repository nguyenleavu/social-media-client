/* eslint-disable @next/next/no-img-element */
"use client";

import CreatePost from "@/components/CreatePost";
import { postHeader } from "@/constants/content";
import { map } from "lodash";

import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="w-full flex justify-center rounded-lg ">
        <div className=" w-full md:w-[560px] rounded-sm md:rounded-lg mb-4 py-4 border-b border-gray26">
          <div className="flex items-center h-10">
            <div className="h-full w-10">
              <img
                src="https://images.unsplash.com/photo-1681995790954-99ac953f1130?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="avatar"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="flex-1 pl-2 h-full">
              <button
                className="w-full bg-gray26 rounded-full flex justify-start items-center h-full px-3 text-grayA8 hover:bg-[#3a3b3c] transition-all"
                onClick={openModal}
              >
                {`What's on your mind, Vũ?`}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1 mt-4 h-10">
            {map(postHeader, (item) => (
              <button
                key={item.id}
                onClick={openModal}
                className="flex-1 flex items-center justify-center p-2 text-grayA8  rounded hover:bg-gray26 transition-all"
              >
                <i className={item.icon}></i>
                <span className="ml-2 ">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <CreatePost isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default Header;

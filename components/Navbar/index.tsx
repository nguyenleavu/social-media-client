"use client";

import { useState } from "react";
import Notification from "../Notification";
import Search from "../Search";
import ListNav from "./ListNav";
import LogoNav from "./LogoNav";
import More from "./More";
import TabWrapper from "./TabWrapper";
import CreatePost from "./CreatePost";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTabSearch, setOpenTabSearch] = useState<boolean>(false);
  const [openTabNotification, setOpenTabNotification] =
    useState<boolean>(false);

  const addTabSearch = () => {
    setOpenTabSearch(true);
  };

  const closeTabSearch = () => {
    setOpenTabSearch(false);
  };

  const addTabNotification = () => {
    setOpenTabNotification(true);
  };

  const closeTabNotification = () => {
    setOpenTabNotification(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <nav className="fixed left-0 top-0 bottom-0 bg-black border-r border-gray26 z-10">
      <div className="relative px-3 py-5 w-mbNav lg:w-nav transition-all text-white flex flex-col justify-between h-full z-30 bg-black">
        <div>
          <LogoNav />
          <ListNav
            addTabSearch={addTabSearch}
            addTabNotification={addTabNotification}
            openModal={openModal}
          />
        </div>
        <More />
      </div>
      <CreatePost isOpen={isOpen} closeModal={closeModal} />
      <TabWrapper open={openTabSearch}>
        <Search onCloseTab={closeTabSearch} />
      </TabWrapper>
      <TabWrapper open={openTabNotification}>
        <Notification onCloseTab={closeTabNotification} />
      </TabWrapper>
    </nav>
  );
};

export default Navbar;

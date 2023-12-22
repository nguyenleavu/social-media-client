import { Dialog, Transition } from "@headlessui/react";
import { isObject } from "lodash";
import { Fragment, ReactNode } from "react";

interface Props {
  isOpen: boolean;
  handleOnOpenChangeModal?: (open: boolean) => void;
  handleCloseModal: () => void;
  children: ReactNode;
}

const Modal = ({
  isOpen,
  handleCloseModal,
  handleOnOpenChangeModal,
  children,
}: Props) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={
            handleOnOpenChangeModal ? handleOnOpenChangeModal : handleCloseModal
          }
        >
          <div className="fixed inset-0 overflow-y-auto shadow-none">
            <button
              className="absolute right-5 top-5"
              onClick={handleCloseModal}
            >
              <i className="fa-solid fa-xmark-large text-white text-lg"></i>
            </button>
            <div className="flex h-full  items-center justify-center text-center bg-black/70 py-5">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex items-center justify-center h-full">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;

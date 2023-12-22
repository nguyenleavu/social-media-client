import { useLogOutMutation } from "@/apis/auth/useLogOutMutation";
import { Menu, Switch, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const More = () => {
  const router = useRouter();

  const [enabled, setEnabled] = useState<boolean>(false);

  const { mutate: logOut } = useLogOutMutation(router);

  const handleLogout = () => logOut();

  return (
    <Menu as="div">
      <Menu.Button className="relative p-3 flex w-full items-center my-2 rounded-lg hover:bg-grayActive transition-all">
        <i className="text-2xl fa-regular fa-bars"></i>
        <span className="pl-4 hidden lg:block text-[15px] animate-fade-left">
          More
        </span>
      </Menu.Button>
      <Transition
        as="div"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          as="ul"
          className="absolute w-64 rounded-2xl p-2 bg-[#262626] left-0 right-0 -translate-y-[172px] text-sm"
        >
          <Menu.Item
            as="label"
            htmlFor="switch"
            disabled={true}
            className="cursor-pointer p-3 flex w-full items-center justify-between rounded-lg hover:bg-grayF14 transition-all"
          >
            <div>
              <i className=" text-lg fa-light fa-moon fa-flip-horizontal"></i>
              <span className="pl-3">Dark mode</span>
            </div>
            <Switch
              id="switch"
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? "bg-gray-600" : "bg-primary"}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </Menu.Item>
          <Menu.Item
            as="button"
            className="p-3 flex w-full items-center rounded-lg hover:bg-grayF14 transition-all"
            onClick={handleLogout}
          >
            <i className="fa-light fa-arrow-right-from-bracket fa-flip-both"></i>
            <span className="pl-3">Log out</span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default More;

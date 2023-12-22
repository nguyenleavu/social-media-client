import useOnClickOutside from "@/hooks/useOutsideClick";
import { useRef } from "react";

interface NotificationProps {
  onCloseTab: () => void;
}

const Notification = ({ onCloseTab }: NotificationProps) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(notificationRef, onCloseTab);
  return (
    <section ref={notificationRef} className="py-2 h-full">
      <div className="my-2 pl-6 pt-3 pb-9">
        <h2 className="text-2xl font-medium">Notifications</h2>
      </div>
    </section>
  );
};

export default Notification;

import { ROUTES } from "./routes";

interface Navigates {
  href: string;
  addTabNotification: () => void;
  addTabSearch: () => void;
  openModal: () => void;
}

export const navigates = ({
  addTabNotification,
  addTabSearch,
  href,
  openModal,
}: Navigates) => [
  {
    id: 1,
    icon: "fa-light fa-house",
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    id: 2,
    icon: "fa-light fa-magnifying-glass",
    title: "Search",
    onClick: () => addTabSearch(),
  },
  {
    id: 3,
    icon: "fa-light fa-compass",
    title: "Explore",
    href: ROUTES.EXPLORE,
  },
  {
    id: 4,
    icon: "fa-light fa-clapperboard-play",
    title: "Reels",
    href: ROUTES.REELS,
  },
  {
    id: 5,
    icon: "fa-light fa-message",
    title: "Messages",
    href: ROUTES.MESSAGE,
  },
  {
    id: 6,
    icon: "fa-light fa-heart",
    title: "Notifications",
    onClick: () => addTabNotification(),
  },
  {
    id: 7,
    icon: "fa-light fa-square-plus",
    title: "Create",
    onClick: () => openModal(),
  },
  {
    id: 8,
    icon: "fa-light fa-circle-user",
    title: "Profile",
    href: href,
  },
];

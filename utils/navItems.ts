import { AiFillStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiTicket } from "react-icons/gi";

const navItemsLeft = [
  { text: "Home", path: "/" },
  { text: "Events", path: "/events" },
];

const navItemsRight = [{ text: "Sign Up", path: "/sign-up" }];

const navItemsIcon = [
  { icon: GiTicket, text: "Tickets", path: "/my-tickets" },
  { icon: AiFillStar, text: "Interested", path: "/interested" },
  { icon: CgProfile, text: "Profile", path: "/profile" },
];

export default { navItemsLeft, navItemsRight, navItemsIcon };

import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function FooterBack({ text, to, color = `red-default` }) {
  return (
    <footer
      className={`fixed w-full bottom-0 shadow-top bg-cream text-${color} pl-5 py-3`}
    >
      <Link to={to} className="flex items-center gap-3">
        <FaCircleArrowLeft className=" text-3xl" />
        <p>{text}</p>
      </Link>
    </footer>
  );
}

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ButtonLanding({ text, color, to }) {
  return (
    <Link to={to}>
      <button
        type="button"
        className={`mx-auto w-72 min-w-36 h-10 lg:h-9 border-[1px] border-dark-default rounded-xl ${color} hover:brightness-110 text-cream font-bold text-lg flex items-center justify-center font-Neue-Kabel shadow-lg md:max-w-80 my-1 lg:my-1`}
      >
        {text}
      </button>
    </Link>
  );
}

export default ButtonLanding;

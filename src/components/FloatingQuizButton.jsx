import { Link, useLocation } from "react-router-dom";

export default function FloatingQuizButton() {
  const { pathname } = useLocation();

  // show only on home page
  if (pathname !== "/") return null;

  return (
    <Link
      to="/quiz"
      className="
        fixed left-4 z-[999]

        /* 📱 Mobile: push below hero text */
        top-[60%]

        /* 📲 Tablet */
        md:top-32

        /* 💻 Desktop */
        lg:top-52

        bg-accent-500 text-primary-900
        px-5 py-3 rounded-full
        shadow-xl font-semibold
        flex items-center gap-2
        hover:scale-105 hover:brightness-110
        transition-all
      "
    >
      Quiz
    </Link>
  );
}

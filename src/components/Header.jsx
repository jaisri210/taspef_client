// client/src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import i18n from "i18next";

const Icon = ({ name, className = "w-4 h-4 inline-block mr-2" }) => {
  // simple small icons (Home, Users, Reports, Book, Members, Folder)
  switch (name) {
    case "home":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"
          />
        </svg>
      );
    case "office":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18M6 21V7m6 14V7m6 14V7"
          />
        </svg>
      );
    case "reports":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6M3 21h18"
          />
        </svg>
      );
    case "magazine":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 7h10v12H7z M4 4h16v2H4z"
          />
        </svg>
      );
    case "members":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM2 20a6 6 0 0 1 12 0M12 20a6 6 0 0 1 12 0"
          />
        </svg>
      );
    case "directory":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18M5 21h14a1 1 0 0 0 1-1V7H4v13a1 1 0 0 0 1 1z"
          />
        </svg>
      );
    case "gallery":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18v18H3zM3 12h18M12 3v18"
          />
        </svg>
      );
    default:
      return null;
  }
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: "home" },
    { name: "Office Bearers", href: "/office-bearers", icon: "office" },
    { name: "AGM Reports", href: "/agm-reports", icon: "reports" },
    {
      name: "Namadhu Vanam E-Magazine",
      href: "/e-magazines",
      icon: "magazine",
    },
    { name: "Members", href: "/members", icon: "members" },
    {
      name: "2024 - TASPEF Directory",
      href: "/public/IFS new directory - final - 30-04-24 (1).pdf",
      target: "_blank", // safer filename recommended
      external: true,
      icon: "directory",
    },
    { name: "Gallery", href: "/gallery", icon: "gallery" },
  ];

  const isActive = (href) => location.pathname === href;
  //language switch button function
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <header className="sticky top-0 z-40">
      {/* Top bar: logo left, title centered */}
      <div className="bg-white">
        <div className="container h-28 mx-auto px-4 py-3 flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center">
            <img
              src="/assets/images/taspef-logo.png"
              alt="TASPEF"
              className="w-18 h-18 rounded-full object-contain"
            />
          </div>

          {/* centered title */}
          <div className="flex-1 text-center">
            <h1 className="text-green-800 font-bold text-lg md:text-3xl">
              Protect Forest and Conserve Wildlife
            </h1>
          </div>

          {/* empty spacer to keep title centered */}
          <div className="w-12 h-12" />
        </div>
      </div>

      {/* Green nav bar */}
      <div className="bg-green-900">
        <div className="container mx-auto px-4">
          {/* <div className="flex items-center justify-center"> */}
          {/* <div className="flex items-center justify-between w-full"> */}
          {/* Desktop nav (centered) */}
          {/* <nav className="hidden md:flex items-center gap-6 lg:gap-10 whitespace-nowrap"> */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center gap-6 lg:gap-10 whitespace-nowrap">
              {navigation.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 rounded text-white text-sm lg:text-base hover:bg-green-700 transition-colors"
                  >
                    <Icon name={item.icon} />
                    <span className="hidden lg:inline">{item.name}</span>
                    <span className="lg:hidden">{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-3 py-2 rounded text-white text-sm lg:text-base transition-colors ${
                      isActive(item.href)
                        ? "bg-green-700 text-green-700"
                        : "hover:bg-green-700"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon name={item.icon} />
                    <span className="hidden lg:inline">{item.name}</span>
                    <span className="lg:hidden">{item.name}</span>
                  </Link>
                ),
              )}
              {/* language switch button */}
              <div className="hidden md:flex items-center gap-2 ml-4">
                <button
                  onClick={() => changeLang("en")}
                  className="px-2 py-1 text-xs bg-white text-green-900 rounded"
                >
                  EN
                </button>

                <button
                  onClick={() => changeLang("ta")}
                  className="px-2 py-1 text-xs bg-white text-green-900 rounded"
                >
                  தமிழ்
                </button>
              </div>
            </nav>

            {/* Hamburger on small screens */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded text-white hover:bg-green-700"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile nav (dropdown) */}
          {mobileOpen && (
            <div className="md:hidden py-2">
              <nav className="flex flex-col gap-1">
                {navigation.map((item) =>
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-white hover:bg-green-700 rounded"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon name={item.icon} />
                      <span>{item.name}</span>
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded text-white hover:bg-green-700 ${
                        isActive(item.href) ? "bg-white text-green-700" : ""
                      }`}
                    >
                      <Icon name={item.icon} />
                      <span>{item.name}</span>
                    </Link>
                  ),
                )}
                <button
                  onClick={() => changeLang("en")}
                  className="px-2 py-1 text-xs bg-white text-green-900 rounded"
                >
                  EN
                </button>

                <button
                  onClick={() => changeLang("ta")}
                  className="px-2 py-1 text-xs bg-white text-green-900 rounded"
                >
                  தமிழ்
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

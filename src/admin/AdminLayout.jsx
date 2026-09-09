import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/agm-reports", label: "AGM Reports" },
  { to: "/admin/e-magazines", label: "E-Magazines" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/members", label: "Members Register" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/posts", label: "News Posts" },
  { to: "/admin/users", label: "Admin Users" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-60 shrink-0 bg-green-900 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="font-bold text-lg leading-tight">TASPEF</div>
          <div className="text-xs text-green-200">Admin Panel</div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-5 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-green-700 font-medium" : "text-green-100 hover:bg-green-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <a href="/" className="text-xs text-green-200 hover:text-white">
            ← Back to site
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-slate-500">Signed in</div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">{user?.name || user?.email}</span>
            <button
              onClick={logout}
              className="text-sm text-slate-500 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5"
            >
              Log out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

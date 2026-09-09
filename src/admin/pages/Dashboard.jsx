import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";

const TILES = [
  { key: "reports", label: "AGM Reports", to: "/admin/agm-reports" },
  { key: "emagazines", label: "E-Magazines", to: "/admin/e-magazines" },
  { key: "gallery", label: "Gallery Photos", to: "/admin/gallery" },
  { key: "members", label: "Register Members", to: "/admin/members" },
  { key: "events", label: "Events", to: "/admin/events" },
  { key: "posts", label: "News Posts", to: "/admin/posts" },
  { key: "users", label: "Admin Users", to: "/admin/users" },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {TILES.map((tile) => (
          <Link
            key={tile.key}
            to={tile.to}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-bold text-primary-600 tabular-nums">
              {stats?.counts?.[tile.key] ?? 0}
            </div>
            <div className="text-sm text-slate-500 mt-1">{tile.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-5 py-4 border-b border-gray-100 font-semibold text-slate-700">
          Recent activity
        </div>
        {!stats?.recent?.length ? (
          <div className="p-6 text-slate-500 text-sm">Nothing published yet.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {stats.recent.map((item) => (
              <li key={`${item.type}-${item.id}`} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <span className="text-slate-400 mr-2">{item.type}</span>
                  <span className="text-slate-700 font-medium">{item.title}</span>
                </div>
                <span className="text-slate-400 tabular-nums">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

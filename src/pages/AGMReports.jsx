// client/src/pages/AGMReports.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import REPORTS from "../data/reports"; // keep your mock data here, or remove and fetch if you later add backend
import { useTranslation } from "react-i18next";

export default function AGMReports() {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Use local mock data for now. If you later have an API, replace this with fetch('/api/agm-reports')
    setReports(REPORTS);
    setLoading(false);
  }, []);

  const openReport = (report) => {
    // IMPORTANT: navigate to the route defined in your App.jsx -> /agm-reports/:id
    navigate(`/agm-reports/${encodeURIComponent(report._id)}`, {
      state: { report },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{t("agm_reports")}</h2>

      {loading ? (
        <div className="text-slate-600">{t("loading")}…</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.length === 0 && (
            <div className="text-slate-600">{t("no_reports")}.</div>
          )}

          {reports.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">{r.title}</h3>
              <p className="text-gray-600 mb-4">{r.date}</p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openReport(r)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {t("view_report")}
                </button>

                {r.fileUrl && (
                  <a
                    href={
                      r.fileUrl.startsWith("http") ? r.fileUrl : `/${r.fileUrl}`
                    }
                    download={r.originalName || ""}
                    className="px-4 py-2 rounded border text-slate-700 hover:bg-slate-100"
                  >
                    {t("download")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

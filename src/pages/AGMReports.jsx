// client/src/pages/AGMReports.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api, { resolveAssetUrl } from "../services/api";

export default function AGMReports() {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .get("/agm-reports")
      .then((data) => {
        if (mounted) setReports(Array.isArray(data) ? data.filter((r) => r.published !== false) : []);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Failed to load reports");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const openReport = (report) => {
    navigate(`/agm-reports/${encodeURIComponent(report._id)}`, {
      state: { report },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{t("agm_reports")}</h2>

      {loading ? (
        <div className="text-slate-600">{t("loading")}…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.length === 0 && (
            <div className="text-slate-600">{t("no_reports")}.</div>
          )}

          {reports.map((r, idx) => (
            <div
              key={r._id}
              className={`bg-white p-4 rounded-lg shadow transition-all duration-300 ${
                idx === 0 ? "border-2 border-green-500 animate-pulse" : ""
              }`}
            >

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
                    href={resolveAssetUrl(r.fileUrl)}
                    download={r.originalName || ""}
                    target="_blank"
                    rel="noreferrer"
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

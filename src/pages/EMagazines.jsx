// client/src/pages/EMagazines.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditorialBoard from "../components/EditorialBoard";
import { useTranslation } from "react-i18next";
import api, { resolveAssetUrl } from "../services/api";

export default function EMagazines() {
  const { t } = useTranslation();
  const [mags, setMags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("latest"); // "latest" or "previous"
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .get("/emagazines")
      .then((data) => {
        if (mounted) setMags(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load e-magazines:", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const openDetail = (mag) => {
    window.open(resolveAssetUrl(mag.fileUrl), "_blank");
  };

  // Robust download that checks server response and content-type
  const download = async (mag) => {
    const url = resolveAssetUrl(mag.fileUrl);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error(
          "Download failed:",
          res.status,
          txt.slice ? txt.slice(0, 500) : txt,
        );
        alert(t("download_error"));
        return;
      }

      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (!ct.includes("pdf")) {
        const txt = await res.text().catch(() => "");
        console.error(
          "Expected PDF but got:",
          ct,
          txt.slice ? txt.slice(0, 500) : txt,
        );
        alert(t("download_invalid"));
        return;
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = mag.originalName || `${mag.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download exception:", err);
      alert(t("download_failed"));
      window.open(url, "_blank");
    }
  };

  // derived sets
  const latestIssue = mags.find((m) => m.isLatest) || mags[0];
  const previousIssues = mags
    .filter((m) => m._id !== latestIssue?._id)
    .sort((a, b) => (b.issueNumber || 0) - (a.issueNumber || 0));

  return (
    <div className="flex items-start gap-6">
      <EditorialBoard />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{t("e_magazines_title")}</h2>

        <div className="flex mb-4 gap-3 items-center">
          <p className="pt-1">{t("sort_by")}:</p>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border rounded-sm px-2 py-1 bg-gray-100"
          >
            <option value="latest">{t("latest_issue")}</option>
            <option value="previous">{t("previous_issue")}</option>
          </select>
        </div>

        {loading && <div className="text-slate-600">{t("loading")}…</div>}

        {/* show only latest */}
        {!loading && sortType === "latest" && latestIssue && (
          <div className="max-w-md">
            <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
              <div className="h-60 bg-gray-100 flex items-center justify-center text-gray-700">
                {latestIssue.coverUrl ? (
                  <img
                    src={resolveAssetUrl(latestIssue.coverUrl)}
                    alt={latestIssue.title}
                    className="w-full h-full object-fill"
                  />
                ) : (
                  <div className="text-xl font-semibold">
                    {latestIssue.title}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{latestIssue.title}</h3>
                <p className="text-sm text-gray-500">{latestIssue.date}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => openDetail(latestIssue)}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    {t("view")}
                  </button>
                  <button
                    onClick={() => download(latestIssue)}
                    className="bg-white border px-4 py-2 rounded hover:shadow-sm"
                  >
                    {t("download")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* show previous issues in a compact accordion */}
        {!loading && sortType === "previous" && (
          <div className="mt-4">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {previousIssues.map((mag) => (
                <div
                  key={mag._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    {mag.coverUrl ? (
                      <img
                        src={resolveAssetUrl(mag.coverUrl)}
                        alt={mag.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-sm text-gray-700">{mag.title}</div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{mag.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{mag.date}</p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => openDetail(mag)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        {t("view")}
                      </button>
                      <button
                        onClick={() => download(mag)}
                        className="px-3 py-1 rounded border text-sm"
                      >
                        {t("download")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {previousIssues.length === 0 && (
                <div className="col-span-full text-gray-500 p-4">
                  {t("no_previous_issues")}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

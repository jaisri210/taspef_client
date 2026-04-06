// client/src/pages/EMagazines.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditorialBoard from "../components/EditorialBoard";
import { useTranslation } from "react-i18next";

// Mock data (adjust fileUrl to match public folder: /assets or /uploads)
const MAGAZINES = Array.from({ length: 11 }).map((_, i) => {
  const n = i + 1;
  return {
    _id: String(n),
    title: `Namathu Vanam - Issue ${n}`,
    date: `Year ${2016 + i}`,
    fileUrl: `/assets/Issue-${n}.pdf`, // adjust to /uploads/... if you use that
    coverUrl: `/assets/images/i-${n}.png`,
    originalName: `Issue-${n}.pdf`,
  };
});

export default function EMagazines() {
  const { t } = useTranslation();
  const [mags, setMags] = useState([]);
  const [sortType, setSortType] = useState("latest"); // "latest" or "previous"
  const navigate = useNavigate();

  useEffect(() => {
    setMags(MAGAZINES);
  }, []);

  const openDetail = (mag) => {
    // if you have a detail route; otherwise open PDF
    // navigate(`/e-magazines/${mag._id}`, { state: { mag } });
    window.open(mag.fileUrl, "_blank");
  };

  // Robust download that checks server response and content-type
  const download = async (mag) => {
    const url = mag.fileUrl;
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
  const latestIssue = mags.find((m) => m._id === "11");
  const previousIssues = mags
    .filter((m) => m._id !== "11")
    .sort((a, b) => Number(b._id) - Number(a._id));

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

        {/* show only latest */}
        {sortType === "latest" && latestIssue && (
          <div className="max-w-md">
            <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
              <div className="h-60 bg-gray-100 flex items-center justify-center text-gray-700">
                {/* show cover if available */}
                {latestIssue.coverUrl ? (
                  <img
                    src={latestIssue.coverUrl}
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
        {sortType === "previous" && (
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
                        src={mag.coverUrl}
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

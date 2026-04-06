// client/src/pages/Members.jsx
import React, { useMemo } from "react";
import membersData from "../data/members.json";
import { useTranslation } from "react-i18next";

function formatDate(raw) {
  if (!raw) return "";
  // try Date parsing safely
  const d = new Date(raw);
  if (!isNaN(d)) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  // fallback: try split for MM/DD/YYYY or M/D/YYYY
  const parts = raw.split(/[\/\-\.]/).map((p) => p.trim());
  if (parts.length === 3) {
    // if first part > 12 assume yyyy-mm-dd
    if (parts[0].length === 4) {
      // yyyy-mm-dd
      return `${parts[2].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${
        parts[0]
      }`;
    }
    // mm/dd/yyyy -> convert to dd/mm/yyyy
    return `${String(parts[1]).padStart(2, "0")}/${String(parts[0]).padStart(
      2,
      "0",
    )}/${parts[2]}`;
  }
  return raw;
}

/** small CSV export utility */
// function exportCSV(rows, filename = "members.csv") {
//   if (!rows || !rows.length) return;
//   const header = Object.keys(rows[0]);
//   const csv = [
//     header.join(","),
//     ...rows.map((r) =>
//       header
//         .map((h) => {
//           const v = r[h] ?? "";
//           const safe = String(v).replace(/"/g, '""');
//           return `"${safe}"`;
//         })
//         .join(",")
//     ),
//   ].join("\n");
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }

export default function Members() {
  const { t } = useTranslation();
  // sort by id ascending
  const members = useMemo(() => {
    const arr = Array.isArray(membersData) ? [...membersData] : [];
    arr.sort((a, b) => Number(a.id ?? a._id ?? 0) - Number(b.id ?? b._id ?? 0));
    return arr;
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8">
      {/* Scrolling announcement bar */}
      <div className="marquee-wrap">
        <div className="marquee-track">{t("form_title")}</div>
      </div>
      {/* Blue banner/header */}
      <div className="bg-[#062a63] text-white rounded-sm p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          {t("register_of_members")}
        </h1>
        <div className="text-center text-sm md:text-base mt-3 max-w-3xl mx-auto">
          <div>
            <strong>{t("society_name_label")}</strong> {t("society_name_value")}
          </div>
          <div className="mt-1">
            <strong>{t("registration_date")}</strong>{" "}
            <span className="font-medium">10.09.2007</span>
          </div>
          <div className="mt-1 text-xs md:text-sm">
            {t("members_list_title")} <strong>22.09.2024</strong>
          </div>
        </div>
      </div>
      {/* Title + export */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t("our_members")}</h2>
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => exportCSV(members, "members.csv")}
            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700"
          >
            Export CSV
          </button> */}
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y table-auto">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t("s_no")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t("name")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t("subscription")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t("joining_date")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t("contact_number")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {members.map((m, idx) => (
                <tr
                  key={m.id ?? m._id ?? idx}
                  className="hidden md:table-row hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>

                  <td className="px-6 py-4 whitespace-normal text-sm">
                    <div className="font-semibold text-slate-800">{m.name}</div>
                    {m.designation && (
                      <div className="text-xs text-slate-500 mt-1">
                        {m.designation}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100">
                      {m.subscription ?? m.fee ?? "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatDate(m.joining_date ?? m.joiningDate ?? m.joining)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {m.phone ?? m.contact ?? m.mobile ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      /*mobile card view table*/
      <div className="md:hidden space-y-4 p-4">
        {members.map((m, idx) => (
          <div
            key={m.id ?? m._id ?? idx}
            className="bg-white rounded-lg shadow p-4 border"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-slate-800">
                  {idx + 1}. {m.name}
                </div>
                {m.designation && (
                  <div className="text-xs text-slate-500 mt-1">
                    {m.designation}
                  </div>
                )}
              </div>

              <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100">
                {m.subscription ?? m.fee ?? "-"}
              </span>
            </div>

            <div className="mt-3 text-sm text-slate-600 space-y-1">
              <div>
                <span className="font-medium">{t("joining_date")}:</span>{" "}
                {formatDate(m.joining_date ?? m.joiningDate ?? m.joining)}
              </div>

              <div>
                <span className="font-medium">{t("contact_number")}:</span>{" "}
                {m.phone ?? m.contact ?? m.mobile ?? "-"}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* small footer note */}
      <div className="mt-4 text-xs text-slate-500">* {t("contact_note")}</div>
    </div>
  );
}

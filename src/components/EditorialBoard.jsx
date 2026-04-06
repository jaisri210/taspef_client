import React from "react";
import { useTranslation } from "react-i18next";

export default function EditorialBoard() {
  const { t } = useTranslation();
  const members = [
    { name: t("prabhakaran"), role: t("role_prabhakaran"), title: t("editor") },
    { name: t("arun"), role: t("role_arun"), title: t("member") },
    { name: t("paulraj"), role: t("role_paulraj"), title: t("member") },
    {
      name: t("ramprasad"),
      role: t("role_ramprasad"),
      title: t("member"),
    },
    {
      name: t("sivagurunathan"),
      role: t("role_sivagurunathan"),
      title: t("member"),
    },
  ];
  return (
    <aside className="hidden lg:block w-88 mr-8 ">
      <div className="bg-green-50 border border-green-100 rounded-md p-5 shadow-sm sticky top-20 h-screen">
        <h4 className="text-lg font-semibold text-green-800 mb-4 ">
          {t("editorial_board")}
        </h4>

        <ul className="space-y-4 text-sm">
          {members.map((m, idx) => (
            <li key={idx} className="text-left">
              <div className="text-green-700 text-xs mt-1">{m.title}</div>
              <div className="text-green-700 font-medium">{m.name}</div>
              <div className="text-gray-600 text-xs">{m.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

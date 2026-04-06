import React from "react";
import { useTranslation } from "react-i18next";

export default function OfficeBearers() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/assets/images/taspef-logo.png"
            alt="TASPEF Logo"
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-red-800 text-2xl font-bold mb-2">
            {t("org_name")}
          </h1>
          <h2 className="text-blue-900 text-xl mb-2">{t("org_short")}</h2>
          <p className="text-gray-700">{t("reg_no")}</p>
        </div>

        {/* Patron */}
        <div className="text-center mb-8">
          <h3 className="text-blue-900 text-xl font-bold mb-1">
            {t("name_reddy")}
          </h3>
          <p className="text-blue-800">{t("principal_role")}</p>
          <p className="text-blue-800 font-bold">{t("patron_label")}</p>
        </div>

        {/* Office Bearers */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="text-center">
            <h3 className="text-blue-900 text-lg font-bold">
              {t("name_prabhakaran")}
            </h3>
            <p className="text-blue-800">IFS, APCCF (Retd)</p>
            <p className="text-blue-900">{t("executive_president")}</p>
          </div>
          {/* Right Column */}
          <div className="text-center">
            <h3 className="text-blue-900 text-lg font-bold">
              {t("name_arun")}
            </h3>
            <p className="text-blue-800">IFS, CF (Retd)</p>
            <p className="text-blue-900">{t("general_secretary")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <h3 className="text-blue-900 text-lg font-bold">
              {t("name_deepalingam")}
            </h3>
            <p className="text-blue-800">DCF (Retd)</p>
            <p className="text-blue-900">{t("vice_president")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-blue-900 text-lg font-bold">
              {t("name_sivagurunathan")}
            </h3>
            <p className="text-blue-800">ACF (Retd)</p>
            <p className="text-blue-900">{t("joint_secretary")}</p>
          </div>
        </div>

        {/* Treasurer */}
        <div className="text-center mb-12">
          <h3 className="text-blue-900 text-lg font-bold">
            {t("name_velumani")}
          </h3>
          <p className="text-blue-800">IFS, DCF (Retd)</p>
          <p className="text-blue-900">{t("treasurer")}</p>
        </div>

        {/* Executive Committee Members */}
        <div className="text-center">
          <h2 className="text-red-800 text-xl font-bold mb-6 underline">
            {t("executive_committee")}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_paulraj")}
              </h3>
              <p className="text-blue-800">IFS, CF (Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_kandasamy")}
              </h3>
              <p className="text-blue-800">IFS, APCCF (Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_ulaganathan")}
              </h3>
              <p className="text-blue-800">IFS, APCCF (Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_nadhan")}
              </h3>
              <p className="text-blue-800">IFS, CF (Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_palanichamy")}
              </h3>
              <p className="text-blue-800">DCF (Retd) </p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_dhandayuthapani")}
              </h3>
              <p className="text-blue-800">DCF(Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_ramprasath")}
              </h3>
              <p className="text-blue-800">AD (Statistics) (Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_anbalagan")}
              </h3>
              <p className="text-blue-800">DCF(Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_arumugam")}
              </h3>
              <p className="text-blue-800">ACF(Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_ramachandran")}
              </h3>
              <p className="text-blue-800"> ACF(Retd)</p>
            </div>
            <div>
              <h3 className="text-blue-900 text-lg font-bold">
                {t("name_mohanram")}
              </h3>
              <p className="text-blue-800">DCF(Retd)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

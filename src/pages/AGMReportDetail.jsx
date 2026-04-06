// client/src/pages/AGMReportDetail.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import REPORTS from "../data/reports";

const FALLBACK_REPORT = {
  title: "Minutes of the Annual General Body Meeting",
  date: "—",
  time: "—",
  venue: "—",
  officials: [],
  members: [],
  additionalMembers: [],
  agenda: [],
};

export default function AGMReportDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [report, setReport] = useState(location?.state?.report || null);
  const [loading, setLoading] = useState(!report);

  useEffect(() => {
    if (report) return setLoading(false);
    const found = REPORTS.find((r) => String(r._id) === String(id));
    setReport(found || FALLBACK_REPORT);
    setLoading(false);
  }, [id, report]);

  const handleBack = () => navigate(-1);

  if (loading) return <div className="text-center py-20">Loading…</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-green-600 hover:text-green-700"
      >
        <span className="mr-2 text-lg">←</span> Back to Reports
      </button>

      {/* Report Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 text-center">
        <h1 className="text-lg md:text-xl font-bold mb-2">
          Tamilnadu Association of Senior Professionals of Environment and
          Forestry (TASPEF)
        </h1>
        <h2 className="text-base md:text-lg text-green-700 font-semibold mb-3">
          {report.title}
        </h2>

        <div className="text-gray-600 text-sm md:text-base flex flex-col md:flex-row justify-center gap-6">
          <p>
            <strong>Date:</strong> {report.date}
          </p>
          <p>
            <strong>Time:</strong> {report.time}
          </p>
          <p>
            <strong>Venue:</strong> {report.venue}
          </p>
        </div>

        {!report.fileUrl && (
          <p className="mt-3 text-sm text-gray-500">
            No PDF available for this report.
          </p>
        )}
      </div>

      {/* Meeting Officials */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Meeting Officials
        </h3>
        {report.officials?.length ? (
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            {report.officials.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No officials listed.</p>
        )}
      </section>

      {/* Members Present */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Members Present
        </h3>
        {report.members?.length ? (
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            {report.members.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No members listed.</p>
        )}
      </section>

      {/* Additional Members Joined */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Additional Members Joined
        </h3>
        {report.additionalMembers?.length ? (
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            {report.additionalMembers.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No additional members listed.</p>
        )}
      </section>

      {/* Agenda Items and Resolutions */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Agenda Items and Resolutions
        </h3>
        {report.agenda?.length ? (
          <div className="space-y-4">
            {report.agenda.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100"
              >
                <h4 className="font-semibold mb-2">
                  {idx + 1}. {item.title}
                </h4>
                <p className="text-gray-700 text-sm md:text-base">
                  {item.resolution}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No agenda items available.</p>
        )}
      </section>

      {/* Meeting Conclusion */}
      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Meeting Conclusion
        </h3>
        <p className="text-gray-700">
          The AGM concluded at 2:00 PM with National Anthem.
        </p>
        <div className="mt-4 flex flex-col md:flex-row justify-between">
          <div>
            <p className="font-semibold">Dr.V.T.Kandasamy IFS (Retd)</p>
            <p>President</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="font-semibold">D.Arun</p>
            <p>General Secretary</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// client/src/pages/EMagazineDetail.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EMagazineDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [mag, setMag] = useState(location?.state?.mag || null);
  const [loading, setLoading] = useState(!mag);

  useEffect(() => {
    let mounted = true;
    if (mag) {
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const res = await axios.get(`/api/emagazines/${id}`);
        if (mounted) setMag(res.data);
      } catch (err) {
        console.error("Failed to load magazine", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id, mag]);

  if (loading) return <div className="text-center py-20">Loading…</div>;
  if (!mag) return <div className="text-center py-20">Magazine not found.</div>;

  const fileUrl = mag.fileUrl; // should be like '/uploads/mag-1.pdf' or absolute URL

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center text-green-600 hover:text-green-700"
            >
                <span className="mr-2 text-lg">←</span> Back to Magazines
            </button>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h1 className="text-lg md:text-xl font-bold text-center mb-2">
                    {mag.title}
                </h1>
                <div className="text-center text-gray-600 mb-2">{mag.date}</div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                    <div className="font-semibold">{mag.title}</div>
                    <div className="flex gap-2">
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded border"
                        >
                            Open in new tab
                        </a>
                        <a
                            href={fileUrl}
                            download
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Download
                        </a>
                    </div>
                </div>
                <iframe
                    src={fileUrl}
                    title={mag.title}
                    className="w-full h-[80vh] border-0"
                />
            </div>
        </div>
    );
}

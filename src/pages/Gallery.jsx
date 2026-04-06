import React, { useMemo, useState, useEffect } from "react"; // Added useEffect
import { useLocation } from "react-router-dom"; // Added useLocation
import GalleryBG from "../components/GalleryBG";
import manifest from "../data/gallery.json";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();
  const location = useLocation(); // Listen for incoming state
  const normalize = (s) =>
    s ? s.toString().toLowerCase().replace(/\s+/g, " ").trim() : "";

  const imageMap = useMemo(() => {
    const map = {};
    manifest.forEach((item) => {
      map[item.file] = `/assets/Gallery/${item.file}`;
    });
    return map;
  }, []);

  const [filter, setFilter] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  // ✅ AUTO-FILTER LOGIC: Listens to Floating Bar click
  useEffect(() => {
    if (location.state?.autoFilter) {
      setFilter(normalize(location.state.autoFilter));
      // Clear state so it doesn't stay filtered on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const items = useMemo(() => {
    return manifest
      .map((item) => {
        const src = imageMap[item.file];
        const tags = Array.isArray(item.tags)
          ? item.tags
          : item.tags
            ? [item.tags]
            : [];
        const normalizedTags = tags.map((t) => normalize(t));
        return { ...item, src, tags, normalizedTags };
      })
      .filter((i) => !!i.src);
  }, [imageMap]);

  const coverMapRaw = {
    new_arrivals: "/assets/Gallery/covers/new-arrivals.jpeg",
    meetings: "/assets/Gallery/gallery-21.png",
    wild_life: "/assets/Gallery/covers/wildlife-cover.jpg",
  };

  const coverMap = useMemo(() => {
    const m = {};
    Object.entries(coverMapRaw).forEach(([title, cover]) => {
      m[normalize(title)] = { title, cover };
    });
    return m;
  }, []);

  const categories = useMemo(() => Object.keys(coverMap), [coverMap]);

  const shown = useMemo(() => {
    if (!filter) return [];
    return items.filter((it) => it.normalizedTags.includes(filter));
  }, [items, filter]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GalleryBG />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("gallery_title")}
          </h1>
          {filter && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilter(null)}
                className="px-3 py-2 rounded border bg-white text-sm shadow hover:bg-gray-100 transition"
              >
                ← {t("back_to_categories")}
              </button>
              <div className="text-sm text-gray-600 capitalize">
                {coverMap[filter] ? t(coverMap[filter].title) : t(filter)}
              </div>
            </div>
          )}
        </div>

        {!filter && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {categories.map((catKey) => {
              const { title, cover } = coverMap[catKey];
              const count = items.filter((it) =>
                it.normalizedTags.includes(catKey),
              ).length;
              return (
                <div
                  key={catKey}
                  onClick={() => setFilter(catKey)}
                  role="button"
                  className="relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 group"
                >
                  <img
                    src={cover}
                    alt={`${t(title)} cover`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-sm">
                    <div className="text-white text-2xl font-bold">
                      {t(title)}
                    </div>
                    <div className="text-gray-200 text-sm">
                      {count} {t("photos")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filter && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shown.length === 0 ? (
              <div className="col-span-full py-16 text-center text-gray-600 text-lg">
                {t("no_photos")}{" "}
                <span className="font-semibold">
                  {coverMap[filter] ? t(coverMap[filter].title) : t(filter)}
                </span>
              </div>
            ) : (
              shown.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImg(img.src)}
                  className="overflow-hidden rounded-lg shadow cursor-pointer hover:shadow-lg transition-all"
                >
                  <img
                    src={img.src}
                    alt={img.caption || "Gallery"}
                    className="w-full h-48 object-cover hover:scale-105 transition-all"
                  />
                  {img.caption && (
                    <div className="p-2 text-sm bg-white/80">{img.caption}</div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {selectedImg && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImg(null)}
          >
            <img
              src={selectedImg}
              className="max-w-full max-h-[90vh] rounded shadow-2xl"
            />
            <button className="absolute top-6 right-8 text-white text-4xl">
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

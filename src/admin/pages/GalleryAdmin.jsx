import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import Loader from "../../components/Loader";

const KNOWN_CATEGORIES = ["new_arrivals", "meetings", "wild_life"];

export default function GalleryAdmin() {
  const { push } = useToast();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({ category: "", caption: "", image: null });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/gallery");
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      push(err.message || "Failed to load gallery", "error");
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => {
    load();
  }, [load]);

  const grouped = useMemo(() => {
    const byCategory = {};
    images.forEach((img) => {
      if (!byCategory[img.category]) byCategory[img.category] = [];
      byCategory[img.category].push(img);
    });
    Object.values(byCategory).forEach((list) => list.sort((a, b) => a.order - b.order));
    return byCategory;
  }, [images]);

  const categoryOptions = useMemo(() => {
    const set = new Set([...KNOWN_CATEGORIES, ...Object.keys(grouped)]);
    return Array.from(set);
  }, [grouped]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.image || !form.category) {
      push("Category and image are required", "error");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("category", form.category.trim());
      fd.append("caption", form.caption);
      fd.append("image", form.image);
      await api.post("/gallery", fd, { headers: { "Content-Type": "multipart/form-data" } });
      push("Photo uploaded");
      setUploadOpen(false);
      setForm({ category: "", caption: "", image: null });
      load();
    } catch (err) {
      push(err.message || "Upload failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/gallery/${pendingDelete._id}`);
      push("Deleted");
      setPendingDelete(null);
      load();
    } catch (err) {
      push(err.message || "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  const move = async (category, index, direction) => {
    const list = grouped[category];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const a = list[index];
    const b = list[targetIndex];
    const order = [
      { id: a._id, order: b.order },
      { id: b._id, order: a.order },
    ];

    // optimistic swap
    setImages((prev) =>
      prev.map((img) => {
        if (img._id === a._id) return { ...img, order: b.order };
        if (img._id === b._id) return { ...img, order: a.order };
        return img;
      })
    );

    try {
      await api.put("/gallery/reorder", { order });
    } catch (err) {
      push(err.message || "Reorder failed", "error");
      load();
    }
  };

  if (loading) return <Loader text="Loading gallery..." />;

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gallery</h1>
          <p className="text-slate-500 text-sm mt-1">
            Photos shown on the public gallery page, grouped by category.
          </p>
        </div>
        <Button variant="primary" onClick={() => setUploadOpen(true)}>
          + Upload Photo
        </Button>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-slate-500">
          No photos yet — upload the first one.
        </div>
      )}

      {Object.entries(grouped).map(([category, list]) => (
        <section key={category} className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
            {category.replace(/_/g, " ")} ({list.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {list.map((img, idx) => (
              <div key={img._id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={img.imageUrl} alt={img.caption || ""} className="w-full h-28 object-cover" />
                <div className="p-2">
                  {img.caption && <p className="text-xs text-slate-600 truncate">{img.caption}</p>}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex gap-1">
                      <button
                        onClick={() => move(category, idx, -1)}
                        disabled={idx === 0}
                        className="text-xs px-1.5 py-0.5 border rounded disabled:opacity-30"
                        aria-label="Move earlier"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => move(category, idx, 1)}
                        disabled={idx === list.length - 1}
                        className="text-xs px-1.5 py-0.5 border rounded disabled:opacity-30"
                        aria-label="Move later"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      onClick={() => setPendingDelete(img)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <Modal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Photo">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              list="gallery-categories"
              className="input"
              placeholder="e.g. wild_life"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              required
            />
            <datalist id="gallery-categories">
              {categoryOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-slate-700 mb-1">
              Caption
            </label>
            <input
              id="caption"
              className="input"
              value={form.caption}
              onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.files?.[0] || null }))}
              className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" type="button" onClick={() => setUploadOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={submitting}>
              Upload
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!pendingDelete}
        message="Delete this photo? This can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
        confirming={deleting}
      />
    </div>
  );
}

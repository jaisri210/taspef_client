import api from "../../services/api";

// Builds either a plain object or a FormData payload depending on whether
// any of the declared file fields actually hold a newly-picked File. On
// edit, a file field left untouched holds the existing URL string, not a
// File, so it's simply omitted — the backend keeps whatever it already has.
function buildPayload(values, fileFields = []) {
  const hasNewFile = fileFields.some((f) => values[f] instanceof File);
  if (!hasNewFile) {
    const clean = { ...values };
    fileFields.forEach((f) => delete clean[f]);
    return { data: clean, isMultipart: false };
  }
  const fd = new FormData();
  Object.entries(values).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (fileFields.includes(key)) {
      if (val instanceof File) fd.append(key, val);
    } else {
      fd.append(key, val);
    }
  });
  return { data: fd, isMultipart: true };
}

export function createResourceApi(basePath, fileFields = []) {
  return {
    list: (params) => api.get(basePath, { params }),
    get: (id) => api.get(`${basePath}/${id}`),
    create: (values) => {
      const { data, isMultipart } = buildPayload(values, fileFields);
      return api.post(
        basePath,
        data,
        isMultipart ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
      );
    },
    update: (id, values) => {
      const { data, isMultipart } = buildPayload(values, fileFields);
      return api.put(
        `${basePath}/${id}`,
        data,
        isMultipart ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
      );
    },
    remove: (id) => api.delete(`${basePath}/${id}`),
  };
}

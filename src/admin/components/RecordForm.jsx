import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";

function fileLabel(value) {
  if (value instanceof File) return value.name;
  if (typeof value === "string" && value) return value.split("/").pop();
  return null;
}

function Field({ field, value, onChange }) {
  const commonProps = {
    id: field.name,
    name: field.name,
    className: "input",
  };

  if (field.type === "textarea") {
    return (
      <textarea
        {...commonProps}
        rows={field.rows || 3}
        required={field.required}
        placeholder={field.placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        {...commonProps}
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        <option value="" disabled>
          {field.placeholder || "Select..."}
        </option>
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
        />
        {field.checkboxLabel || field.label}
      </label>
    );
  }

  if (field.type === "file") {
    const label = fileLabel(value);
    return (
      <div>
        <input
          type="file"
          accept={field.accept}
          onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
          className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        {label && (
          <p className="mt-1 text-xs text-slate-500">
            {value instanceof File ? "Selected: " : "Current: "}
            {label}
          </p>
        )}
      </div>
    );
  }

  return (
    <input
      {...commonProps}
      type={field.type || "text"}
      required={field.required}
      placeholder={field.placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
    />
  );
}

export default function RecordForm({ fields, initialValues, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(initialValues || {});

  useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues]);

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== "checkbox" && (
            <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
          )}
          <Field field={field} value={values[field.name]} onChange={handleChange} />
        </div>
      ))}
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          Save
        </Button>
      </div>
    </form>
  );
}

RecordForm.propTypes = {
  fields: PropTypes.array.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable";
import RecordForm from "./RecordForm";
import ConfirmDialog from "./ConfirmDialog";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { useToast } from "../../context/ToastContext";

// Drives a full list/create/edit/delete screen from a declarative config —
// shared by every content module whose shape is "a list of records with a
// form," which is most of them. Gallery is the one module that needs a
// bespoke layout (image grid + reordering) instead of this table+form shell.
export default function ResourcePage({ title, description, resourceApi, columns, fields, emptyMessage, toRecordValues, beforeSubmit }) {
  const { push } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, record = edit
  const [submitting, setSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await resourceApi.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      push(err.message || "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  }, [resourceApi, push]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (rawValues) => {
    setSubmitting(true);
    const values = beforeSubmit ? beforeSubmit(rawValues) : rawValues;
    try {
      if (editing && editing._id) {
        await resourceApi.update(editing._id, values);
        push("Saved");
      } else {
        await resourceApi.create(values);
        push("Created");
      }
      setEditing(null);
      load();
    } catch (err) {
      push(err.message || "Save failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await resourceApi.remove(pendingDelete._id);
      push("Deleted");
      setPendingDelete(null);
      load();
    } catch (err) {
      push(err.message || "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
        </div>
        <Button variant="primary" onClick={() => setEditing({})}>
          + New
        </Button>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyMessage={emptyMessage}
        onEdit={(row) => setEditing(row)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title={editing?._id ? `Edit ${title}` : `New ${title}`}
      >
        {editing && (
          <RecordForm
            fields={fields}
            initialValues={toRecordValues ? toRecordValues(editing) : editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!pendingDelete}
        message={`Delete "${pendingDelete?.title || pendingDelete?.name || "this record"}"? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
        confirming={deleting}
      />
    </div>
  );
}

ResourcePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  resourceApi: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string,
  toRecordValues: PropTypes.func,
  beforeSubmit: PropTypes.func,
};

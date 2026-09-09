import PropTypes from "prop-types";
import Loader from "../../components/Loader";

export default function DataTable({ columns, rows, keyField, onEdit, onDelete, loading, emptyMessage, extraActions }) {
  if (loading) return <Loader text="Loading..." />;

  if (!rows.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-slate-500">
        {emptyMessage || "Nothing here yet."}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row[keyField]} className="hover:bg-gray-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-sm text-slate-700 align-top">
                    {c.render ? c.render(row) : (row[c.key] ?? "—")}
                  </td>
                ))}
                <td className="px-4 py-3 text-sm text-right whitespace-nowrap align-top">
                  {extraActions && extraActions(row)}
                  <button
                    onClick={() => onEdit(row)}
                    className="text-primary-600 hover:text-primary-800 font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  extraActions: PropTypes.func,
};

DataTable.defaultProps = {
  keyField: "_id",
};

import ResourcePage from "../components/ResourcePage";
import { createResourceApi } from "../api/resourceApi";

const resourceApi = createResourceApi("/emagazines", ["file", "cover"]);

const columns = [
  {
    key: "coverUrl",
    label: "Cover",
    render: (r) =>
      r.coverUrl ? (
        <img src={r.coverUrl} alt="" className="w-10 h-14 object-cover rounded" />
      ) : (
        "—"
      ),
  },
  { key: "title", label: "Title" },
  { key: "issueNumber", label: "Issue #" },
  { key: "date", label: "Date" },
  {
    key: "isLatest",
    label: "Latest",
    render: (r) => (r.isLatest ? "★ Latest" : ""),
  },
  {
    key: "fileUrl",
    label: "File",
    render: (r) =>
      r.fileUrl ? (
        <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">
          {r.originalName || "View PDF"}
        </a>
      ) : (
        "—"
      ),
  },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "issueNumber", label: "Issue Number", type: "number" },
  { name: "date", label: "Issue Date / Year", type: "text", placeholder: "e.g. 2026" },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "file", label: "Issue PDF", type: "file", accept: "application/pdf" },
  { name: "cover", label: "Cover Image", type: "file", accept: "image/*" },
  { name: "isLatest", label: "Mark as latest issue", type: "checkbox", checkboxLabel: "Mark as latest issue" },
];

export default function EMagazinesAdmin() {
  return (
    <ResourcePage
      title="Namadhu Vanam E-Magazines"
      description="Upload and manage issues of the digital magazine."
      resourceApi={resourceApi}
      columns={columns}
      fields={fields}
      emptyMessage="No issues yet — upload the first one."
    />
  );
}

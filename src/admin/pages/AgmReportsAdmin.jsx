import ResourcePage from "../components/ResourcePage";
import { createResourceApi } from "../api/resourceApi";

const resourceApi = createResourceApi("/agm-reports", ["file"]);

const columns = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  {
    key: "published",
    label: "Status",
    render: (r) => (r.published ? "Published" : "Draft"),
  },
  {
    key: "fileUrl",
    label: "File",
    render: (r) =>
      r.fileUrl ? (
        <a
          href={r.fileUrl.startsWith("http") ? r.fileUrl : `/${r.fileUrl}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary-600 hover:underline"
        >
          {r.originalName || "View PDF"}
        </a>
      ) : (
        "—"
      ),
  },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "date", label: "Date", type: "text", placeholder: "e.g. September 24, 2024" },
  { name: "time", label: "Time", type: "text", placeholder: "e.g. 11:00 AM" },
  { name: "venue", label: "Venue", type: "text" },
  { name: "summary", label: "Summary", type: "textarea", rows: 2 },
  { name: "file", label: "Report PDF (optional)", type: "file", accept: "application/pdf" },
  {
    name: "officials",
    label: "Meeting Officials",
    type: "textarea",
    rows: 3,
    placeholder: "One per line, e.g.\nPresident: Dr.V.T.Kandasamy IFS, CCF (Retd)",
  },
  {
    name: "members",
    label: "Members Present",
    type: "textarea",
    rows: 3,
    placeholder: "One per line",
  },
  {
    name: "additionalMembers",
    label: "Additional Members Joined",
    type: "textarea",
    rows: 3,
    placeholder: "One per line",
  },
  {
    name: "agenda",
    label: "Agenda Items",
    type: "textarea",
    rows: 5,
    placeholder: "One per line, as: Title | Resolution text",
  },
  { name: "published", label: "Published", type: "checkbox", checkboxLabel: "Visible on the public site" },
];

const linesToArray = (text) =>
  (text || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

// A report either carries an uploaded PDF (shown as-is on the public page)
// or the structured minutes below (officials/members/agenda), rendered as
// sections. Reusing the generic textarea field type for those instead of
// building a repeating-group editor — "Title | Resolution" per line is a
// plain-text shorthand for the {title, resolution} objects the API stores.
const toRecordValues = (record) => ({
  ...record,
  officials: (record.officials || []).join("\n"),
  members: (record.members || []).join("\n"),
  additionalMembers: (record.additionalMembers || []).join("\n"),
  agenda: (record.agenda || []).map((a) => `${a.title} | ${a.resolution}`).join("\n"),
});

const beforeSubmit = (values) => ({
  ...values,
  officials: JSON.stringify(linesToArray(values.officials)),
  members: JSON.stringify(linesToArray(values.members)),
  additionalMembers: JSON.stringify(linesToArray(values.additionalMembers)),
  agenda: JSON.stringify(
    linesToArray(values.agenda).map((line) => {
      const [title, ...rest] = line.split("|");
      return { title: title.trim(), resolution: rest.join("|").trim() };
    })
  ),
});

export default function AgmReportsAdmin() {
  return (
    <ResourcePage
      title="AGM Reports"
      description="Annual General Meeting reports published on the public site."
      resourceApi={resourceApi}
      columns={columns}
      fields={fields}
      toRecordValues={toRecordValues}
      beforeSubmit={beforeSubmit}
      emptyMessage="No AGM reports yet — add the first one."
    />
  );
}

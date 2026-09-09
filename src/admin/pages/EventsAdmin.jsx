import ResourcePage from "../components/ResourcePage";
import { createResourceApi } from "../api/resourceApi";

const resourceApi = createResourceApi("/events", ["image"]);

const columns = [
  { key: "title", label: "Title" },
  {
    key: "startAt",
    label: "Starts",
    render: (r) => (r.startAt ? new Date(r.startAt).toLocaleString() : "—"),
  },
  { key: "location", label: "Location" },
  {
    key: "published",
    label: "Status",
    render: (r) => (r.published ? "Published" : "Draft"),
  },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "startAt", label: "Starts", type: "datetime-local" },
  { name: "endAt", label: "Ends", type: "datetime-local" },
  { name: "location", label: "Location", type: "text" },
  { name: "image", label: "Image", type: "file", accept: "image/*" },
  { name: "published", label: "Published", type: "checkbox", checkboxLabel: "Visible on the public site" },
];

export default function EventsAdmin() {
  return (
    <ResourcePage
      title="Events"
      description="Upcoming and past TASPEF events. No public events page exists yet — this prepares the content ahead of one."
      resourceApi={resourceApi}
      columns={columns}
      fields={fields}
      emptyMessage="No events yet."
    />
  );
}

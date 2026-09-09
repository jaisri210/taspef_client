import ResourcePage from "../components/ResourcePage";
import { createResourceApi } from "../api/resourceApi";

const resourceApi = createResourceApi("/posts", ["image"]);

const columns = [
  { key: "title", label: "Title" },
  { key: "excerpt", label: "Excerpt" },
  {
    key: "createdAt",
    label: "Added",
    render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"),
  },
  {
    key: "published",
    label: "Status",
    render: (r) => (r.published ? "Published" : "Draft"),
  },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2 },
  { name: "content", label: "Content", type: "textarea", rows: 6 },
  { name: "image", label: "Image", type: "file", accept: "image/*" },
  { name: "published", label: "Published", type: "checkbox", checkboxLabel: "Visible on the public site" },
];

export default function PostsAdmin() {
  return (
    <ResourcePage
      title="News Posts"
      description="Short news items. No public news page exists yet — this prepares the content ahead of one."
      resourceApi={resourceApi}
      columns={columns}
      fields={fields}
      emptyMessage="No posts yet."
    />
  );
}

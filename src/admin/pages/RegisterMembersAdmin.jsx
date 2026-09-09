import ResourcePage from "../components/ResourcePage";
import { createResourceApi } from "../api/resourceApi";

const resourceApi = createResourceApi("/register-members");

const columns = [
  { key: "name", label: "Name" },
  { key: "designation", label: "Designation" },
  { key: "joiningDate", label: "Joining Date" },
  { key: "phone", label: "Contact" },
  { key: "subscription", label: "Subscription" },
];

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text", placeholder: "e.g. ACF, DCF, IFS" },
  { name: "joiningDate", label: "Joining Date", type: "text", placeholder: "e.g. 6/5/2023" },
  { name: "phone", label: "Contact Number", type: "text" },
  { name: "subscription", label: "Subscription Amount", type: "number" },
];

export default function RegisterMembersAdmin() {
  return (
    <ResourcePage
      title="Register of Members"
      description="The life-members register shown on the public Members page."
      resourceApi={resourceApi}
      columns={columns}
      fields={fields}
      emptyMessage="No members in the register yet."
    />
  );
}

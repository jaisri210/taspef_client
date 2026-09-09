import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function UsersAdmin() {
  const { push } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      push(err.message || "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/users", form);
      push("Account created");
      setCreateOpen(false);
      setForm({ name: "", email: "", password: "", role: "admin" });
      load();
    } catch (err) {
      push(err.message || "Failed to create account", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (u) => {
    try {
      await api.put(`/users/${u._id}`, { isActive: !u.isActive });
      load();
    } catch (err) {
      push(err.message || "Update failed", "error");
    }
  };

  const toggleRole = async (u) => {
    try {
      await api.put(`/users/${u._id}`, { role: u.role === "admin" ? "user" : "admin" });
      load();
    } catch (err) {
      push(err.message || "Update failed", "error");
    }
  };

  if (loading) return <Loader text="Loading users..." />;

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Users</h1>
          <p className="text-slate-500 text-sm mt-1">
            Accounts that can sign in to this panel. There is no public sign-up — create accounts here.
          </p>
        </div>
        <Button variant="primary" onClick={() => setCreateOpen(true)}>
          + New Account
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-700">{u.name || "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{u.email}</td>
                <td className="px-4 py-3 text-sm text-slate-700 capitalize">{u.role}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={u.isActive ? "text-green-700" : "text-slate-400"}>
                    {u.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                  <button
                    onClick={() => toggleRole(u)}
                    disabled={u._id === currentUser?.id}
                    className="text-primary-600 hover:text-primary-800 font-medium mr-3 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Make {u.role === "admin" ? "editor" : "admin"}
                  </button>
                  <button
                    onClick={() => toggleActive(u)}
                    disabled={u._id === currentUser?.id}
                    className="text-red-600 hover:text-red-800 font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {u.isActive ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="New Account">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="u-name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input id="u-name" className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="u-email" className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input id="u-email" type="email" required className="input" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="u-password" className="block text-sm font-medium text-slate-700 mb-1">Temporary Password *</label>
            <input id="u-password" type="text" required minLength={8} className="input" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="u-role" className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select id="u-role" className="input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              <option value="admin">Admin</option>
              <option value="user">Editor (no admin panel access)</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" type="button" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={submitting}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

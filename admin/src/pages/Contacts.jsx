import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/authContext";
import toast from "react-hot-toast";

const AdminContacts = () => {
  const { adminToken } = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/contacts", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setContacts(res.data.data || []);
    } catch (err) {
      console.error("Fetch contacts error:", err);
      toast.error("Failed to load contacts ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
    fetchContacts();
    }
  }, [adminToken]);

  /* ================= MARK READ ================= */
  const markRead = async (id) => {
    try {
      await axios.put(
        `/contacts/${id}`,
        { isRead: true },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setContacts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, isRead: true } : c
        )
      );

      toast.success("Marked as read ✅");
    } catch (err) {
      console.error("Mark read error:", err);
      toast.error("Action failed ❌");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact message?")) return;

    try {
      await axios.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setContacts((prev) =>
        prev.filter((c) => c._id !== id)
      );

      toast.success("Contact deleted 🗑️");
    } catch (err) {
      console.error("Delete contact error:", err);
      toast.error("Delete failed ❌");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Contact Messages</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-4 text-gray-500"
                  >
                    No contact messages found
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr
                    key={c._id}
                    className={c.isRead ? "" : "bg-yellow-50"}
                  >
                    <td className="border p-2">
                      {c.name || "-"}
                    </td>
                    <td className="border p-2">
                      {c.phone || "-"}
                    </td>
                    <td className="border p-2">
                      {c.email || "-"}
                    </td>
                    <td className="border p-2 max-w-xs">
                      {c.message || "-"}
                    </td>
                    <td className="border p-2">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-2 space-x-2">
                      {!c.isRead && (
                        <button
                          onClick={() => markRead(c._id)}
                          className="px-2 py-1 bg-green-600 text-white rounded"
                        >
                          Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;

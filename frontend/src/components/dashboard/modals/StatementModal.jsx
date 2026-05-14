import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

function StatementModal({ open, onClose, accounts }) {
  const [statementAccount, setStatementAccount] = useState("");
  const [statementEntries, setStatementEntries] = useState([]);
  const [statementLoading, setStatementLoading] = useState(false);

  if (!open) return null;

  async function fetchStatement(accountId) {
    if (!accountId) {
      toast.error("Please select an account");
      return;
    }

    try {
      setStatementLoading(true);

      const response = await api.get(`/accounts/${accountId}/transactions`);

      setStatementEntries(response.data.transactions || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch statement");
    } finally {
      setStatementLoading(false);
    }
  }

  function closeModal() {
    setStatementAccount("");
    setStatementEntries([]);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0B1020]">
        <div className="flex items-center justify-between border-b border-black/10 p-6 dark:border-white/10">
          <div>
            <h2 className="text-2xl font-bold">Account Statement</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              View ledger-based account activity.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="rounded-full bg-black/5 px-3 py-1 text-xl dark:bg-white/10"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 overflow-auto p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              value={statementAccount}
              onChange={(e) => setStatementAccount(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none focus:border-purple-500 dark:border-white/10 dark:bg-[#111827]"
            >
              <option value="">Select account</option>

              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account._id}
                </option>
              ))}
            </select>

            <button
              onClick={() => fetchStatement(statementAccount)}
              className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 font-semibold text-white"
            >
              Fetch Statement
            </button>
          </div>

          <div className="overflow-auto rounded-2xl border border-black/10 dark:border-white/10">
            <table className="min-w-full">
              <thead className="bg-black/5 dark:bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {statementLoading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center">
                      Loading statement...
                    </td>
                  </tr>
                ) : statementEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-slate-500 dark:text-gray-400"
                    >
                      No statement entries found.
                    </td>
                  </tr>
                ) : (
                  statementEntries.map((entry) => (
                    <tr
                      key={entry._id}
                      className="border-t border-black/10 dark:border-white/10"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            entry.type === "CREDIT"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {entry.type}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        ₹{entry.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-500 dark:text-gray-400">
                        {entry.transaction}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400">
                        {new Date(entry.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatementModal;

import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

function AddAccountModal({ open, onClose, onSuccess }) {
  const [currency, setCurrency] = useState("INR");
  const [creatingAccount, setCreatingAccount] = useState(false);

  if (!open) return null;

  async function handleCreateAccount(e) {
    e.preventDefault();

    try {
      setCreatingAccount(true);

      const response = await api.post("accounts/create-account", {
        currency,
      });

      toast.success(response.data.message || "Account created successfully");

      setCurrency("INR");
      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    } finally {
      setCreatingAccount(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0B1020]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Add Account</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              Create a new bank account under your LedgerVault profile.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-black/5 px-3 py-1 text-xl dark:bg-white/10"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleCreateAccount} className="space-y-5">
          <div>
            <label className="text-sm text-slate-600 dark:text-gray-300">
              Currency
            </label>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none focus:border-purple-500 dark:border-white/10 dark:bg-[#111827]"
            >
              <option value="INR">INR - Indian Rupee</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>

          <button
            disabled={creatingAccount}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 font-semibold text-white disabled:opacity-60"
          >
            {creatingAccount ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAccountModal;

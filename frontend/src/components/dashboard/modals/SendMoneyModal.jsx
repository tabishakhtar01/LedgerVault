import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

function SendMoneyModal({ open, onClose, accounts, onSuccess }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const isSystemUser = user?.email === "aestheticfever01@gmail.com";

  const title = isSystemUser ? "Deposit Money" : "Send Money";

  if (!open) return null;

  async function handleSendMoney(e) {
    e.preventDefault();

    if (!fromAccount || !toAccount || !amount) {
      toast.error("All fields are required");
      return;
    }

    if (fromAccount === toAccount) {
      toast.error("Sender and receiver account cannot be same");
      return;
    }

    if (Number(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    try {
      setSending(true);

      const idempotencyKey = crypto.randomUUID();

      const endpoint = isSystemUser
        ? "/transactions/system/initial-transaction"
        : "/transactions";

      const response = await api.post(endpoint, {
        fromAccount,
        toAccount,
        amount: Number(amount),
        idempotencyKey,
      });

      toast.success(response.data.message || "Transaction successful");

      setFromAccount("");
      setToAccount("");
      setAmount("");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Transaction failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0B1020]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              {isSystemUser
                ? "Deposit money into user accounts securely."
                : "Transfer funds securely between accounts."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-black/5 px-3 py-1 text-xl dark:bg-white/10"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSendMoney} className="space-y-5">
          <div>
            <label className="text-sm text-slate-600 dark:text-gray-300">
              From Account
            </label>

            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none focus:border-purple-500 dark:border-white/10 dark:bg-[#111827]"
            >
              <option value="">Select your account</option>

              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account._id} — ₹{account.balance.toLocaleString("en-IN")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600 dark:text-gray-300">
              Receiver Account ID
            </label>

            <input
              type="text"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              placeholder="Enter receiver account ID"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none focus:border-purple-500 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 dark:text-gray-300">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none focus:border-purple-500 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <button
            disabled={sending}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 font-semibold text-white disabled:opacity-60"
          >
            {sending ? "Processing..." : title}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendMoneyModal;

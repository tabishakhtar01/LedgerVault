import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#050816] dark:text-white">
      <nav className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <h1 className="text-3xl font-bold">
          Ledger<span className="text-purple-500">Vault</span>
        </h1>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            onClick={() => navigate("/api/auth/login")}
            className="hidden rounded-full border border-black/10 px-5 py-2 text-sm font-medium hover:border-purple-500 dark:border-white/10 sm:block"
          >
            Login
          </button>
        </div>
      </nav>

      <section className="relative grid min-h-[calc(100vh-96px)] items-center gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-[-120px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 space-y-8">
          <div className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-500">
            Modern Ledger Banking System
          </div>

          <h2 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Your Money.
            <br />
            Your Control.
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Your Future.
            </span>
          </h2>

          <p className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-gray-400">
            LedgerVault helps you manage accounts, track balances, and transfer
            money through a secure ledger-based banking system.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/api/auth/register")}
              className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-1 hover:opacity-90"
            >
              Create Account
            </button>

            <button
              onClick={() => navigate("/api/auth/login")}
              className="rounded-2xl border border-black/10 bg-white px-8 py-4 font-semibold transition-all hover:-translate-y-1 hover:border-purple-500 dark:border-white/10 dark:bg-white/5"
            >
              Login
            </button>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-4 pt-6">
            {[
              ["Secure", "JWT Auth"],
              ["Fast", "Ledger APIs"],
              ["Smart", "Live Balance"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-bold text-purple-500">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-md rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-slate-950 p-6 text-white">
              <p className="text-sm text-white/70">Current Balance</p>
              <h3 className="mt-3 text-5xl font-bold">₹1,25,000</h3>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-white/60">Credit</p>
                  <p className="mt-1 text-xl font-bold">₹80,000</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-white/60">Debit</p>
                  <p className="mt-1 text-xl font-bold">₹25,000</p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["CREDIT", "+ ₹20,000", "Salary Deposit"],
                ["DEBIT", "- ₹5,000", "Money Transfer"],
                ["CREDIT", "+ ₹10,000", "System Deposit"],
              ].map(([type, amount, label]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p
                      className={`text-sm ${
                        type === "CREDIT" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {type}
                    </p>
                  </div>

                  <p
                    className={`font-bold ${
                      type === "CREDIT" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;

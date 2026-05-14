import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import ThemeToggle from "../components/ThemeToggle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(response.data.message || "Login successful");
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex bg-white text-slate-950 dark:bg-black dark:text-white">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden border-r border-black/10 dark:border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-purple-100 to-white dark:from-[#0B1020] dark:via-[#140F2D] dark:to-black" />
        <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <h1 className="text-4xl font-bold">
            Ledger<span className="text-purple-500">Vault</span>
          </h1>

          <div className="space-y-6">
            <h2 className="text-6xl leading-tight font-bold">
              Welcome
              <br />
              back to your
              <br />
              <span className="text-purple-500">financial vault.</span>
            </h2>

            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-lg">
              Login securely to manage your accounts, check balances, and make
              ledger-based transactions.
            </p>
          </div>

          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-slate-700 dark:text-gray-300 text-lg">
              “Do not save what is left after spending, but spend what is left
              after saving.”
            </p>
            <p className="text-purple-500 mt-3">— Warren Buffett</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-[#050816]">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-lg">
          <div className="mb-10">
            <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">
              Don&apos;t have an account?
              <span
                onClick={() => navigate("/api/auth/register")}
                className="text-purple-500 cursor-pointer ml-2"
              >
                Create account
              </span>
            </p>

            <h1 className="text-5xl font-bold">
              Sign in to
              <span className="text-purple-500"> LedgerVault</span>
            </h1>

            <p className="text-slate-500 dark:text-gray-400 mt-4 text-lg">
              Continue managing your money securely.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-slate-700 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-slate-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white hover:opacity-90 transition-all">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-gray-500 mt-8">
            Your session is protected with secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import { useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const response = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       toast.success("Account created successfully");

//       navigate("/login");
//     } catch (error) {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-black text-white flex">
//       {/* LEFT SECTION */}

//       <div className="hidden lg:flex w-1/2 relative overflow-hidden border-r border-white/10">
//         {/* Background */}

//         <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#140F2D] to-[#000000]" />

//         {/* Glow */}

//         <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-purple-700/20 blur-3xl" />

//         <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-blue-700/20 blur-3xl" />

//         {/* Content */}

//         <div className="relative z-10 flex flex-col justify-between p-14 w-full">
//           {/* Logo */}

//           <div>
//             <h1 className="text-4xl font-bold tracking-tight">
//               Ledger
//               <span className="text-purple-500">Vault</span>
//             </h1>
//           </div>

//           {/* Main Text */}

//           <div className="space-y-8">
//             <div>
//               <h2 className="text-6xl leading-tight font-bold">
//                 Your Money.
//                 <br />
//                 Your Control.
//                 <br />
//                 <span className="text-purple-500">Your Future.</span>
//               </h2>
//             </div>

//             <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
//               LedgerVault helps you manage transactions, accounts, and finances
//               securely with modern banking infrastructure.
//             </p>
//           </div>

//           {/* Bottom Cards */}

//           <div className="grid grid-cols-3 gap-4">
//             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
//               <h3 className="font-semibold text-lg">Security</h3>

//               <p className="text-sm text-gray-400 mt-2">
//                 Bank-grade encrypted transactions.
//               </p>
//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
//               <h3 className="font-semibold text-lg">Analytics</h3>

//               <p className="text-sm text-gray-400 mt-2">
//                 Track balances and transaction insights.
//               </p>
//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
//               <h3 className="font-semibold text-lg">Reliable</h3>

//               <p className="text-sm text-gray-400 mt-2">
//                 Built with secure ledger architecture.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SECTION */}

//       <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#050816]">
//         <div className="w-full max-w-lg">
//           {/* Top */}

//           <div className="mb-10">
//             <p className="text-sm text-gray-400 mb-4">
//               Already have an account?
//               <span className="text-purple-500 cursor-pointer ml-2">
//                 Sign in
//               </span>
//             </p>

//             <h1 className="text-5xl font-bold leading-tight">
//               Create your
//               <span className="text-purple-500"> account</span>
//             </h1>

//             <p className="text-gray-400 mt-4 text-lg">
//               Join LedgerVault and manage your finances securely.
//             </p>
//           </div>

//           {/* Form */}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="text-sm text-gray-300">Full Name</label>

//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-300">Email Address</label>

//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-300">Password</label>

//               <input
//                 type="password"
//                 placeholder="Create password"
//                 className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold hover:opacity-90 transition-all">
//               Create Account
//             </button>
//           </form>

//           {/* Footer */}

//           <p className="text-center text-sm text-gray-500 mt-8">
//             Your data is encrypted and secured.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import ThemeToggle from "../components/ThemeToggle";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(response.data.message || "Account created successfully");
      navigate("/api/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
              Start your
              <br />
              secure banking
              <br />
              <span className="text-purple-500">journey.</span>
            </h2>

            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-lg">
              Create your LedgerVault account and experience secure ledger-based
              banking with smart transaction tracking.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Secure</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                Protected auth flow.
              </p>
            </div>

            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Ledger</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                Accurate balance history.
              </p>
            </div>

            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Fast</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                Smooth transactions.
              </p>
            </div>
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
              Already have an account?
              <span
                onClick={() => navigate("/api/auth/login")}
                className="text-purple-500 cursor-pointer ml-2"
              >
                Sign in
              </span>
            </p>

            <h1 className="text-5xl font-bold">
              Create your
              <span className="text-purple-500"> account</span>
            </h1>

            <p className="text-slate-500 dark:text-gray-400 mt-4 text-lg">
              Join LedgerVault and manage your finances securely.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-slate-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="mt-2 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Create password"
                className="mt-2 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4 outline-none focus:border-purple-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white hover:opacity-90 transition-all">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-gray-500 mt-8">
            Your data is encrypted and secured.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

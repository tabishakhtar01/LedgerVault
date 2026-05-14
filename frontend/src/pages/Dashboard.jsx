import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import api from "../api/axios";
import toast from "react-hot-toast";

import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import AccountSummary from "../components/dashboard/AccountSummary";

import SendMoneyModal from "../components/dashboard/modals/SendMoneyModal";
import AddAccountModal from "../components/dashboard/modals/AddAccountModal";
import StatementModal from "../components/dashboard/modals/StatementModal";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = [
    { name: "Dashboard", sectionId: "dashboard" },
    { name: "Quick Actions", sectionId: "quick-actions" },
    { name: "Account Summary", sectionId: "account-summary" },
  ];

  useEffect(() => {
    fetchAccountsAndBalance();
  }, []);

  async function fetchAccountsAndBalance() {
    try {
      setLoading(true);

      const accountsRes = await api.get("/accounts");
      const userAccounts = accountsRes.data.accounts || [];

      const accountsWithBalance = await Promise.all(
        userAccounts.map(async (account) => {
          const balanceRes = await api.get(`/accounts/${account._id}/balance`);

          return {
            ...account,
            balance: balanceRes.data.balance || 0,
          };
        }),
      );

      const cumulativeBalance = accountsWithBalance.reduce(
        (total, account) => total + account.balance,
        0,
      );

      setAccounts(accountsWithBalance);
      setTotalBalance(cumulativeBalance);
    } catch (error) {
      if (error.response?.status === 404) {
        setAccounts([]);
        setTotalBalance(0);
        return;
      }

      toast.error(error.response?.data?.message || "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#050816] dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-72 flex-col border-r border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="p-6">
            <h1 className="text-3xl font-bold">
              Ledger<span className="text-purple-500">Vault</span>
            </h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition-all hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4">
            <button className="w-full rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/20">
              Logout
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            <aside className="relative z-50 h-full w-72 bg-white p-6 dark:bg-[#0B1020]">
              <h1 className="mb-8 text-3xl font-bold">
                Ledger<span className="text-purple-500">Vault</span>
              </h1>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.sectionId)}
                    className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-300"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/10 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#050816]/80 sm:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-black/10 px-3 py-2 dark:border-white/10 lg:hidden"
            >
              ☰
            </button>

            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Dashboard</h2>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Welcome back to your financial vault.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold text-white sm:flex">
                {user?.name?.[0] || "U"}
              </div>
            </div>
          </header>

          <section className="space-y-8 p-4 sm:p-8">
            <section id="dashboard" className="scroll-mt-28 space-y-6">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {user?.name || "User"} 👋
                </h1>

                <p className="mt-2 text-slate-500 dark:text-gray-400">
                  Manage your banking activity securely from one place.
                </p>
              </div>

              <BalanceCard
                loading={loading}
                totalBalance={totalBalance}
                accounts={accounts}
              />
            </section>

            <QuickActions
              onSendMoney={() => setSendMoneyOpen(true)}
              onAddAccount={() => setAddAccountOpen(true)}
              onViewStatement={() => setStatementOpen(true)}
            />

            <AccountSummary accounts={accounts} loading={loading} />
          </section>
        </main>
      </div>

      <SendMoneyModal
        open={sendMoneyOpen}
        onClose={() => setSendMoneyOpen(false)}
        accounts={accounts}
        onSuccess={fetchAccountsAndBalance}
      />

      <AddAccountModal
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        onSuccess={fetchAccountsAndBalance}
      />

      <StatementModal
        open={statementOpen}
        onClose={() => setStatementOpen(false)}
        accounts={accounts}
      />
    </div>
  );
}

export default Dashboard;

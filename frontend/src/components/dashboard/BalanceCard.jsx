function BalanceCard({ loading, totalBalance, accounts }) {
  return (
    <section id="dashboard" className="scroll-mt-28 space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm text-white/70">Cumulative Balance</p>

          <h2 className="mt-3 text-5xl font-bold">
            {loading
              ? "Loading..."
              : `₹${totalBalance.toLocaleString("en-IN")}`}
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              {accounts.length} Account{accounts.length !== 1 ? "s" : ""}
            </span>

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              INR
            </span>

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              Ledger Based Balance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BalanceCard;

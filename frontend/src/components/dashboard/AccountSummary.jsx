function AccountSummary({ accounts, loading }) {
  return (
    <section id="account-summary" className="scroll-mt-28">
      <h2 className="mb-4 text-xl font-semibold">Account Summary</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {accounts.map((account) => (
          <div
            key={account._id}
            className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Account ID
            </p>

            <h3 className="mt-3 break-all text-lg font-bold">{account._id}</h3>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
                {account.status}
              </span>

              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-500">
                {account.currency}
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500 dark:text-gray-400">
              Balance
            </p>

            <h4 className="mt-2 text-2xl font-bold">
              ₹{account.balance.toLocaleString("en-IN")}
            </h4>
          </div>
        ))}
      </div>

      {!loading && accounts.length === 0 && (
        <div className="rounded-3xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-semibold">No account found</h3>
          <p className="mt-2 text-slate-500 dark:text-gray-400">
            Create your first account to start using LedgerVault.
          </p>
        </div>
      )}
    </section>
  );
}

export default AccountSummary;

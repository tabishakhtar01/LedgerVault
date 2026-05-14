function QuickActions({ onSendMoney, onAddAccount, onViewStatement }) {
  const actions = [
    {
      title: "Send Money",
      icon: "↗",
      description: "Transfer funds securely using ledger-backed transactions.",
      onClick: onSendMoney,
    },
    {
      title: "Add Account",
      icon: "＋",
      description: "Create a new account linked to your user profile.",
      onClick: onAddAccount,
    },
    {
      title: "View Statement",
      icon: "📄",
      description: "View your account ledger and transaction history.",
      onClick: onViewStatement,
    },
  ];

  return (
    <section id="quick-actions" className="scroll-mt-28">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className="rounded-3xl border border-black/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-purple-500 dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-2xl">{action.icon}</p>
            <h3 className="mt-4 text-lg font-semibold">{action.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;

"use client";

import { BankProvider } from "@/context/BankContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickActions from "@/components/QuickActions";
import BankCard from "@/components/BankCard";
import AddBankSection from "@/components/AddBankSection";
import { useBanks } from "@/context/BankContext";
import { formatCurrency } from "@/lib/utils";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";

function DashboardContent() {
  const { banks, totalBalance, transactions, TAX_RATE } = useBanks();

  const totalTax     = totalBalance * TAX_RATE;
  const recentTxs    = transactions.slice(0, 4);
  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const totalDebits  = transactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 page-enter">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Wallet size={18} />}
            label="Total Balance"
            value={formatCurrency(totalBalance)}
            color="indigo"
          />
          <StatCard
            icon={<ArrowUpRight size={18} />}
            label="Total Income"
            value={formatCurrency(totalCredits)}
            color="emerald"
          />
          <StatCard
            icon={<ArrowDownLeft size={18} />}
            label="Total Spent"
            value={formatCurrency(totalDebits)}
            color="rose"
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Est. Tax (5%)"
            value={formatCurrency(totalTax)}
            color="amber"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Bank Accounts */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              My Bank Accounts
            </h2>
            <span className="pill bg-slate-100 text-slate-500">
              {banks.length} linked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {banks.map((bank, i) => (
              <BankCard key={bank.id} bank={bank} index={i} />
            ))}
          </div>

          {/* Add Bank Section */}
          <AddBankSection />
        </section>

        {/* Recent Transactions */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Recent Transactions
            </h2>
            <a href="/transactions" className="text-sm text-indigo-500 font-semibold hover:text-indigo-700 transition-colors">
              View all →
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-slate-100 divide-y divide-slate-50">
            {recentTxs.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    indigo:  "bg-indigo-50  text-indigo-600  border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose:    "bg-rose-50    text-rose-600    border-rose-100",
    amber:   "bg-amber-50   text-amber-600   border-amber-100",
  };
  return (
    <div className={`rounded-2xl border p-4 ${colors[color]} card-lift`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</span>
      </div>
      <p className="number-display text-lg font-bold">{value}</p>
    </div>
  );
}

function TransactionRow({ tx }) {
  const isCredit = tx.type === "credit";
  return (
    <div className="flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isCredit ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
        }`}>
          {isCredit ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{tx.desc}</p>
          <p className="text-xs text-slate-400">{tx.bank} · {tx.date}</p>
        </div>
      </div>
      <p className={`number-display text-sm font-bold ${isCredit ? "text-emerald-600" : "text-rose-500"}`}>
        {isCredit ? "+" : "-"}৳{tx.amount.toLocaleString()}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <BankProvider>
      <DashboardContent />
    </BankProvider>
  );
}

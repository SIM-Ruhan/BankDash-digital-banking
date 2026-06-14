"use client";

import { BankProvider, useBanks } from "@/context/BankContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatCurrency, maskAccountNo } from "@/lib/utils";
import Link from "next/link";
import {
  ChevronLeft, User, Mail, Phone, Landmark,
  Shield, CreditCard, TrendingUp,
} from "lucide-react";

function ProfileContent() {
  const { user, banks, totalBalance, transactions } = useBanks();

  const totalCredits = transactions.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalDebits  = transactions.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="max-w-2xl mx-auto page-enter">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-medium"
      >
        <ChevronLeft size={16} /> Back to Dashboard
      </Link>

      {/* Profile header */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden mb-5">
        <div className="h-24 gradient-primary relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl gradient-primary border-4 border-white flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {user.initials}
              </span>
            </div>
          </div>
        </div>
        <div className="pt-14 px-6 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {user.name}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">Premium Account</p>
            </div>
            <span className="pill bg-emerald-100 text-emerald-600 flex items-center gap-1">
              <Shield size={9} /> Verified
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatBox label="Linked Banks" value={banks.length} icon={<Landmark size={15} />} />
        <StatBox label="Total Balance" value={formatCurrency(totalBalance)} icon={<TrendingUp size={15} />} mono />
        <StatBox label="Transactions" value={transactions.length} icon={<CreditCard size={15} />} />
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 mb-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <User size={14} className="text-indigo-500" /> Personal Information
        </h2>
        <div className="space-y-3">
          <InfoRow icon={<Mail size={14} />}  label="Email"  value={user.email} />
          <InfoRow icon={<Phone size={14} />} label="Phone"  value={user.phone} />
          <InfoRow icon={<Shield size={14} />} label="Status" value="Active · Verified" green />
        </div>
      </div>

      {/* Linked banks */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 mb-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <Landmark size={14} className="text-indigo-500" /> Linked Banks
        </h2>
        <div className="space-y-3">
          {banks.map((bank, i) => (
            <div key={bank.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{bank.bankName}</p>
                  <p className="text-xs number-display text-slate-400">{maskAccountNo(bank.accountNo)}</p>
                </div>
              </div>
              <p className="number-display text-sm font-bold text-slate-700">{formatCurrency(bank.balance)}</p>
            </div>
          ))}
        </div>

        <Link
          href="/add-bank"
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
            border-2 border-dashed border-indigo-200 text-indigo-500 text-sm font-semibold
            hover:border-indigo-400 hover:bg-indigo-50 transition-all"
        >
          + Add Another Bank
        </Link>
      </div>

      {/* Financial summary */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <TrendingUp size={14} className="text-indigo-500" /> Financial Overview
        </h2>
        <div className="space-y-3">
          <InfoRow icon={<TrendingUp size={14} className="text-emerald-500" />} label="Total Credited" value={formatCurrency(totalCredits)} green />
          <InfoRow icon={<TrendingUp size={14} className="rotate-180 text-rose-500" />} label="Total Debited" value={formatCurrency(totalDebits)} red />
          <InfoRow icon={<CreditCard size={14} />} label="Net Balance" value={formatCurrency(totalBalance)} />
          <InfoRow icon={<Shield size={14} className="text-amber-500" />} label="Est. Tax (5%)" value={formatCurrency(totalBalance * 0.05)} amber />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon, mono }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 text-center">
      <div className="flex justify-center mb-1.5 text-indigo-500">{icon}</div>
      <p className={`font-bold text-slate-800 text-sm ${mono ? "number-display text-xs" : ""}`}>{value}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

function InfoRow({ icon, label, value, green, red, amber }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs text-slate-500 font-medium">{label}</span>
      </div>
      <span className={`text-sm font-semibold ${
        green ? "text-emerald-600" : red ? "text-rose-500" : amber ? "text-amber-600" : "text-slate-800"
      }`}>
        {value}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <BankProvider>
      <div className="flex flex-col min-h-screen bg-surface-50">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <ProfileContent />
        </main>
        <Footer />
      </div>
    </BankProvider>
  );
}

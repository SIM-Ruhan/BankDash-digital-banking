"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BankProvider, useBanks } from "@/context/BankContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BANK_LIST } from "@/lib/utils";
import {
  ChevronLeft, Landmark, ChevronDown, User, CreditCard,
  Lock, Wallet, CheckCircle2, AlertCircle,
} from "lucide-react";

function AddBankForm() {
  const { addBank } = useBanks();
  const router      = useRouter();

  const [form, setForm] = useState({
    bankName:      "",
    accountHolder: "",
    accountNo:     "",
    password:      "",
    balance:       "",
  });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  function validate() {
    const errs = {};
    if (!form.bankName)      errs.bankName      = "Please select a bank.";
    if (!form.accountHolder) errs.accountHolder = "Account holder name is required.";
    if (!form.accountNo || form.accountNo.length < 10)
      errs.accountNo = "Enter a valid account number (min 10 digits).";
    if (!form.password || form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (!form.balance || isNaN(form.balance) || Number(form.balance) <= 0)
      errs.balance = "Enter a valid balance amount.";
    return errs;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      addBank({
        bankName:      form.bankName,
        accountHolder: form.accountHolder,
        accountNo:     form.accountNo,
        balance:       Number(form.balance),
      });
      setSubmitted(true);
      setTimeout(() => router.push("/"), 1800);
    }, 1000);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 page-enter">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5 shadow-lg">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Bank Linked!
        </h2>
        <p className="text-slate-500 text-center max-w-xs">
          <strong>{form.bankName}</strong> has been added to your dashboard. Redirecting…
        </p>
        <div className="mt-6 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-400"
              style={{ animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto page-enter">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-medium"
      >
        <ChevronLeft size={16} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md">
          <Landmark size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Add New Bank
          </h1>
          <p className="text-sm text-slate-400">Link a bank account to your dashboard</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 mb-6">
        <AlertCircle size={16} className="text-indigo-500 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-600 leading-relaxed">
          Your credentials are encrypted and never stored in plain text. This is a demo — use test data only.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 space-y-5">

        {/* Bank selector */}
        <Field label="Select Bank" icon={<Landmark size={16} />} error={errors.bankName}>
          <div className="relative">
            <select
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              className={`w-full appearance-none bg-surface-50 border rounded-xl px-4 py-3 text-sm text-slate-800 pr-10 transition-all
                ${errors.bankName ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-indigo-400"}`}
            >
              <option value="">-- Choose your bank --</option>
              {BANK_LIST.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </Field>

        {/* Account holder */}
        <Field label="Account Holder Name" icon={<User size={16} />} error={errors.accountHolder}>
          <input
            type="text"
            name="accountHolder"
            value={form.accountHolder}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full bg-surface-50 border rounded-xl px-4 py-3 text-sm text-slate-800 transition-all
              ${errors.accountHolder ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-indigo-400"}`}
          />
        </Field>

        {/* Account number */}
        <Field label="Account Number" icon={<CreditCard size={16} />} error={errors.accountNo}>
          <input
            type="text"
            name="accountNo"
            value={form.accountNo}
            onChange={handleChange}
            placeholder="e.g. 2054100012345"
            maxLength={20}
            className={`w-full bg-surface-50 border rounded-xl px-4 py-3 text-sm font-mono text-slate-800 transition-all
              ${errors.accountNo ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-indigo-400"}`}
          />
        </Field>

        {/* Password */}
        <Field label="Banking Password" icon={<Lock size={16} />} error={errors.password}>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your bank password"
            className={`w-full bg-surface-50 border rounded-xl px-4 py-3 text-sm text-slate-800 transition-all
              ${errors.password ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-indigo-400"}`}
          />
        </Field>

        {/* Balance */}
        <Field label="Current Balance (৳)" icon={<Wallet size={16} />} error={errors.balance}>
          <input
            type="number"
            name="balance"
            value={form.balance}
            onChange={handleChange}
            placeholder="e.g. 50000"
            min="0"
            className={`w-full bg-surface-50 border rounded-xl px-4 py-3 text-sm font-mono text-slate-800 transition-all
              ${errors.balance ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-indigo-400"}`}
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-primary text-white font-semibold py-3.5 rounded-xl
            hover:opacity-90 active:scale-[0.98] transition-all shadow-md hover:shadow-glow
            disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
              </svg>
              Linking Account…
            </>
          ) : (
            "Link Bank Account"
          )}
        </button>
      </form>
    </div>
  );
}

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
        <span className="text-slate-400">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

export default function AddBankPage() {
  return (
    <BankProvider>
      <div className="flex flex-col min-h-screen bg-surface-50">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <AddBankForm />
        </main>
        <Footer />
      </div>
    </BankProvider>
  );
}

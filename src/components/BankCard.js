"use client";

import { formatCurrency, maskAccountNo } from "@/lib/utils";
import { Wifi, CreditCard } from "lucide-react";

export default function BankCard({ bank, index }) {
  const colorClass = `bank-card-${bank.color ?? index % 6}`;

  return (
    <div
      className={`${colorClass} card-lift rounded-2xl p-5 text-white relative overflow-hidden cursor-default select-none`}
      style={{ minHeight: 160 }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white opacity-5" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white opacity-5" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-0.5">
            Bank
          </p>
          <p className="text-sm font-semibold text-white leading-tight">
            {bank.bankName}
          </p>
        </div>
        <Wifi size={18} className="text-white/40 rotate-90" />
      </div>

      {/* Account number */}
      <p className="number-display text-xs text-white/40 tracking-[0.2em] mb-3">
        {maskAccountNo(bank.accountNo)}
      </p>

      {/* Balance */}
      <p className="number-display text-2xl font-bold text-white mb-3">
        {formatCurrency(bank.balance)}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-white/40">
            Account Holder
          </p>
          <p className="text-xs font-medium text-white/80 mt-0.5">
            {bank.accountHolder}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CreditCard size={14} className="text-white/30" />
          <span className="text-[10px] text-white/30 font-medium">Savings</span>
        </div>
      </div>
    </div>
  );
}

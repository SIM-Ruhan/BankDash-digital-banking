"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeftRight, Smartphone, QrCode, FileText,
  PiggyBank, Building2, ShieldCheck, Car,
  Heart, Calculator,
} from "lucide-react";

const ACTIONS = [
  { label: "Balance Transfer", icon: ArrowLeftRight, color: "indigo",  href: null,                  action: "transfer" },
  { label: "Mobile Recharge",  icon: Smartphone,     color: "sky",     href: null,                  action: "recharge" },
  { label: "Payment",          icon: QrCode,         color: "violet",  href: null,                  action: "payment" },
  { label: "Pay Bill",         icon: FileText,       color: "amber",   href: null,                  action: "bill" },
  { label: "Savings",          icon: PiggyBank,      color: "emerald", href: null,                  action: "savings" },
  { label: "Loan",             icon: Building2,      color: "rose",    href: null,                  action: "loan" },
  { label: "Insurance",        icon: ShieldCheck,    color: "teal",    href: null,                  action: "insurance" },
  { label: "Toll",             icon: Car,            color: "orange",  href: null,                  action: "toll" },
  { label: "Donation",         icon: Heart,          color: "pink",    href: null,                  action: "donation" },
  { label: "Tax Calculation",  icon: Calculator,     color: "indigo",  href: "/tax-calculation",    action: null },
];

const COLOR_MAP = {
  indigo:  { bg: "bg-indigo-50  hover:bg-indigo-100",  icon: "bg-indigo-100  text-indigo-600",  label: "text-indigo-700"  },
  sky:     { bg: "bg-sky-50     hover:bg-sky-100",     icon: "bg-sky-100     text-sky-600",     label: "text-sky-700"     },
  violet:  { bg: "bg-violet-50  hover:bg-violet-100",  icon: "bg-violet-100  text-violet-600",  label: "text-violet-700"  },
  amber:   { bg: "bg-amber-50   hover:bg-amber-100",   icon: "bg-amber-100   text-amber-600",   label: "text-amber-700"   },
  emerald: { bg: "bg-emerald-50 hover:bg-emerald-100", icon: "bg-emerald-100 text-emerald-600", label: "text-emerald-700" },
  rose:    { bg: "bg-rose-50    hover:bg-rose-100",    icon: "bg-rose-100    text-rose-600",    label: "text-rose-700"    },
  teal:    { bg: "bg-teal-50    hover:bg-teal-100",    icon: "bg-teal-100    text-teal-600",    label: "text-teal-700"    },
  orange:  { bg: "bg-orange-50  hover:bg-orange-100",  icon: "bg-orange-100  text-orange-600",  label: "text-orange-700"  },
  pink:    { bg: "bg-pink-50    hover:bg-pink-100",    icon: "bg-pink-100    text-pink-600",    label: "text-pink-700"    },
};

function handleServiceAction(action) {
  const MESSAGES = {
    transfer:  "Balance Transfer — Select source & destination bank.",
    recharge:  "Mobile Recharge — Enter your number and amount.",
    payment:   "Scan QR or enter merchant code to pay.",
    bill:      "Choose your utility provider and pay bill.",
    savings:   "Set up a savings goal with auto-deduction.",
    loan:      "View loan offers based on your balance.",
    insurance: "Browse insurance plans linked to your accounts.",
    toll:      "Recharge your toll wallet instantly.",
    donation:  "Donate to a charity of your choice.",
  };
  alert(MESSAGES[action] || "Coming soon!");
}

export default function QuickActions() {
  const router = useRouter();

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Quick Actions
        </h2>
        <span className="pill bg-indigo-100 text-indigo-600">10 services</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {ACTIONS.map((action) => {
          const theme  = COLOR_MAP[action.color] || COLOR_MAP.indigo;
          const Icon   = action.icon;
          const isLast = action.label === "Tax Calculation";

          return (
            <button
              key={action.label}
              onClick={() =>
                action.href ? router.push(action.href) : handleServiceAction(action.action)
              }
              className={`quick-action flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border border-transparent
                ${theme.bg} ${isLast ? "ring-2 ring-indigo-200" : ""}
                transition-all duration-200`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${theme.icon} shadow-sm`}>
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <span className={`text-xs font-semibold text-center leading-tight ${theme.label}`}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

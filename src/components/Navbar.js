"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBanks } from "@/context/BankContext";
import { formatCurrency } from "@/lib/utils";
import {
  Landmark, ChevronDown, User, Receipt, LogOut,
  TrendingUp, Bell,
} from "lucide-react";

export default function Navbar() {
  const { totalBalance, user } = useBanks();
  const [open, setOpen]       = useState(false);
  const [notif, setNotif]     = useState(false);
  const dropRef = useRef(null);
  const router  = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    setOpen(false);
    alert("Logged out successfully. (Demo)");
  }

  return (
    <nav className="glass-nav sticky top-0 z-50 shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-200">
              <Landmark size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Bank<span className="text-indigo-500">Dash</span>
              </span>
              <p className="text-[10px] text-slate-400 leading-none -mt-0.5 font-medium tracking-wide">
                All banks. One place.
              </p>
            </div>
          </Link>

          {/* CENTER — Total Balance */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={13} className="text-emerald-500" />
              <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                Total Balance
              </span>
            </div>
            <p
              className="number-display text-xl sm:text-2xl font-bold text-slate-800 animate-count"
              key={totalBalance}
            >
              {formatCurrency(totalBalance)}
            </p>
          </div>

          {/* RIGHT — Notification + Profile */}
          <div className="flex items-center gap-3">

            {/* Notification bell */}
            <button
              onClick={() => setNotif(!notif)}
              className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 flex items-center justify-center transition-colors"
            >
              <Bell size={16} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {user.initials}
                </div>
                <span className="hidden md:block text-sm font-semibold text-slate-700">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="dropdown-enter absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">

                  {/* User info header */}
                  <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                  </div>

                  {/* Menu items */}
                  <div className="py-2">
                    <DropItem
                      icon={<User size={15} />}
                      label="See Profile"
                      onClick={() => { setOpen(false); router.push("/profile"); }}
                    />
                    <DropItem
                      icon={<Receipt size={15} />}
                      label="Transactions"
                      onClick={() => { setOpen(false); router.push("/transactions"); }}
                    />
                    <div className="my-1 border-t border-slate-100" />
                    <DropItem
                      icon={<LogOut size={15} />}
                      label="Log Out"
                      danger
                      onClick={handleLogout}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function DropItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
        ${danger
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
        }`}
    >
      <span className={danger ? "text-red-400" : "text-slate-400"}>{icon}</span>
      {label}
    </button>
  );
}

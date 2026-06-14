"use client";

import { createContext, useContext, useState } from "react";

const BankContext = createContext(null);

const DEFAULT_BANKS = [
  {
    id: "1",
    bankName: "Dutch-Bangla Bank",
    accountHolder: "Zakaria Rupto",
    accountNo: "2054100012345",
    balance: 125000,
    color: 0,
  },
  {
    id: "2",
    bankName: "BRAC Bank",
    accountHolder: "Zakaria Ahmed",
    accountNo: "1502300067890",
    balance: 87500,
    color: 1,
  },
  {
    id: "3",
    bankName: "Islami Bank",
    accountHolder: "Rupto Ahmed",
    accountNo: "2010500034567",
    balance: 210000,
    color: 2,
  },
];

const MOCK_USER = {
  name: "Rupto Islam",
  email: "rupto.ahmed@email.com",
  phone: "+880 1712-345678",
  avatar: null,
  initials: "ZR",
};

const MOCK_TRANSACTIONS = [
  { id: "t1", type: "credit", bank: "Dutch-Bangla Bank", desc: "Salary Credit",       amount: 55000,  date: "2025-06-01" },
  { id: "t2", type: "debit",  bank: "BRAC Bank",         desc: "Utility Bill",        amount: 3200,   date: "2025-06-03" },
  { id: "t3", type: "debit",  bank: "Dutch-Bangla Bank", desc: "Mobile Recharge",     amount: 500,    date: "2025-06-05" },
  { id: "t4", type: "credit", bank: "Islami Bank",       desc: "Fund Transfer In",    amount: 20000,  date: "2025-06-07" },
  { id: "t5", type: "debit",  bank: "Islami Bank",       desc: "Insurance Premium",   amount: 8500,   date: "2025-06-08" },
  { id: "t6", type: "debit",  bank: "BRAC Bank",         desc: "Online Shopping",     amount: 4750,   date: "2025-06-10" },
  { id: "t7", type: "credit", bank: "BRAC Bank",         desc: "Freelance Payment",   amount: 32000,  date: "2025-06-12" },
  { id: "t8", type: "debit",  bank: "Dutch-Bangla Bank", desc: "Restaurant Payment",  amount: 1800,   date: "2025-06-13" },
];

export function BankProvider({ children }) {
  const [banks, setBanks]               = useState(DEFAULT_BANKS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [user]                          = useState(MOCK_USER);

  const totalBalance = banks.reduce((sum, b) => sum + b.balance, 0);
  const TAX_RATE = 0.05;

  function addBank(bankData) {
    const newBank = {
      ...bankData,
      id:    Date.now().toString(),
      color: banks.length % 6,
    };
    setBanks((prev) => [...prev, newBank]);

    const newTx = {
      id:     "t" + Date.now(),
      type:   "credit",
      bank:   bankData.bankName,
      desc:   "Account Linked",
      amount: bankData.balance,
      date:   new Date().toISOString().split("T")[0],
    };
    setTransactions((prev) => [newTx, ...prev]);
  }

  function addTransaction(tx) {
    setTransactions((prev) => [tx, ...prev]);
  }

  return (
    <BankContext.Provider
      value={{ banks, totalBalance, user, transactions, addBank, addTransaction, TAX_RATE }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBanks() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBanks must be used within BankProvider");
  return ctx;
}

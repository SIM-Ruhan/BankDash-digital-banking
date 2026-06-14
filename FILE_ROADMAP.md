# BankFlow — File Roadmap

## Project: Next.js Banking Dashboard (App Router, JavaScript)

---

## Directory Tree

```
bankflow/
├── package.json                          # Dependencies & scripts
├── next.config.js                        # Next.js configuration
├── tailwind.config.js                    # Tailwind CSS theme & colors
├── postcss.config.js                     # PostCSS (required for Tailwind)
│
└── src/
    ├── app/                              # Next.js App Router
    │   ├── layout.js                     # Root layout (HTML shell + metadata)
    │   ├── globals.css                   # Global styles, Google Fonts, animations
    │   ├── page.js                       # Home / Dashboard page
    │   │
    │   ├── add-bank/
    │   │   └── page.js                   # Add Bank form page
    │   │
    │   ├── tax-calculation/
    │   │   └── page.js                   # Tax breakdown + Pay/Download
    │   │
    │   ├── transactions/
    │   │   └── page.js                   # All transactions with filters
    │   │
    │   └── profile/
    │       └── page.js                   # User profile + bank summary
    │
    ├── components/                       # Reusable UI components
    │   ├── Navbar.js                     # Sticky nav: logo | balance | profile
    │   ├── Footer.js                     # Footer with links & branding
    │   ├── BankCard.js                   # Dark credit-card style bank tile
    │   ├── QuickActions.js               # 10-button service grid
    │   └── AddBankSection.js             # Dashed "Add Bank" CTA card
    │
    ├── context/
    │   └── BankContext.js                # Global state: banks, transactions, user
    │
    └── lib/
        └── utils.js                      # formatCurrency, maskAccountNo, BANK_LIST
```

---

## File-by-File Breakdown

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | next@14, react@18, lucide-react. Run `npm install` then `npm run dev`. |
| `next.config.js` | Minimal Next.js config (empty, extendable). |
| `tailwind.config.js` | Custom palette (indigo/violet/emerald), Plus Jakarta Sans + DM Sans fonts, card shadows. |
| `postcss.config.js` | Wires Tailwind + Autoprefixer into the CSS pipeline. |

---

### App Router Pages (`src/app/`)

| File | Route | What It Does |
|------|-------|--------------|
| `layout.js` | — | Sets `<html>` shell, `<head>` metadata, imports globals.css |
| `globals.css` | — | Google Fonts import, Tailwind directives, CSS custom properties, animations (fadeIn, shimmer, dropDown), bank-card gradient classes |
| `page.js` | `/` | Dashboard: stat cards (balance / income / spent / tax), QuickActions grid, bank account cards in responsive grid, AddBankSection, recent transactions list |
| `add-bank/page.js` | `/add-bank` | Form with: bank dropdown (20 Bangladeshi banks), name, account no, password, balance. Validates all fields, calls `addBank()` from context, shows success animation, redirects to home |
| `tax-calculation/page.js` | `/tax-calculation` | Per-bank tax rows with progress bars, dark summary card, **Pay Tax** (alert) + **Download Tax Paper** (generates .txt file download) |
| `transactions/page.js` | `/transactions` | Searchable + filterable list of all transactions. Filters: text search, credit/debit toggle, per-bank dropdown. Running totals for in/out. |
| `profile/page.js` | `/profile` | User avatar/header, stat boxes, contact info, all linked banks with masked account numbers, financial overview. |

---

### Components (`src/components/`)

| File | Purpose |
|------|---------|
| `Navbar.js` | Sticky glassmorphism navbar. Left: logo + tagline. Center: animated total balance. Right: notification bell + profile avatar with dropdown (See Profile / Transactions / Log Out). Dropdown closes on outside click. |
| `Footer.js` | Dark footer with brand column, quick links column, services column. Copyright notice. |
| `BankCard.js` | Dark gradient card per bank. Shows bank name, masked account number, balance, and account holder. 6 rotating gradient color themes. Decorative circles. Hover lift effect. |
| `QuickActions.js` | 10 responsive buttons in a grid (3 cols mobile → 5 cols desktop). Each has a colored icon + label. Tax Calculation routes to `/tax-calculation`; all others show a contextual alert. |
| `AddBankSection.js` | Dashed-border CTA card that links to `/add-bank`. Animated arrow on hover. |

---

### Context & Utilities

| File | Purpose |
|------|---------|
| `context/BankContext.js` | React Context with `BankProvider`. Holds: `banks[]` (3 default accounts), `transactions[]` (8 sample), `user` object, `totalBalance` (derived), `TAX_RATE = 0.05`. Exports `addBank()` (adds new bank + logs a transaction). |
| `lib/utils.js` | `formatCurrency(n)` — BDT locale format. `formatNumber(n)` — plain number. `maskAccountNo(n)` — shows last 4 digits. `formatDate(str)` — readable date. `BANK_LIST` — array of 20 Bangladeshi banks for the dropdown. |

---

## Data Flow

```
BankProvider (context)
│
├── Navbar.js          ← reads totalBalance, user
├── page.js            ← reads banks[], transactions[], totalBalance
├── add-bank/page.js   ← calls addBank()
├── tax-calculation/   ← reads banks[], totalBalance, TAX_RATE
├── transactions/      ← reads transactions[]
└── profile/           ← reads user, banks[], transactions[]
```

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Key Design Decisions

- **Indigo + Violet palette** — trustworthy, modern, finance-appropriate
- **Plus Jakarta Sans** (display) + **DM Sans** (body) — crisp, professional pairing
- **JetBrains Mono** — used for all currency / account numbers for scanability
- **6 dark gradient themes** — bank cards rotate through them automatically
- **Glassmorphism navbar** — sticky, blurred, stays visible while scrolling
- **No TypeScript** — plain `.js` files throughout, as requested
- **No external UI library** — pure Tailwind + Lucide icons
- **Context-only state** — no Redux, no localStorage; state resets on refresh (as expected for a demo)
- **20 Bangladeshi banks** in the dropdown — localized for BD market
- **BDT currency formatting** — using `en-BD` locale throughout

---

## Pages Summary

| Route | Description |
|-------|-------------|
| `/` | Dashboard with stats, quick actions, bank cards, transactions |
| `/add-bank` | Form to link a new bank account |
| `/tax-calculation` | 5% tax breakdown per bank + pay/download |
| `/transactions` | Full filterable transaction history |
| `/profile` | User info + linked banks + financial overview |

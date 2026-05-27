# <img src="./public/brand/ratekaro-logo-transparent.png" alt="RateKaro PK" width="320"/>

> **Stop Guessing. Start Charging Right.** 🇵🇰
>
> **RateKaro PK** is Pakistan's first comprehensive freelance rate intelligence tool and developer platform. Built specifically for the nuances of the Pakistani freelance ecosystem, it empowers developers, designers, writers, and digital professionals to discover standard market rates, easily navigate tax structures, and instantly generate high-converting, AI-powered proposals.

[![Next.js Version](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.47-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://aistudio.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

---

## ✨ Features

### 1. 📊 Freelancer Rate Calculator
- **45+ Specialized Skills:** Ranging across software development, creative design, copywriting, AI prompt engineering, and business services.
- **Local & Foreign Contexts:** Instantly compare rates calculated for local Pakistani clients vs. foreign international clients.
- **Granular Adjustments:** Filter rates by experience level (Junior, Mid, Senior) and regional context (Karachi, Lahore, Islamabad, or Remote).
- **Supabase-Backed Benchmark Intelligence:** Reads calculated results from live market benchmarks, with fallback data built-in when connection is lost.

### 2. 🧾 Pro FBR Tax Calculator
- **Exemption Exporters Support:** Full support for official **PSEB (Pakistan Software Export Board)** IT export tax exemption standards (0.25% tax withholding limit).
- **FBR Slabs Integrated:** Computes actual net take-home monthly/annual pay instantly for both non-salaried freelancers and salaried professionals.
- **Interactive Projections:** Shows full annual income estimates, effective tax rates, and projected FBR filings.

### 3. 🤖 AI Proposal Generator
- **Powered by OpenAI (GPT-4o-mini):** Instantly drafts highly customized, professional, and winning job proposals.
- **Rate-Integrated Content:** Automatically incorporates computed experience levels and client-friendly rate suggestions inside the proposal pitch.
- **Save & Retrieve:** Save proposal drafts directly to your user dashboard.

### 4. 💱 Real-Time Currency Check
- **Live Exchange Rate Engine:** Constantly fetches and checks the current USD-to-PKR conversion rates to keep local estimates accurate.
- **Dynamic Fallbacks:** Gracefully falls back to high-fidelity static seed rates if third-party exchange rate endpoints fail.

### 5. 🛡️ User Dashboard & Auth
- **Secure Supabase Authentication:** Quick sign-up and login utilizing email/password verification and social providers.
- **Personal Database Vault:** Securely store your calculated rates, tax reports, and generated client proposals under PostgreSQL Row Level Security (RLS).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion (for gorgeous, premium micro-animations)
- **Database:** Supabase (PostgreSQL with preconfigured RLS policies)
- **Authentication:** Supabase Auth & SSR SDK (`@supabase/ssr`)
- **State Management:** Zustand
- **AI Service:** OpenAI API (`openai` client)
- **Progressive Web App:** Built-in offline-readiness with `next-pwa`

---

## 📂 Folder Architecture

```text
ratekaro-pk/
├── app/                       # Next.js 14 App Router Directory
│   ├── (auth)/                # Auth Routing Group (Signup, Signin)
│   ├── api/                   # API Endpoints (market-rate, market-refresh)
│   ├── calculator/            # Rate Calculator Page
│   ├── tax/                   # Pakistan Tax Calculator Page
│   ├── proposals/             # AI Proposal Generator Page
│   ├── dashboard/             # Private User Dashboard Page
│   └── page.tsx               # Homepage with Premium Hero, Stats Marquee
├── components/                # React Components
│   ├── layout/                # Global Layout (Navbar, Footer, MobileNav)
│   ├── seo/                   # SEO Meta Components
│   └── ui/                    # Shared reusable components (Marquee)
├── lib/                       # Utility Functions & Configuration
│   ├── store/                 # Zustand Global State
│   ├── supabase/              # Database Schema & Client Initializers
│   │   ├── setup.sql          # DB initialization SQL script
│   │   └── schema.sql         # Base database schema definitions
│   └── taxCalculator.ts       # Pakistan Tax Slab logic calculations
└── public/                    # Static Assets
    └── brand/                 # Cropped RateKaro logos (transparent/black)
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18.x or above recommended)
- **npm** or **yarn** / **pnpm**
- A **Supabase** account (Free tier works perfectly)
- An **OpenAI API key** (Optional, required only for proposal builder)

### 1️⃣ Clone the Repository & Install Dependencies
```bash
git clone https://github.com/your-username/ratekaro-pk.git
cd ratekaro-pk
npm install
```

### 2️⃣ Configure Environment Variables
Create a `.env.local` file in the root directory and configure it as shown in `.env.example`:

```env
# Supabase credentials (from your Supabase project settings > API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI API credentials (Use Google Gemini for a 100% free tier, or OpenAI)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

# Optional OpenAI fallback
OPENAI_API_KEY=your_openai_api_key
OPENAI_PROPOSAL_MODEL=gpt-4o-mini

# Secret protecting the weekly refresh webhook cron job
MARKET_REFRESH_SECRET=change_me_to_a_long_random_secret
```

### 3️⃣ Setup the Supabase Database
1. Go to your **Supabase Dashboard** -> Choose your project.
2. Navigate to **SQL Editor** -> Click **New Query**.
3. Copy the entire contents of [lib/supabase/setup.sql](lib/supabase/setup.sql) and paste them into the SQL editor.
4. Click **Run**. 
This will automatically:
- Create the core tables (`skills`, `rate_sources`, `rate_benchmarks`, `saved_rates`, `tax_estimates`, `proposals`, `rate_submissions`).
- Seed 45+ standard freelance skills with preconfigured slugs and categories.
- Enable **Row Level Security (RLS)** and register robust security policies protecting user metadata.

### 4️⃣ Start Development Server
```bash
# Clear Next.js cache and start development server
npm run dev:clean

# Or run the standard dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📈 Database Refresh & Maintenance

RateKaro PK reads intelligence figures directly from the `rate_benchmarks` table. For production environments, it is recommended to query live USD/PKR exchange rates weekly to refresh pricing benchmarks.

A weekly cron job can be configured via a secure POST hook:

```bash
curl -X POST https://your-domain.com/api/market-refresh \
  -H "Authorization: Bearer $MARKET_REFRESH_SECRET"
```

- This hook checks live exchange feeds, computes updated benchmark rates based on historical weights, and updates stale parameters.
- If live rates are low confidence, the application warns the user, and handles graceful offline fallbacks securely.

---

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
*Created with ❤️ by Pakistani freelancers, for freelancers.*

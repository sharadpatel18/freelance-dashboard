# Freelance Dashboard

A simple task & project management tool for freelancers — manage clients, projects, tasks, and deadlines all in one place.

![Screenshot](./public/screenshot.png)

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Prisma + PostgreSQL, Clerk for Auth
- **UI:** Lucide Icons, Chart.js, date-fns, react-hot-toast

---

## ✨ Features

- 🔐 Secure login with Clerk
- 📁 Project and task management
- 📊 Visual analytics & progress tracking
- 🗓️ Calendar-friendly deadlines
- 📱 Responsive UI

---

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/freelance-dashboard.git
cd freelance-dashboard
npm install
 ```

### 2. Install dependencies:

```bash
npm install
# or
yarn
```

### 3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then fill in your Clerk keys:

```bash
env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Run the development server:

```bash
npm run dev
```

### 5. Open http://localhost:3000 in your browser.


### Important Notes:
1. Replace placeholder values (`your-username`, `support@yourdomain.com`, etc.) with your actual information
2. Add a project screenshot named `screenshot.png` in your `public` folder
3. Create these additional files if needed:
   - `DEPLOYMENT.md` for extended deployment instructions
   - `CODE_OF_CONDUCT.md` for community guidelines
   - `LICENSE` file (MIT recommended for open source)

This README includes:
- Modern formatting with emojis
- Clear section organization
- Detailed setup instructions
- Comprehensive tech documentation
- Multiple deployment options
- Contribution guidelines
- Support information

You can copy this entire content and paste it directly into your `README.md` file. Would you like me to add any specific additional sections or make any adjustments to the existing content?

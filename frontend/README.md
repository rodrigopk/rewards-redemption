# 🎁 Rewards Redemption Frontend

This is the React frontend for the Rewards Redemption App.  
It uses **Tailwind CSS** for styling, and integrates with the Ruby on Rails backend via JWT-based authentication.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Backend server running at `http://localhost:3000`

---

## 🛠 Installation

```bash
cd frontend
npm install
```

---

## 📱 Running the App

```bash
npm run dev
```

This will start the development server (typically on `http://127.0.0.1:5173`).  
Make sure your Rails backend is running locally on port 3000.

---

## 🧪 Running Tests

We use **Jest** and **@testing-library/react** for unit tests.

```bash
npm test
```

---

## 📁 Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context (Auth, Points)
│   ├── pages/          # App views (SignIn, Rewards, Redemptions)
│   ├── services/       # APIService to talk to backend
│   └── App.jsx         # Main app routing
├── tailwind.config.js  # Tailwind config
├── vite.config.js      # Vite config
└── package.json
```

---

## 🔐 Authentication Flow

- User signs in via `/api/v1/auth/sign_in`
- JWT token is saved in `localStorage` and used for future API calls
- The token is shared app-wide using `AuthContext`
- Points are managed using `PointsContext`

---

## 💅 Styling

We use [Tailwind CSS](https://tailwindcss.com/) for fast, utility-first styling.


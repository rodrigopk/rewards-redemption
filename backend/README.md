# 🎁 Rewards Redemption API (Rails Backend)

This is a Ruby on Rails API-only application that powers a simple rewards redemption platform.  
It allows users to:

- View their current points balance
- Browse available rewards
- Redeem rewards using points
- View their redemption history

All endpoints are authenticated using **JWT** and fully documented via **Swagger (OpenAPI 3)**.

---

## 🚀 Tech Stack

- Ruby 3.4.3
- Rails 8.0.2 (API-only)
- SQLite (for local development)
- Devise (authentication)
- JWT (token-based auth)
- RSpec + FactoryBot + Shoulda Matchers (testing)
- Rswag (API documentation)

---

## 📦 Setup Instructions

### 1. Install Dependencies

Make sure you have Ruby 3.4.3 and Bundler installed. Then run:

```bash
bundle install
```

> 💡 Tip: If you're using WSL, make sure you also have `libsqlite3-dev` installed.

---

## 🛠️ Database Setup

### 1. Create & Migrate the Database

```bash
rails db:create db:migrate
```

### 2. Seed Sample Data

This will create users, rewards, and redemptions for development/testing:

```bash
rails db:seed
```

---

## 🔐 Authentication

All protected endpoints require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your-token-here>
```

You can obtain a token via:

```http
POST /api/v1/auth/sign_in
```

---

## 📖 API Documentation (Swagger)

After running the server, you can access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

The docs are powered by [rswag](https://github.com/rswag/rswag) and reflect the actual request specs.

> ✨ Don’t forget to "Authorize" with your token in the Swagger UI!

---

## 🧪 Running the Tests

This project uses:

- `RSpec` for test framework
- `FactoryBot` for data setup
- `Shoulda Matchers` for concise model tests
- `Rswag` to validate documented API contracts

### Run all tests:

```bash
bundle exec rspec
```

### Regenerate Swagger docs:

```bash
bundle exec rake rswag:specs:swaggerize
```

---

## ✅ Available Endpoints

Here's a sample of what's included:

- `POST   /api/v1/auth/sign_in` – Login and get JWT
- `GET    /api/v1/points` – View current user points
- `GET    /api/v1/rewards` – List all available rewards
- `POST   /api/v1/redemptions` – Redeem a reward
- `GET    /api/v1/redemptions` – Redemption history for the current user

> Full specs and schemas available at `/api-docs`.

---

## 📝 License

This project is released under the MIT License.

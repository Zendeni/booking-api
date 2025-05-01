# 🏡 Booking API

A RESTful backend for a property-booking platform, built with **Node.js**, **Express**, **Prisma**, and **SQLite**.  
It offers full CRUD, JWT authentication, Postman-driven test suites, and Sentry-powered error tracking.

---

## 🚀 Features

- 🔐 JWT authentication  
- 🧾 CRUD for Users, Hosts, Properties, Bookings, Reviews, Amenities  
- 🔍 Query filtering via URL parameters  
- ✅ Solid status-code + input validation  
- 📦 Seeded demo data (`npm run db:reset`)  
- ⚠️ Global error reporting with Sentry  
- 🧪 Positive & negative Postman collections (`npm test`)

---

## 📁 Project structure

    src/
    ├── controllers/     # Route handlers
    ├── middleware/      # Auth, error, logging
    ├── prisma/          # Prisma schema & client
    ├── routes/          # Express routers
    ├── services/        # DB interaction layer
    ├── data/            # JSON seed files
    └── index.js         # Entry point

---

## 🔧 Tech stack

| Layer   | Tool            |
|---------|-----------------|
| Runtime | Node.js 20 LTS  |
| Server  | Express         |
| ORM     | Prisma          |
| DB      | SQLite (dev)    |
| Auth    | JSON Web Token  |
| Errors  | Sentry          |
| Tests   | Newman/Postman  |

---

## 🛠️ Quick start

> **Two-terminal workflow**  
> *Terminal 1* → DB reset + server  *Terminal 2* → test suites

### 1 Install dependencies

    npm install

### 2 Configure environment variables

Create a **.env** file in the project root:

    DATABASE_URL="file:./dev.db"
    JWT_SECRET=supersecretkey
    SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0

### 3 Terminal 1 — reset & seed the database

    npm run db:reset

The script

1. Drops/creates **dev.db**  
2. Pushes the current Prisma schema  
3. Reseeds all demo data  
4. Prints a ready-to-use **JWT token**, e.g.  
   `🧪 TEST TOKEN for Postman: eyJhbGciOiJIUzI1NiIsInR...`

### 4 Add the token to Postman

Open `postman/environments/Local.postman_environment.json` and paste the token into the `token` variable (or create a Postman global variable).

### 5 Start the dev server (still Terminal 1)

    npm run dev          # http://localhost:3000

### 6 Terminal 2 — run all Postman tests

    npm test

You should see **0 failed assertions**.

---

## 🔐 Authentication flow

| Step | Endpoint        | Notes                                              |
|------|-----------------|----------------------------------------------------|
| 1    | POST `/login`   | Body `{"email":"…","password":"…"}` → returns JWT   |
| 2    | any protected   | Add header `Authorization: Bearer <token>`         |

---

## 🔎 Query-filter examples

    /properties?location=Colorado&pricePerNight=250&amenities=a1,b3
    /bookings?userId=<uuid>
    /users?username=johnDoe
    /users?email=john@example.com
    /hosts?name=Linda

---

## 🧪 Manual testing with curl

    # Login – get a token
    curl -X POST http://localhost:3000/login \
         -H "Content-Type: application/json" \
         -d '{"email":"john@example.com","password":"johnDoe123"}'

    # All properties
    curl http://localhost:3000/properties

    # Filter by location
    curl "http://localhost:3000/properties?location=Colorado"

---

## 🧼 Extras

* Centralised error handler logs to console **and** Sentry  
* Deploy-ready on Render, Railway, Fly.io – just replace `DATABASE_URL`

---

## 📚 License

MIT

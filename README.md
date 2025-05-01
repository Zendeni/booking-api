# 🏡 Booking API

A RESTful backend API for a property booking platform. Built with **Node.js**, **Express**, **Prisma**, and **SQLite**, featuring full CRUD, JWT authentication, query filtering, and Sentry-powered error tracking.

---

## 🚀 Features

- 🔐 JWT Authentication  
- 🧾 CRUD for Users, Hosts, Properties, Bookings, Reviews, Amenities  
- 🔍 Query filtering via query parameters  
- ✅ Status codes & validation  
- 📦 Seeded data using JSON files  
- ⚠️ Global error handling with Sentry  

---

## 📁 Project Structure

    src/
    ├── controllers/         # Business logic layer
    ├── middleware/          # Auth and error handling
    ├── prisma/              # Prisma schema + client
    ├── routes/              # Express routes
    ├── services/            # Prisma DB interactions
    ├── data/                # Seed data (JSON)
    └── index.js             # Entry point

---

## 🔧 Tech Stack

- Node.js  
- Express  
- Prisma ORM  
- SQLite (development DB)  
- JWT (auth)  
- Sentry (error tracking)  
- Postman (for API testing)  

---

## ✅ Setup & Run

1. Install dependencies:  
   `npm install`

2. Configure environment variables:  
   Create a `.env` file in the root directory with:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET=supersecretkey
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```
3. Run Prisma migrations:
``` 
npx prisma generate --schema=src/prisma/schema.prisma

npm run db:reset


Seed the database:  
npm run seed

Start the server:  
node src/index.js

npm run dev
```
---

## 🔐 Authentication

1. **Login**  
   `POST /login`  
   Returns a JWT token if credentials match.

2. **Protected Routes**  
   All `POST`, `PUT`, and `DELETE` routes require the following header:  
   `Authorization: Bearer <your-token>`

---

## 🔎 Query Filtering

Examples of query parameters:

- `/properties?location=Colorado&pricePerNight=250&amenities=id1,id2`  
- `/bookings?userId=<user-id>`  
- `/users?username=johnDoe`  
- `/users?email=johndoe@email.com`  
- `/hosts?name=Linda`

---

## 🧪 Testing

Use Postman or your browser to test endpoints.

Example requests:

- `POST /login`  
- `GET /properties`  
- `POST /bookings`

## Or with curl
```
Login (get a token)
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"email":"johndoe@email.com", "password":"johnDoe123"}"

Get all properties
curl http://localhost:3000/properties

Filter properties by location
curl "http://localhost:3000/properties?location=Colorado"

Filter bookings by userId
curl "http://localhost:3000/bookings?userId=f1234567-89ab-cdef-0123-456789abcdef"

Filter users
curl "http://localhost:3000/users?username=johnDoe"
curl "http://localhost:3000/users?email=johndoe@email.com"

Filter hosts
curl "http://localhost:3000/hosts?name=Linda"
```

---

## 🧼 Extras

- All errors are logged and reported to Sentry  
- Easily deployable (e.g. Render, Railway)

---

## 📚 License

MIT

# Booking API

This is a REST API for managing bookings, properties, hosts, users, amenities, and reviews. It is built using **Express.js**, **Prisma**, and **SQLite**.

## Table of Contents
1. [Features](#features)
2. [Setup Instructions](#setup-instructions)
3. [Environment Variables](#environment-variables)
4. [Running the API](#running-the-api)
5. [Testing Endpoints](#testing-endpoints)
6. [API Documentation](#api-documentation)


---

## Features
- **CRUD Operations** for:
  - Users
  - Hosts
  - Properties
  - Amenities
  - Bookings
  - Reviews
- **JWT Authentication** for secure access to protected routes.
- **Query Parameters** for filtering results (e.g., `/properties?location=Malibu`).
- **Error Handling** with Sentry integration.
- **Logging** using Winston.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Prisma CLI (`npm install -g prisma`)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/booking-api.git
   cd booking-api

1.  **Install Dependencies**:

    bash

    Copy

    npm install

2.  **Set Up the Database**:

    -   Initialize the database and apply migrations:

        bash

        Copy

        npx prisma migrate dev --name init

3.  **Seed the Database**:

    -   Populate the database with initial data:

        bash

        Copy

        npm run seed

4.  **Set Up Environment Variables**:

    -   Create a `.env` file in the root directory and add the following:

        env

        Copy

        DATABASE_URL="file:./dev.db"
        AUTH_SECRET_KEY="your-secret-key-here"
        SENTRY_DSN="your-sentry-dsn-here"

5.  **Start the Server**:

    bash

    Copy

    npm run dev

* * * * *

Environment Variables
---------------------

Create a `.env` file in the root directory with the following content:

env

Copy

# Database Configuration
DATABASE_URL="file:./dev.db"

# JWT Authentication
AUTH_SECRET_KEY="your-secret-key-here"

# Sentry Error Tracking
SENTRY_DSN="your-sentry-dsn-here"

* * * * *

Running the API
---------------

1.  **Start the Server**:

    bash

    Copy

    npm run dev

2.  **Access the API**:\
    The API will be running at `http://localhost:3000`.

* * * * *

Testing Endpoints
-----------------

You can test the API using **Postman** or any HTTP client like **curl** or **Insomnia**.

### Example Requests

#### 1\. **Login**

-   **Endpoint**: `POST /login`

-   **Request Body**:

    json

    Copy

    {
      "username": "jdoe",
      "password": "password123"
    }

-   **Response**:

    json

    Copy

    {
      "token": "your-jwt-token-here"
    }

#### 2\. **Get All Properties**

-   **Endpoint**: `GET /properties`

-   **Headers**:

    json

    Copy

    {
      "Authorization": "Bearer your-jwt-token-here"
    }

-   **Response**:

    json

    Copy

    [
      {
        "id": "g9012345-67ef-0123-4567-89abcdef0123",
        "title": "Cozy Mountain Retreat",
        "description": "Experience tranquility in our cozy cabin situated on a serene mountain peak.",
        "location": "Rocky Mountains, Colorado",
        "pricePerNight": 120.5,
        "bedroomCount": 3,
        "bathRoomCount": 2,
        "maxGuestCount": 5,
        "hostId": "f1234567-89ab-cdef-0123-456789abcdef",
        "rating": 5
      }
    ]

#### 3\. **Create a Booking**

-   **Endpoint**: `POST /bookings`

-   **Headers**:

    json

    Copy

    {
      "Authorization": "Bearer your-jwt-token-here"
    }

-   **Request Body**:

    json

    Copy

    {
      "userId": "a1234567-89ab-cdef-0123-456789abcdef",
      "propertyId": "g9012345-67ef-0123-4567-89abcdef0123",
      "checkinDate": "2023-12-01T14:00:00.000Z",
      "checkoutDate": "2023-12-10T10:00:00.000Z",
      "numberOfGuests": 2,
      "totalPrice": 500.0,
      "bookingStatus": "confirmed"
    }

-   **Response**:

    json

    Copy

    {
      "id": "f0123456-78ab-cdef-0123-456789abcdef",
      "userId": "a1234567-89ab-cdef-0123-456789abcdef",
      "propertyId": "g9012345-67ef-0123-4567-89abcdef0123",
      "checkinDate": "2023-12-01T14:00:00.000Z",
      "checkoutDate": "2023-12-10T10:00:00.000Z",
      "numberOfGuests": 2,
      "totalPrice": 500.0,
      "bookingStatus": "confirmed"
    }

* * * * *

API Documentation
-----------------

The API documentation is available in the `openapi.yaml` file. You can use tools like **Swagger UI** or **Postman** to visualize and interact with the API.

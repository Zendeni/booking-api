PS D:\Users\buske\Downloads\booking api 3\booking-api-main> npm test   

> express-bookings@1.0.0 test
> npm run test-positive && npm run test-negative


> express-bookings@1.0.0 test-positive
> newman run "./postman/collections/Bookings API.json" -e "./postman/environments/Local.postman_environment.json"

(node:19416) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
newman

Bookings API

□ users / {userId}
└ Get user by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 61ms]
  GET http://localhost:3000/users/e5678901-23f0-1234-5678-9abcdef01234 [200 OK, 450B, 13ms]
  √  Response status code is 200
  √  Id should be a non-empty string

└ Update user by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 5ms]
  PUT http://localhost:3000/users/e5678901-23f0-1234-5678-9abcdef01234 [200 OK, 490B, 9ms]
  √  Response status code is 200

└ Delete user by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/users/e5678901-23f0-1234-5678-9abcdef01234 [200 OK, 235B, 12ms]
  √  Response status code is 200

□ users
└ Get all users
  POST http://0.0.0.0:3000/login [200 OK, 475B, 5ms]
  GET http://localhost:3000/users [200 OK, 2.2kB, 4ms]
  √  Response status code is 200
  √  Response is an array

└ Create a new user
  POST http://0.0.0.0:3000/login [200 OK, 475B, 6ms]
  POST http://localhost:3000/users [201 Created, 554B, 7ms]
  √  Response status code is 201

□ hosts / {hostId}
└ Get host by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/hosts/e2345678-90bc-def0-0123-456789abcdef [200 OK, 941B, 3ms]
  √  Response status code is 200
  √  ID is a non-empty string

└ Update host by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 5ms]
  PUT http://localhost:3000/hosts/e2345678-90bc-def0-0123-456789abcdef [200 OK, 575B, 6ms]
  √  Response status code is 200

└ Delete host by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/hosts/e2345678-90bc-def0-0123-456789abcdef [200 OK, 235B, 6ms]
  √  Response status code is 200

□ hosts
└ Get all hosts
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/hosts [200 OK, 3.07kB, 3ms]
  √  Response status code is 200
  √  Response body is an array

└ Create a new host
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/hosts [201 Created, 613B, 6ms]
  √  Response status code is 201

□ properties / {propertyId}
└ Get property by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  GET http://localhost:3000/properties/h0123456-78f0-1234-5678-9abcdef01234 [200 OK, 280B, 3ms]
  √  Response status code is 200
  √  Id should be a non-empty string

└ Update property by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  PUT http://localhost:3000/properties/h0123456-78f0-1234-5678-9abcdef01234 [200 OK, 280B, 6ms]
  √  Response status code is 200

└ Delete property by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/properties/h0123456-78f0-1234-5678-9abcdef01234 [200 OK, 235B, 15ms]
  √  Response status code is 200

□ properties
└ Get all properties
  POST http://0.0.0.0:3000/login [200 OK, 475B, 6ms]
  GET http://localhost:3000/properties [200 OK, 2.58kB, 3ms]
  √  Response status code is 200
  √  Response is an array with at least one element
  √  maxGuestCount is a non-negative integer

└ Create a new property
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/properties [201 Created, 613B, 6ms]
  √  Response status code is 201

□ amenities / {amenityId}
└ Get amenity by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/amenities/u3456789-01rs-tuvw-01cd-ef0123456789 [200 OK, 302B, 3ms]
  √  Response status code is 200
  √  Response has the required fields - id and name
  √  id is a non-empty string
  √  Name should be a non-empty string

└ Update amenity by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  PUT http://localhost:3000/amenities/u3456789-01rs-tuvw-01cd-ef0123456789 [200 OK, 302B, 6ms]
  √  Response status code is 200

└ Delete amenity by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/amenities/u3456789-01rs-tuvw-01cd-ef0123456789 [200 OK, 235B, 6ms]
  √  Response status code is 200

□ amenities
└ Get all amenities
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  GET http://localhost:3000/amenities [200 OK, 796B, 2ms]
  √  Response status code is 200
  √  Response is an array with at least one element
  √  Each element in the response has the required fields - id and name
  √  The id must be a non-empty string
  √  Name is a non-empty string

└ Create a new amenity
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/amenities [201 Created, 299B, 5ms]
  √  Response status code is 201

□ bookings / {bookingId}
└ Get booking by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  GET http://localhost:3000/bookings/f0123456-78ab-cdef-0123-456789abcdef [200 OK, 532B, 2ms]
  √  Response status code is 200
  √  Id should be a non-empty string
  √  userId is a non-empty string
  √  propertyId should be a non-empty string

└ Update booking by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 12ms]
  PUT http://localhost:3000/bookings/f0123456-78ab-cdef-0123-456789abcdef [200 OK, 532B, 6ms]
  √  Response status code is 200

└ Delete booking by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/bookings/f0123456-78ab-cdef-0123-456789abcdef [200 OK, 235B, 5ms]
  √  Response status code is 200

□ bookings
└ Get all bookings
  POST http://0.0.0.0:3000/login [200 OK, 475B, 10ms]
  GET http://localhost:3000/bookings [200 OK, 529B, 8ms]
  √  Response status code is 200
  √  Response is an array
  √  Id should be a non-empty string
  √  userId is a non-empty string

└ Create a new booking
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/bookings [201 Created, 535B, 6ms]
  √  Response status code is 201

□ reviews / {reviewId}
└ Get review by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/reviews/j0123456-78f0-1234-5678-9abcdef01234 [200 OK, 477B, 2ms]
  √  Response status code is 200
  √  Response has the required fields
  √  Id is a non-empty string
  √  userId is a non-empty string
  √  propertyId is a non-empty string

└ Update review by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 7ms]
  PUT http://localhost:3000/reviews/j0123456-78f0-1234-5678-9abcdef01234 [200 OK, 437B, 6ms]
  √  Response status code is 200

└ Delete review by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/reviews/j0123456-78f0-1234-5678-9abcdef01234 [200 OK, 235B, 6ms]
  √  Response status code is 200

□ reviews
└ Get all reviews
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/reviews [200 OK, 898B, 2ms]
  √  Response status code is 200
  √  Response is an array with at least one element
  √  Id is a non-empty string
  √  userId is a non-empty string
  √  propertyId is a non-empty string

└ Create a new review
  POST http://0.0.0.0:3000/login [200 OK, 475B, 8ms]
  POST http://localhost:3000/reviews [201 Created, 472B, 7ms]
  √  Response status code is 201

→ User Login
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/login [200 OK, 475B, 3ms]
  √  Response status code is 200
  √  Response has the required field 'token'
  √  Token is a non-empty string

┌─────────────────────────┬─────────────────┬─────────────────┐
│                         │        executed │          failed │
├─────────────────────────┼─────────────────┼─────────────────┤
│              iterations │               1 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│                requests │              62 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│            test-scripts │              62 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│      prerequest-scripts │              31 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│              assertions │              61 │               0 │
├─────────────────────────┴─────────────────┴─────────────────┤
│ total run duration: 1873ms                                  │
├─────────────────────────────────────────────────────────────┤
│ total data received: 20.71kB (approx)                       │
├─────────────────────────────────────────────────────────────┤
│ average response time: 6ms [min: 2ms, max: 61ms, s.d.: 7ms] │
└─────────────────────────────────────────────────────────────┘

> express-bookings@1.0.0 test-negative
> newman run "./postman/collections/Bookings API Negative.json" -e "./postman/environments/Local.postman_environment.json"

Bookings API Negative

□ users / {userId}
└ Get user by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 38ms]
  GET http://localhost:3000/users/:userId [401 Unauthorized, 293B, 8ms]
  1. Response status code is 404

└ Update user by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  PUT http://localhost:3000/users/d4567890-12 [401 Unauthorized, 293B, 2ms]
  2. Response status code is 404

└ Delete user by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/users/d4567890-12ef-01 [401 Unauthorized, 293B, 8ms]
  3. Response status code is 404

□ users
└ Create a new user
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/users [401 Unauthorized, 293B, 8ms]
  4. Response status code is 400

□ hosts / {hostId}
└ Get host by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/hosts/:hostId [404 Not Found, 281B, 2ms]
  √  Response status code is 404

└ Update host by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  PUT http://localhost:3000/hosts/:hostId [401 Unauthorized, 293B, 7ms]
  5. Response status code is 404

└ Delete host by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  DELETE http://localhost:3000/hosts/:hostId [401 Unauthorized, 293B, 2ms]
  6. Response status code is 404

□ hosts
└ Create a new host
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/hosts [401 Unauthorized, 293B, 2ms]
  7. Response status code is 400

□ properties / {propertyId}
└ Get property by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  GET http://localhost:3000/properties/h0123456-78f0-1234-5678-9abcdef01234 [200 OK, 280B, 2ms]
  8. Response status code is 404

└ Update property by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  PUT http://localhost:3000/properties/h0123456-78f0-1234-5678-9abcdef01234 [401 Unauthorized, 293B, 1ms]
  9. Response status code is 404

└ Delete property by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  DELETE http://localhost:3000/properties/h0123456-78f0-1234-5678-9abcdef01234 [401 Unauthorized, 293B, 2ms]
 10. Response status code is 404

□ properties
└ Create a new property
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/properties [401 Unauthorized, 293B, 4ms]
 11. Response status code is 400

□ amenities / {amenityId}
└ Get amenity by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  GET http://localhost:3000/amenities/t2345678-90qr-stu [404 Not Found, 284B, 2ms]
  √  Response status code is 404

└ Update amenity by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  PUT http://localhost:3000/amenities/t2345678-90qr-st [401 Unauthorized, 293B, 2ms]
 12. Response status code is 404

└ Delete amenity by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  DELETE http://localhost:3000/amenities/bc-def012345678 [401 Unauthorized, 293B, 1ms]
 13. Response status code is 404

□ amenities
└ Create a new amenity
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  POST http://localhost:3000/amenities [401 Unauthorized, 293B, 1ms]
 14. Response status code is 400

□ bookings / {bookingId}
└ Get booking by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  GET http://localhost:3000/bookings/f0123456-78ab-cdef-0123-456789abcdef [404 Not Found, 284B, 2ms]
  √  Response status code is 404

└ Update booking by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  PUT http://localhost:3000/bookings/f0123456-78ab-cdef-0123-456789abcdef [401 Unauthorized, 293B, 1ms]
 15. Response status code is 404

└ Delete booking by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  DELETE http://localhost:3000/bookings/f0123456-78ab-cdef-0123-456789abcdef [401 Unauthorized, 293B, 1ms]
 16. Response status code is 404

□ bookings
└ Create a new booking
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  POST http://localhost:3000/bookings [401 Unauthorized, 293B, 1ms]
 17. Response status code is 400

□ reviews / {reviewId}
└ Get review by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  GET http://localhost:3000/reviews/j0123456-78f0-1234-5678-9abcdef01234 [404 Not Found, 283B, 1ms]
  √  Response status code is 404

└ Update review by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  PUT http://localhost:3000/reviews/j0123456-78f0-1234-5678-9abcdef01234 [401 Unauthorized, 293B, 2ms]
 18. Response status code is 404

└ Delete review by ID
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  DELETE http://localhost:3000/reviews/j0123456-78f0-1234-5678-9abcdef01234 [401 Unauthorized, 293B, 1ms]
 19. Response status code is 404

□ reviews
└ Create a new review
  POST http://0.0.0.0:3000/login [200 OK, 475B, 4ms]
  POST http://localhost:3000/reviews [401 Unauthorized, 293B, 1ms]
 20. Response status code is 400

→ User Login
  POST http://0.0.0.0:3000/login [200 OK, 475B, 3ms]
  POST http://localhost:3000/login [401 Unauthorized, 284B, 2ms]
  √  Response status code is 401

┌─────────────────────────┬─────────────────┬─────────────────┐
│                         │        executed │          failed │
├─────────────────────────┼─────────────────┼─────────────────┤
│              iterations │               1 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│                requests │              50 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│            test-scripts │              50 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│      prerequest-scripts │              25 │               0 │
├─────────────────────────┼─────────────────┼─────────────────┤
│              assertions │              25 │              20 │
├─────────────────────────┴─────────────────┴─────────────────┤
│ total run duration: 1585ms                                  │
├─────────────────────────────────────────────────────────────┤
│ total data received: 7.14kB (approx)                        │
├─────────────────────────────────────────────────────────────┤
│ average response time: 3ms [min: 1ms, max: 38ms, s.d.: 5ms] │
└─────────────────────────────────────────────────────────────┘

   #  failure                                 detail

 01.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "users / {userId} / Get user by ID"

 02.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "users / {userId} / Update user by ID"

 03.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "users / {userId} / Delete user by ID"

 04.  AssertionError                          Response status code is 400
                                              expected response to have status code 400 but got 401
                                              at assertion:0 in test-script
                                              inside "users / Create a new user"

 05.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "hosts / {hostId} / Update host by ID"

 06.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "hosts / {hostId} / Delete host by ID"

 07.  AssertionError                          Response status code is 400
                                              expected response to have status code 400 but got 401
                                              at assertion:0 in test-script
                                              inside "hosts / Create a new host"

 08.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 200
                                              at assertion:0 in test-script
                                              inside "properties / {propertyId} / Get property by ID"

 09.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "properties / {propertyId} / Update property by ID"

 10.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "properties / {propertyId} / Delete property by ID"

 11.  AssertionError                          Response status code is 400
                                              expected response to have status code 400 but got 401
                                              at assertion:0 in test-script
                                              inside "properties / Create a new property"

 12.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "amenities / {amenityId} / Update amenity by ID"

 13.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "amenities / {amenityId} / Delete amenity by ID"

 14.  AssertionError                          Response status code is 400
                                              expected response to have status code 400 but got 401
                                              at assertion:0 in test-script
                                              inside "amenities / Create a new amenity"

 15.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "bookings / {bookingId} / Update booking by ID"

 16.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "bookings / {bookingId} / Delete booking by ID"

 17.  AssertionError                          Response status code is 400
                                              expected response to have status code 400 but got 401
                                              at assertion:0 in test-script
                                              inside "bookings / Create a new booking"

 18.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "reviews / {reviewId} / Update review by ID"

 19.  AssertionError                          Response status code is 404
                                              expected response to have status code 404 but got 401
                                              at assertion:0 in test-script
                                              inside "reviews / {reviewId} / Delete review by ID"

 20.  AssertionError                          Response status code is 400
                                              expected response to have status code 400 but got 401
                                              at assertion:0 in test-script
                                              inside "reviews / Create a new review"
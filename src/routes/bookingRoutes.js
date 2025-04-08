const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateJWT } = require('../middleware/auth');


router.get('/', bookingController.getBookings);
router.post('/', authenticateJWT, bookingController.createBooking);

module.exports = router;



// {
//     "id": "f1234567-89ab-cdef-0123-456789abcdef",
//     "username": "johnDoe",
//     "name": "John Doe",
//     "email": "johndoe@email.com",
//     "password": "johnDoe123",
//     "phoneNumber": "+11234567890",
//     "profilePicture": "https://example.com/images/johndoe.jpg"
// },



// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxMjM0NTY3LTg5YWItY2RlZi0wMTIzLTQ1Njc4OWFiY2RlZiIsImVtYWlsIjoiam9obmRvZUBlbWFpbC5jb20iLCJpYXQiOjE3NDQwOTc1ODgsImV4cCI6MTc0NDEwMTE4OH0.W7JsC72woNAsA6O62WxXHvG2SgGIN7Xv3HwmHSRuBFQ"
// }
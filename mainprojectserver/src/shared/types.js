// user.js
const UserType = {
    _id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  };
  
  // hotel.js
  const HotelType = {
    _id: String,
    userId: String,
    name: String,
    city: String,
    country: String,
    description: String,
    type: String,
    adultCount: Number,
    childCount: Number,
    facilities: [String],
    pricePerNight: Number,
    starRating: Number,
    imageUrls: [String],
    lastUpdated: Date,
    bookings: [BookingType],
  };
  
  // booking.js
  const BookingType = {
    _id: String,
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    adultCount: Number,
    childCount: Number,
    checkIn: Date,
    checkOut: Date,
    totalCost: Number,
  };
  
  // hotelSearchResponse.js
  const HotelSearchResponse = {
    data: [HotelType],
    pagination: {
      total: Number,
      page: Number,
      pages: Number,
    },
  };
  
  // paymentIntentResponse.js
  const PaymentIntentResponse = {
    paymentIntentId: String,
    clientSecret: String,
    totalCost: Number,
  };
  
  module.exports = {
    UserType,
    HotelType,
    BookingType,
    HotelSearchResponse,
    PaymentIntentResponse,
  };
  
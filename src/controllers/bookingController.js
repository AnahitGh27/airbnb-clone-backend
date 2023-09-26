import getUserDataFromReq from "../helpers/getUserDataFromReq.js";
import Booking from "../models/Booking.js"

export const addBookings = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  })
};

export const getBookings = async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))
};
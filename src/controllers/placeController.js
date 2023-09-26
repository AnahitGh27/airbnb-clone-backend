import jwt from "jsonwebtoken";
import Place from "../models/Places.js";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.jwtSecret;

export const addPlace = (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err;
    } else {
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(placeDoc);
    }
  });
};

export const getUserPlace = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err;
    } else {
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    }
  });
};

export const getPlaceById = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

export const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err;
    } else {
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        placeDoc.save();
        res.json("ok");
      } else {
        res.json("not updated");
      }
    }
  });
};

export const getPlaces = async (req, res) => {
  res.json(await Place.find());
};
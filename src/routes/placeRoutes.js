import express from "express";
import { addPlace, getUserPlace, getPlaceById, updatePlace, getPlaces } from "../controllers/placeController.js";

const router = express.Router();

router.post("/places", addPlace);
router.get("/user-places", getUserPlace);
router.get("/places/:id", getPlaceById);
router.put("/places", updatePlace);
router.get("/places", getPlaces);

export default router;



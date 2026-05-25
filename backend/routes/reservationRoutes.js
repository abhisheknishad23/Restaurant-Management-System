// const router = require("express").Router();
// const { createReservation, getReservations } = require("../controllers/reservationController");

// router.post("/", createReservation);
// router.get("/", getReservations);

// module.exports = router;



const express = require("express");

const router = express.Router();

const {
  createReservation,
  getReservations,
  confirmReservation,
  cancelReservation,
  deleteReservation
} = require("../controllers/reservationController");


// CREATE RESERVATION
router.post("/", createReservation);


// GET ALL RESERVATIONS
router.get("/", getReservations);

// CONFIRM
router.put("/confirm/:id", confirmReservation);


// CANCEL
router.put("/cancel/:id", cancelReservation);


// DELETE
router.delete("/:id", deleteReservation);


module.exports = router;
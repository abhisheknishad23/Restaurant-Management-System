const db = require("../config/db");
const sendWhatsAppMessage = require("../services/sendMessage");


// CREATE RESERVATION
exports.createReservation = (req, res) => {

  const {
    name,
    phone,
    persons,
    date,
    time,
    message
  } = req.body;

  const bookingId =
    "RES" + Math.floor(Math.random() * 100000);

  const sql = `
    INSERT INTO reservations
    (
      booking_id,
      name,
      phone,
      persons,
      reservation_date,
      reservation_time,
      message
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      bookingId,
      name,
      phone,
      persons,
      date,
      time,
      message
    ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          error: err
        });
      }

      res.json({
        success: true,
        bookingId
      });

    }
  );

};


// GET ALL RESERVATIONS
exports.getReservations = (req, res) => {

  db.query(
    "SELECT * FROM reservations ORDER BY id DESC",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

// Confirm Reservation
exports.confirmReservation = (req, res) => {

  const id = req.params.id;

  db.query(
    "UPDATE reservations SET status='Confirmed' WHERE id=?",
    [id],
    (err) => {

      if (err) return res.status(500).json(err);

      //  User Message
      sendWhatsAppMessage(id, "confirmed");

      res.json({
        success: true,
        message: "Reservation Confirmed"
      });

    }
  );

};


// Cancel Reservation
exports.cancelReservation = (req, res) => {

  const id = req.params.id;

  db.query(
    "UPDATE reservations SET status='Cancelled' WHERE id=?",
    [id],
    (err) => {

      if (err) return res.status(500).json(err);

      //  User Message
      sendWhatsAppMessage(id, "cancelled");

      res.json({
        success: true,
        message: "Reservation Cancelled"
      });

    }
  );

};


// Delete Reservation
exports.deleteReservation = (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM reservations WHERE id=?",
    [id],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Reservation Deleted"
      });

    }
  );

};
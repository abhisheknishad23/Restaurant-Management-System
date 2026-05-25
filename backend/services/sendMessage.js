const client = require("../utils/whatsapp");
const db = require("../config/db");

function sendWhatsAppMessage(id, type) {

  db.query(
    "SELECT * FROM reservations WHERE id=?",
    [id],
    (err, result) => {

      if (result.length === 0) return;

      const user = result[0];

      let message = "";

      if (type === "confirmed") {

        message =
`Your reservation has been CONFIRMED

Booking ID:
${user.booking_id}

Date:
${user.reservation_date}

Time:
${user.reservation_time}`;

      }

      else {

        message =
`Your reservation has been CANCELLED

Booking ID:
${user.booking_id}`;

      }

      client.messages.create({

        from: "whatsapp:+14155238886",

        to: `whatsapp:+91${user.phone}`,

        body: message

      })
      .then(msg => {

  console.log("Message Sent");
  console.log(msg.sid);

})
.catch(err => {

  console.log(err);

});
      

    }
  );

}

module.exports = sendWhatsAppMessage;
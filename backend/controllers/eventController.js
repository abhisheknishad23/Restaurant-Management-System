const db = require("../config/db");


/* ADD EVENT */
exports.addEvent = (req, res) => {

  const {

    title,
    description,
    event_date

  } = req.body;

  const image = req.file.filename;

  db.query(

    `INSERT INTO events
    (title, description, event_date, image)
    VALUES (?, ?, ?, ?)`,

    [
      title,
      description,
      event_date,
      image
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);

      }

      res.json({

        success:true,
        message:"Event Added"

      });

    }

  );

};



/* GET EVENTS */
exports.getEvents = (req, res) => {

  db.query(

    "SELECT * FROM events ORDER BY id DESC",

    (err, result) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json(result);

    }

  );

};



/* DELETE EVENT */
exports.deleteEvent = (req, res) => {

  const id = req.params.id;

  db.query(

    "DELETE FROM events WHERE id=?",

    [id],

    (err, result) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({

        success:true,
        message:"Event Deleted"

      });

    }

  );

};
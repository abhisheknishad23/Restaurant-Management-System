const db = require("../config/db");


/* ADD REVIEW */
exports.addReview = (req, res) => {

  const {

    name,
    profession,
    message,
    rating

  } = req.body;

  const image = req.file.filename;

  db.query(

    `INSERT INTO reviews
    (
      name,
      profession,
      message,
      rating,
      image,
      status
    )

    VALUES (?, ?, ?, ?, ?, ?)`,

    [
      name,
      profession,
      message,
      rating,
      image,
      "pending"
    ],

    (err, result) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json({

        success:true,

        message:
        "Review Submitted Successfully"

      });

    }

  );

};



/* GET REVIEWS */
exports.getReviews = (req, res) => {

  db.query(

    "SELECT * FROM reviews ORDER BY id DESC",

    (err, result) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json(result);

    }

  );

};



/* DELETE REVIEW */
exports.deleteReview = (req, res) => {

  const id = req.params.id;

  db.query(

    "DELETE FROM reviews WHERE id=?",

    [id],

    (err, result) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json({

        success:true,
        message:"Review Deleted"

      });

    }

  );

};


exports.approveReview = (req, res) => {

  const id = req.params.id;

  db.query(

    "UPDATE reviews SET status='approved' WHERE id=?",

    [id],

    (err, result) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json({

        success:true,
        message:"Review Approved"

      });

    }

  );

};
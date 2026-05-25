const db = require("../config/db");


/* ADD SUBSCRIBER */
exports.addSubscriber = (req, res) => {

  const { email } = req.body;

  if(!email){

    return res.status(400).json({
      message:"Email Required"
    });

  }

  db.query(

    "SELECT * FROM subscribers WHERE email=?",

    [email],

    (err, result) => {

      if(result.length > 0){

        return res.json({
          message:"Already Subscribed"
        });

      }

      db.query(

        "INSERT INTO subscribers(email) VALUES(?)",

        [email],

        (err, result) => {

          if(err){

            return res.status(500).json(err);

          }

          res.json({

            success:true,
            message:"Subscribed Successfully"

          });

        }

      );

    }

  );

};



/* GET SUBSCRIBERS */
exports.getSubscribers = (req, res) => {

  db.query(

    "SELECT * FROM subscribers ORDER BY id DESC",

    (err, result) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json(result);

    }

  );

};



/* DELETE SUBSCRIBER */
exports.deleteSubscriber = (req, res) => {

  const id = req.params.id;

  db.query(

    "DELETE FROM subscribers WHERE id=?",

    [id],

    (err, result) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json({

        success:true,
        message:"Subscriber Deleted"

      });

    }

  );

};
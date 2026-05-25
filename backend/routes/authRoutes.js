// const router = require("express").Router();
// const { login } = require("../controllers/authController");

// router.post("/login", login);

// module.exports = router;

const router =
require("express").Router();

const jwt =
require("jsonwebtoken");


router.post(
  "/login",
  (req, res) => {

    const {
      email,
      password
    } = req.body;


    if(

      email ===
      "admin@gmail.com"

      &&

      password ===
      "123456"

    ){

      const token =
      jwt.sign(

        {
          email
        },

        "secretkey"

      );

      res.json({

        token

      });

    }

    else{

      res.status(401).json({

        message:
        "Invalid Credentials"

      });

    }

  }
);

module.exports = router;
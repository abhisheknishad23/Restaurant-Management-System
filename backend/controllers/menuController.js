const db = require("../config/db");

exports.addMenu = (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file.filename;

  db.query(
    "INSERT INTO menu (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, category, image],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Menu Added" });
    }
  );
};

/* GET MENU */
exports.getMenu = (req, res) => {

  db.query(

    "SELECT * FROM menu ORDER BY id DESC",

    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }

  );

};



/* DELETE MENU */
exports.deleteMenu = (req, res) => {

  const id = req.params.id;

  db.query(

    "DELETE FROM menu WHERE id=?",

    [id],

    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Menu Deleted"
      });

    }

  );

};

// const db = require("../config/db");

// exports.addMenu = (req, res) => {

//   const {
//     name,
//     description,
//     price,
//     category,
//     is_available
//   } = req.body;

//   const image = req.file
//     ? req.file.filename
//     : null;

//   db.query(

//     `INSERT INTO menu
//     (
//       name,
//       description,
//       price,
//       category,
//       image,
//       is_available
//     )
//     VALUES (?, ?, ?, ?, ?, ?)`,

//     [
//       name,
//       description,
//       price,
//       category,
//       image,
//       is_available
//     ],

//     (err) => {

//       if (err) {

//         console.log(err);

//         return res.status(500).json(err);

//       }

//       res.json({
//         msg: "Menu Added Successfully"
//       });

//     }

//   );

// };
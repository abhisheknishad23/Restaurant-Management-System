const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email=?", [email], (err, result) => {
    if (result.length === 0) return res.json({ msg: "Invalid user" });

    const user = result[0];

    if (password !== user.password)
      return res.json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    res.json({ token });
  });
};
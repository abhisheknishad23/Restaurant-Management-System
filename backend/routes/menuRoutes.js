const router = require("express").Router();
const multer = require("multer");
const { addMenu, getMenu, deleteMenu } = require("../controllers/menuController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), addMenu);
router.get("/", getMenu);

router.delete("/:id", deleteMenu);

module.exports = router;
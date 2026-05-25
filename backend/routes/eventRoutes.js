const router = require("express").Router();

const multer = require("multer");

const {

  addEvent,
  getEvents,
  deleteEvent

} = require("../controllers/eventController");


const upload = multer({

  dest:"uploads/"

});


router.post(
  "/",
  upload.single("image"),
  addEvent
);

router.get("/", getEvents);

router.delete("/:id", deleteEvent);

module.exports = router;
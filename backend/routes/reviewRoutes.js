const router = require("express").Router();

const multer = require("multer");

const {

  addReview,
  getReviews,
  deleteReview,
  approveReview

} = require("../controllers/reviewController");


const upload = multer({

  dest:"uploads/"

});


router.post(
  "/",
  upload.single("image"),
  addReview
);

router.get("/", getReviews);
router.delete("/:id", deleteReview);
router.put("/approve/:id",approveReview);

module.exports = router;
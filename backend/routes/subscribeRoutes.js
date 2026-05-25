const router = require("express").Router();

const {

  addSubscriber,
  getSubscribers,
  deleteSubscriber

} = require("../controllers/subscribeController");


router.post("/", addSubscriber);

router.get("/", getSubscribers);

router.delete("/:id", deleteSubscriber);

module.exports = router;
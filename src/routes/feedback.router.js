const feedbackController = require("../controllers/feedbackController");
const router = require("express").Router();


router.post("/addFeedback", feedbackController.addFeedback);
router.get("/getFeedback", feedbackController.getFeedback);

module.exports = router;

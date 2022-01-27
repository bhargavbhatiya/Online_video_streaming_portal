const router = require("express").Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const movieCtrl = require("../controllers/movieCtrl");
router.post("/add_movie_details", auth, authAdmin, movieCtrl.add_movie_details);

module.exports = router;

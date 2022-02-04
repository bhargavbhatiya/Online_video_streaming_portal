const router = require("express").Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const movieCtrl = require("../controllers/movieCtrl");

router.post("/add_movie_details", auth, authAdmin, movieCtrl.add_movie_details);
router.get("/get_allmovie", movieCtrl.get_allmovies);
router.get("/get_movie/:id", movieCtrl.get_movie);



module.exports = router;

const router = require("express").Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const movieCtrl = require("../controllers/movieCtrl");

router.post("/add_movie_details", auth, authAdmin, movieCtrl.add_movie_details);
router.post("/get_allmovie", movieCtrl.get_allmovies);
router.get("/get_movie/:id", movieCtrl.get_movie);
router.get("/get_search_movie/:name", movieCtrl.get_search_movie);
router.get("/get_search_title/:name", movieCtrl.get_search_title);
router.post("/addToWatchLater", movieCtrl.addToWatchLater);
router.post("/checkWatchLater", movieCtrl.checkWatchLater);
router.post("/addToLikeList", movieCtrl.addToLikeList);
router.post("/checkLiked", movieCtrl.checkLiked);

router.post("/getWatchLaterList", movieCtrl.getWatchLaterList);
router.post("/removeWatchLater", movieCtrl.removeWatchLater);
router.post("/getLikedList", movieCtrl.getLikedList);
router.post("/getHistoryList", movieCtrl.getHistoryList);
router.post("/updateHistoryList", movieCtrl.updateHistoryList);
router.post("/addComment", movieCtrl.addComment);
router.post("/getComments", movieCtrl.getComments);
// router.post("/deleteComments",movieCtrl.deleteComments);





module.exports = router;

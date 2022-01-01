import Express from "express";
import { getUsers, getUserById, createUser } from "../controllers/userController.js";
const router = Express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

// router.get('/users', getUsers);
router.route('/users').get(getUsers);
router.route('/createUser').post(createUser);

router.route('/:id').get(getUserById)

export default router;
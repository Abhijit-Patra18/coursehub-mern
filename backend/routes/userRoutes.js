import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import validateUser from "../middleware/validateUser.js";
import validateLogin from "../middleware/validateLogin.js";
import { login, register } from "../controllers/userController.js";


router.post("/register", validateUser, wrapAsync(register));

router.post("/login", validateLogin, wrapAsync(login));


export default router;
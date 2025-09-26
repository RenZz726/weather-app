import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";

const router = Router();

router.post("/signin", signIn);

router.post("/signUp", signUp);

export const handleAuth = router;
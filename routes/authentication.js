import { Router } from "express";
// import { getLoginDetails } from "../controllers/loginController.js";
// import { toSignUp } from "../controllers/signUPController.js";

const router = Router();

router.post("/signin", (req, res) => {
    const data = req.body;

    if(!data) {
        return res.json({ error: "Enter username"});
    } 
    
    // function
})

router.post("/signup", (req, res) => {
    const data = req.body;

    if(!data) {
        return res.json({ error: "Enter valid username"});
    } 

    // function
})
export const handleAuth = router;
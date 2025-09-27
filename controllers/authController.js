import { signInUser, signUpUser } from "../services/authService.js"

export async function signIn (req, res) {
    // res.json(req.body);
    const { username, password } = req.body;

    if( !username || !password ) {
        return res.json({ error: "Fill Useraname & password" });
    } 
    try {
        const result = await signInUser(username, password);
        res.json(result);
    } catch {
        res.status(400).json({ message: "Error in sigin" });
    }
}

export async function signUp (req, res) {
    
    const { username, password } = req.body;

    if( !username || !password ) {
        return res.json({ error: "Fill username & password" });
    }
    try {
        const result = await signUpUser(username, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: "Error in signup"})
    }

}

import { getDB } from "../db.js";
import bcrypt from "bcrypt";

export async function signInUser (username, password) {
    let db;
    try {
        db = await getDB();
        
        const user = await db.get(`SELECT password FROM users WHERE username == ?`, [username]);
        if (!user) {
            return { message: "User does not exist" }
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return { message: "Login Successful" };
        } else {
            return { message: "Invalid username or password" }
        }

    } catch (err) {
        console.log("signin error ", err);
        return { message: "db error" };
    } finally {
        if(db) await db.close();
    }
    
}

export async function signUpUser (req, res) {
    // code 
}
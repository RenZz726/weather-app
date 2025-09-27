import { getDB } from "../db.js";
import bcrypt from "bcrypt";

export async function signInUser (username, password) {
    let db;
    try {
        db = await getDB();
        
        const user = await db.get(`SELECT password FROM users WHERE username = ?`, [username]);
        if (!user) {
            return { message: "User does not exist" }
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return { success: true, message: "Login Successful" };
        } else {
            return { success: false, message: "Invalid username or password" }
        }

    } catch (err) {
        console.log("signin error ", err);
        return { message: "db error" };
    } finally {
        if(db) await db.close();
    }
    
}

export async function signUpUser (username, password) {
    let db;
    try {
        db = await getDB();

        const existing = await db.get(`SELECT password FROM users WHERE username = ?`, [username]);
        if(existing) {
            return { message: "user already exists" };
        }
        
        const hashed = await bcrypt.hash(password, 10);
        
        const insert = await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashed]);
        return { success: true, message: "SignUp Successful"}

    } catch (err) {
        console.error(`signup error: ${err}`);
        return { success: false, message: "db error" };
    } finally { 
        if(db) await db.close();
    }
}
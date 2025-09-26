import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

async function dbInitialize() {
    const db = await open({ filename: "users.db", driver: sqlite3.Database });
    await db.exec(` CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
        )`);
    await db.close();
}
dbInitialize();

app.post("/signin", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const db = await open({ filename: "users.db", driver: sqlite3.Database });

    // const insert = await db.prepare("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    // insert.run("renson", "rens");
    // insert.finalize();


    // const hashed = await bcrypt.hash(password, 10);
    
    // console.log(hashed);
    
    try {
        const dbpassword = await db.get(`SELECT password FROM users WHERE username == ?`, [username])
        const isMatch = await bcrypt.compare(password, dbpassword.password);
        // console.log(isMatch);
        res.json(isMatch ? "Password Match" : "Incorrect Password");
    } catch {
        console.error(err);
        res.status(500).json({message: "Something went wrong"})
    } finally {
        await db.close();
    }

});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const db = await open({ filename: "./users.db", driver: sqlite3.Database });
 
    try {
        const isAvail = await db.get(`SELECT username FROM users WHERE username == ?`, [username]);
        
        if(isAvail) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const insert = await db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);


        try {
            await insert.run(username, hashed);
        } finally {
            await insert.finalize();
        }

        res.json({ message: "signup Successful"});
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "something went wrong"});
    } finally {
        await db.close();
    }
})

app.listen(5000, () => {
  console.log("Listening at port 5000");  // run only after server is ready
});

// async function run() {
    

//     const username = "sussddidf";
//     const password = "j23@323j";

    

//     const hashed = await bcrypt.hash(password, 10);
//     await insert.run(username, hashed);
//     await insert.finalize();
//     console.log(username, hashed);

//     const ismatch = await bcrypt.compare(password, "$2b$10$.RwA.gFZ4hRXJbzkswGQqeXK9Kn/zeCBWiit2RwLF0woFq9ckeHH2");
//     if (ismatch) {
//         console.log("matched");
//     } else {
//         console.log("Incorrect")
//     }
//     db.close();
    
// }



import sqlite3 from "sqlite3";
import { open } from "sqlite";


export async function getDB() {
    const db = await open({ filename: "users.db", driver: sqlite3.Database });
    await db.exec(` CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
        )`);
    
    return db;
}




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



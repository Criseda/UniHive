//import pool from db.js
const pool = require("../../db");
const fs = require("fs");
// insert all data from insert.sql into the database

const insertData = async () => {
    // read the insert.sql file
    const sql = fs.readFileSync(__dirname + "/sqls/insert.sql").toString();
    try {
        await pool.query(sql);
        console.log("Data inserted successfully");
    }
    catch (err) {
        console.log(err);
    }
    finally {
        pool.end();
    }
}

// make it so that i can call this insertData function from the command line
if (require.main === module) {
    insertData();
}
// the command to run this file is: node insert-data.js
const sqlite3 = require("sqlite3").verbose();
let sql;


// connect to database
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

// Create table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, email, password)`; 
// db.run(sql);

// Drop table
// db.run('DROP TABLE users');

// Insert data into database
// sql = `INSERT INTO users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
// db.run(
//     sql, 
//     ['ee', 'Eee', '123214', 21312], 
//     (err) => {
//         if (err) return console.error(err.message);   
//     }
// );

// Update data
sql = `UPDATE users SET first_name = ? WHERE id = ?`;
db.run(sql, ['lsdkf', 2], (err) => {
    if (err) return console.error(err.message);
}) 

// Delete data from database
sql = `DELETE FROM users WHERE id=?`;
db.run(sql, [1], (err) => {
    if (err) return console.error(err.message);
});

// Query database
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach(element => {
        console.log(element);
    });
});
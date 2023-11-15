const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employee'
})

app.post('/create', (req, res) => {
    console.log('success');
    const name = req.body.name;
    const roll = parseInt(req.body.roll);
    const batch = req.body.batch;
    const blood = req.body.blood;
    const height = req.body.height;
    var sql = 'INSERT INTO data (name,roll,batch,blood,height) VALUES(?,?,?,?,?)';
    db.query(sql, [name, roll, batch, blood, height], (err, res) => {
        if (err) {
            console.error('Error inserting data:', err);
            throw err;
        }
        console.log('Data inserted successfully');
        // Close the connection
    });
})

app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM data';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Error fetching data' });
        }
        return res.status(200).json(data);
    });
});

app.listen(3001, () => {
    console.log(`Server is running localhost:3001`);
});

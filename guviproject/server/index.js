const express = require('express');
const app = express();
const cors = require("cors");

const mysql = require('mysql2')

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    port: '3306',
    password: '',
    database: 'auth'
})


app.post("/select", (req, res) => {
    const email= req.body.email
    // console.log(email)
    db.query(
        'SELECT * FROM users where email=?',[email], (err, result) => {
        if (err) {
            
            console.log(err)
        }
        
        res.send(result)
    })
})


app.post('/register', (req, res) => {

    const name = req.body.name
    const email= req.body.email
    const password = req.body.password
    console.log(req.body);

    db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
            if(!err)
            res.send(message = "User Registered")
            else
            res.send(err)
        }
    )
})

app.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
console.log(req);
    db.query(
        "SELECT * FROM users WHERE email= ? AND password = ?", 
            [email, password],
            (err, result) => {
                // if(err) {
                //     res.send({err: err});
                // }  
                
                if (result.length > 0) {

                    
                        res.send(result)
                        
                    } else {
                        // console.log(result);
                        res.send({message: "Wrong username/password combination."});
                    }
                } 
    )
})
app.post('/update', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const age = req.body.age;
    const mobile = req.body.mobile;
    const dob = req.body.dob;
    // const password = req.body.password;
    db.query("UPDATE users SET name = ?, gender = ?, age= ?, mobile = ?, dob = ? WHERE email = ?",[name,gender,age,mobile,dob,email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(message="User data updated successfully!");
        }
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
});
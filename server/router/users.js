const app = require('express').Router();
const pool = require('../database');
const jwtGen = require('../utils/jwtGen')
const validInfo = require('../middleware/validInfo')
const bcrypt = require('bcrypt')
// app.post('/contact', (req, res)=>{
//     res.send(req.body);
// });

//CRUD Create, retrieve, update, delete

// TEST
app.post('/', (req, res) => {
    res.send(req.body.name);
});

//Sign up, register (create)
app.post('/register',validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        
        const newUser = await pool.query(`INSERT INTO users_tab(
        username,
        email, 
        password)
        VALUES($1, $2, $3) RETURNING *;`,
            [name, email, bcryptPassword])
            
        //res.json(newUser.rows)
        const token = jwtGen(newUser.rows[0].user_id)
        res.json({token})
    } catch (err) {
        console.log(err.message)
    }

});

app.post('/login', validInfo, async (req,res)=>{
    const {email, password} = req.body;

    const user = await pool.query('SELECT * FROM users_tab where email = $1 ', [email])

    if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGen(user.rows[0].user_id);
      return res.json({ jwtToken });

})

//Get user (retrieve) (admin)
app.get('/:id', (req, res) => {
    //get user id from params
    var id = req.params.id;

    //if no id returns err 400
    if (!id) {
        return res.status(400).json({
            error: 'No ID provided!'
        });
    }

    //returns user, based on the id input in params
    const user = users[id];

    //if no such user, returns user not found
    if (!user) {
        return res.status(404).json({
            error: 'User not found!'
        })
    }//if no send back the user info
    res.send({
        id,
        name: user.name,
        email: user.email,
        password: user.password,

    });
});

//Update user, user's account name (update)
app.put('/profile/:id', async (req, res) => {
    try {
        var user_id = req.params.id;
        const username = req.body.username
        const profile = await pool.query(`UPDATE users_tab
        SET username = $1
        WHERE user_id = $2`,
            [username, user_id])
        //console.log("Updated successfully?") currently shows empty array
        res.json(profile.rows)
    } catch (err) {
        console.log(err.message)
    }
    // if (username.length === 0) {
    //     console.log('Please enter a new username');
    // }
});

//Update user, user's password (update)
app.put('/pw/:id', async (req, res) => {
    try {
        var user_id = req.params.id;
        const password = req.body.password
        const newPassword = await pool.query(`UPDATE users_tab
        SET password = $1
        WHERE user_id = $2`,
            [password, user_id])
        //console.log("Updated successfully?") currently shows empty array
        res.json(newPassword.rows)
    } catch (err) {
        console.log(err.message)
    }
    //if pw field is empty, prompt user
    // if (pw.length === 0) {
    //     console.log('Please enter a new password');
    // }
});

//delete account/user (delete)
app.delete('/acc/:id', async (req, res) => {
    try {
        var user_id = req.params.id;
        const deleteAcc = await pool.query(`DELETE FROM users_tab WHERE user_id = $1`,
        [user_id])
        res.send(deleteAcc.rows)
    } catch (err) {
        console.log(err.message)
    }

});

module.exports = app;
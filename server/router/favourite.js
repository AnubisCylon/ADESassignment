// require('dotenv').config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require('../database');


// const jwt = require('jsonwebtoken');

// //middleware
// app.use(cors());
// app.use(express.json());

// //ROUTES//

// // create a netflix

// app.post("/fav", authenticateToken, async (req, res) => {
//     try {
//         const { movie, user } = req.body;
//         const newFav = await pool.query(
//             "INSERT INTO Fav_tab (movie_id, user_id) VALUES($1, $2) RETURNING *",
//             [movie, user]
//         );

//         res.json(newFav.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // get 

// app.get("/list", async (req, res) => {
//     try {
//         const allFav = await pool.query("SELECT * FROM fav_tab");
//         res.json(allFav.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.jwtSecret, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user 
//         next()
//     })
// }

// // get

// app.get("/netflix/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const netflix_user = await pool.query("SELECT * FROM fav_tab WHERE fav_id = $1", [id]);

//         res.json(netflix_user[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // delete

// app.delete("/delete", authenticateToken, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteNetflix = await pool.query("DELETE FROM fav_tab WHERE fav_id = $1",
//             [id]);
//         res.json("movie is removed from favourites!");
//     } catch (err) {
//         console.error(err.message);
//     }
// });













require('dotenv').config();

const pool = require('../database');
const router = require('express').Router();
// const verifyy = require('../middleware/verify')
// const jwt = require('jsonwebtoken');
// const JwtGen = 

//ROUTES//

// create a netflix

// router.post("/fav", authenticateToken, async (req, res) => {
//     try {
//         const { movie, user } = req.body;
//         const newFav = await pool.query(
//             "INSERT INTO Fav_tab (movie_id, user_id) VALUES($1, $2) RETURNING *",
//             [movie, user]
//         );

//         res.json(newFav.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });


router.post("/fav", async (req, res) => {
    try {
        const { movie, user } = req.body;
        const newFav = await pool.query(
            "INSERT INTO Fav_tab (movie_id, user_id) VALUES($1, $2) RETURNING *",
            [movie, user]
        );
        
        res.json(newFav.rows)
        // jwt.verify(data.jwtToken, 'jwtSecret', (err, jwtToken) => {
            
        //     res.send(data.jwtToken)
        //});
    } catch (err) {
        console.error(err.message);
    }
});


// get 

router.get("/list", async (req, res) => {
    try {
        const allFav = await pool.query(`select u.username, m.movie_title , m.movie_description, m.movie_genre, m.movie_actors
        FROM fav_tab AS f
         INNER JOIN movie_tab AS m 
        ON f.movie_id = m.movie_id 
        INNER JOIN users_tab AS u
        ON f.user_id = u.user_id`);
        res.json(allFav.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user 
//         next()
//     })
// }

// get

router.get("/netflix/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const netflix_user = await pool.query("SELECT * FROM fav_tab WHERE fav_id = $1", [id]);

        res.json(netflix_user[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// delete

router.delete("/delete", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteNetflix = await pool.query("DELETE FROM fav_tab WHERE fav_id = $1",
            [id]);
        res.json("movie is removed from favourites!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
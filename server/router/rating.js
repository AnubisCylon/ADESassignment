const app = require('express').Router();
const pool = require('../database');
const jwt = require('jsonwebtoken');
const validInfo = require('../middleware/verify');
const router = require('./favourite');


// get all ratings
router.get('/', async(req,res) => {
    try{
        const rating = await pool.query (`SELECT * FROM ratings_tab`)
        res.json(rating.rows)
    }catch(err) {
        console.log(err.message)
    }
})

// get a rating
router.get('/:userid', async(req,res) => {
    try{
        var userid = req.params.userid;
        const rating = await pool.query (`SELECT * FROM ratings_tab WHERE user_id = $1`, [userid])
        res.json(rating.rows)
    }catch(err) {
        console.log(err.message)
    }
})

// // adding a rating
// app.post('/rate', async(req, res)=>{
// try{
//     const {uid, mid, rating} = req.body
//     const newRating = await pool.query(`INSERT INTO ratings_tab (user_id, movie_id, like_dislike)
//     VALUES($1, $2, $3) RETURNING *;`,
//     [uid, mid, rating])
//     res.json(newRating.rows)
// }catch (err) {
//         console.log(err.message)
//     }
// });



// adding a rating
router.post('/rate', async(req, res)=>{
    try{
        const {uid, mid, rating} = req.body
        const newRating = await pool.query(`INSERT INTO ratings_tab (user_id, movie_id, like_dislike)
        VALUES($1, $2, $3) RETURNING *;`,
        [uid, mid, rating])
        // var token = jwt.sign({newRating: newRating}, 'secretkey')
        // res.json({token});
        res.json(newRating.rows)
        
    }catch (err) {
            console.log(err.message)
        }
    });


// // update ratings
// app.put('/thumbs/:sn', async (req, res) => {
//     try {
//         var sn = req.params.sn;
//         const thumbs = req.body.thumbs
//         const rate = await pool.query(`UPDATE ratings_tab
//         SET like_dislike = $1
//         WHERE sn=$2`,
//             [thumbs, sn])
//         res.send(rate.row)
//     } catch (err) {
//         console.log(err.message)
//     }
// });

// update ratings
router.put('/thumbs/:sn', validInfo, async (req, res) => {
    try {
        var sn = req.params.sn;
        const thumbs = req.body.thumbs
        const rate = await pool.query(`UPDATE ratings_tab
        SET like_dislike = $1
        WHERE sn=$2`,
            [thumbs, sn])
        jwt.sign({rate: rate}, 'secretkey', (err, token) => {
        res.json({token});
        });
    } catch (err) {
        console.log(err.message)
    }
});

// // update ratings
// app.put('/thumbs/:uid/:mid', async (req, res) => {
//     try {
//         var uid = req.params.uid;
//         var mid = req.params.mid;
//         const thumbs = req.body.thumbs
//         const rate = await pool.query(`UPDATE ratings_tab
//         SET like_dislike = $1
//         WHERE user_id=$2 AND movie_id=$3`,
//             [thumbs, uid, mid])

//         jwt.sign({rate: rate}, 'secretkey', (err, token) => {
//         res.json({token});
//         });

//     } catch (err) {
//         console.log(err.message)
//     }
// });




// remove a rating
router.delete('/null/:sn', async(req,res) => {
    try{
        var sn = req.params.sn;
        const remove = await pool.query (`DELETE FROM ratings_tab WHERE sn=$1`, [sn])
        res.send(remove.rows)
    }catch(err) {
        console.log(err.message)
    }
})


module.exports = router;
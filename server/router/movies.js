const router = require('express').Router();
const pool = require('../database');
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './Images')
//     },
//     filename: function(req, file,cb){
//         cb(null, Date.now() + path.extname(file.originalname))

//     }
// })
// const upload = multer({storage: storage})


router.post('/movie',async(req, res)=>{
    try {
    const {title,description,genre,actors,year,duration,image,href} = req.body
    const movie = await pool.query(`INSERT INTO movie_tab(
        movie_title,
        movie_description,
        movie_genre,
        movie_actors,
        year_released,
        movie_length,
        movie_poster,
        movie_href)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `,
        [title,description,genre,actors,year,duration,image,href]
        )   
        
        res.json(movie.rows)

    }catch (err) {
        
        console.log(err.message)
    }
})


router.get('/getMov', async(req,res) => {
    try{
        const allMovies = await pool.query ("SELECT * FROM movie_tab")
        res.json(allMovies.rows)
    }catch(err){
        console.log(err.message)
    }
   
})

    // res.json(movieArr)

router.get('/getbygenre', async(req,res)=>{
    try{
        const {genre} = req.body
        const movie = await pool.query("SELECT * FROM movie_tab WHERE movie_genre @> $1",[genre])
        
        res.json(movie.rows)
    }catch (err) {
        console.log(err.message)
    }
})

router.get('/genreDrama', async(req,res)=>{
    try{
       
        const movie = await pool.query("SELECT * FROM movie_tab WHERE 'Drama' = ANY(movie_genre) ")
        
        res.json(movie.rows)
    }catch (err) {
        console.log(err.message)
    }
})

router.get('/genreAction', async(req,res)=>{
    try{
       
        const movie = await pool.query("SELECT * FROM movie_tab WHERE 'Action' = ANY(movie_genre) ")
        
        res.json(movie.rows)
    }catch (err) {
        console.log(err.message)
    }
})

router.get('/genreRomance', async(req,res)=>{
    try{
       
        const movie = await pool.query("SELECT * FROM movie_tab WHERE 'Romance' = ANY(movie_genre) ")
        
        res.json(movie.rows)
    }catch (err) {
        console.log(err.message)
    }
})




router.get('/getbytitle', async(req,res)=>{
    try{
        const {title} = req.body
        const movie = await pool.query('SELECT * FROM movie_tab WHERE movie_title = $1', [title])
        res.send(movie.rows)

    }catch(err) {
        console.log(err.message)
    }
})

// router.put('/update', async(req,res)=>{
//     try{

//         const {description,genre,actors,year,duration,image,href,title} = req.body
//         const movie = await pool.query(`UPDATE movie_tab SET 
//             movie_description = $1,
//             movie_genre = $2,
//             movie_actors = $3,
//             year_released = $4,
//             movie_length = $5,
//             movie_poster= $6,
//             movie_href = $7,
//             WHERE movie_title = $8
//             VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
//             [description,genre,actors,year,duration,image,href,title]
//             )   
            
//             res.json(movie.rows)
//     }catch(err){
//         console.log(err.messsage)

//     }
// })

router.delete('/delid', async(req,res)=>{
    try{
        const {id} = req.body
        const movie = await pool.query('DELETE FROM movie_tab WHERE movie_id= $1', [id])
        res.send('Movie removed from Database by id')

    }catch(err) {
        console.log(err.message)
    }
})

router.delete('/delMov', async(req,res)=>{
    try{
        const {title} = req.body
        const movie = await pool.query('DELETE FROM movie_tab WHERE movie_title= $1', [title])
        res.send('Movie removed from Database')

    }catch(err) {
        console.log(err.message)
    }
})

module.exports = router;


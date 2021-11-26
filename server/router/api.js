const router = require('express').Router();
const MovieRouter = require('./movies');
const UserRouter = require('./users')

// const FavRouter = require('./favourite')



router.use('/movies', MovieRouter);
router.use('/users', UserRouter)

const Quote = require('inspirational-quotes');
console.log(Quote.getQuote());
// router.use('/favourite' , FavRouter)

module.exports = router;
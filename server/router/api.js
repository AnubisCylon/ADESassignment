const router = require('express').Router();
const MovieRouter = require('./movies');
const UserRouter = require('./users')
const UserRating = require('./rating')
const UserFav = require('./favourite')

// const FavRouter = require('./favourite')



router.use('/movies', MovieRouter);
router.use('/users', UserRouter);
router.use('/rating', UserRating);
router.use('/favs', UserFav);


const Quote = require('inspirational-quotes');
console.log(Quote.getQuote());
// router.use('/favourite' , FavRouter)

module.exports = router;
let express = require('express');
let router = express.Router();
let ctrlHotels = require('../controllers/hotels.controller.js')
let ctrlReviews = require('../controllers/reviews.controller.js')

router
.route('/hotels')
.get(ctrlHotels.hotelsgetall)


router
.route('/newhotel')
.post(ctrlHotels.hotelsaddnew);

router
.route('/hotels/:_id')
.get(ctrlHotels.hotelsgetone)
.put(ctrlHotels.hoteleditone)
.delete(ctrlHotels.hoteldeleteone);
// Reviews Routes
router
.route('/hotels/:_id/reviews')
.get(ctrlReviews.reviewsgetall)
.post(ctrlReviews.reviewaddone);

router
.route('/hotels/:_id/reviews/:reviewid')
.get(ctrlReviews.reviewsgetone)
.put(ctrlReviews.reviewseditone)
.delete(ctrlReviews.reviewsdeleteone);


module.exports = router;
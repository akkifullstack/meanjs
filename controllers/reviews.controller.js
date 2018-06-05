let mongoose = require('mongoose');
let hotel = mongoose.model('Hotel');


module.exports.reviewsgetall = function(req, res) {
	let hotelid = req.params._id;

	
	hotel
		.findById(hotelid)
		.exec(function(err, doc) {
			console.log(hotelid)
			res
				.status(200)
				.json(doc.reviews);
		})
}

module.exports.reviewsgetone = function(req, res) {
	let hotelid = req.params._id;
	let reviewId = req.params.reviewid;

	console.log("GET reviewId"    +    reviewId + "    for hotelid       "    + hotelid)

	
	hotel
		.findById(hotelid)
		.select('reviews')
		.exec(function(err, hot) {
			console.log("Returned hotel",reviewId)
			let review = hot.reviews.id(reviewId);
			res
				.status(200)
				.json(review);
		})


}

let _addReview = function(req, res, hotel){
	hotel.reviews.push({
		name: req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	})

	hotel.save(function(err, hotelUpdated){
		if(err){
			res.
				status(500)
				.json(err)
		}
		else{
			res.
				status(201)
				.json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
		}
	})
}

module.exports.reviewaddone = function(req,res){
	let hotelid = req.params._id;

	
	hotel
		.findById(hotelid)
		.exec(function(err, doc) {
			let response = {
				status: 200,
				message : []
			};
			if(err) {
				console.log("Error finding hotel")
				response.status(500);
				response.message(err);
			}else if(!doc){
				console.log("Error finding hotel", id);
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found" + id
				}
			}
			if(doc) {
				_addReview(req, res, doc);
			}else {
				res
					.status(response.status)
			}
})

}
module.exports.reviewseditone = function(req, res){
		let hotelid = req.params._id;
		let reviewId = req.params.reviewid;

	
	hotel
		.findById(hotelid)
		.exec(function(err, doc) {
			let response = {
				status: 200,
				message : doc
			};
			if(err) {
				console.log("Error finding hotel")
				response.status(500);
				response.message = err;
			}else if(!doc){
				console.log("Error finding hotel", id);
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found" + id
				}
			}else{
				thisReview = doc.reviews.id(reviewId)
				if(!thisReview){
					response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
		}
			}
			if(response.status !== 200){
				res
					.status(500)
					.json(response.message)
			}else{
				thisReview.name = req.body.name,
				thisReview.rating  = parseInt(req.body.rating, 10),
				thisReview.review  = req.body.review

				doc.save(function(err, updatedReview){
					if(err){
						res
							.status(500)
							.json(err)
					}
					else
						{
						res
							.status(201)
							.json(updatedReview)
						}
			})
		}
	});
}

module.exports.reviewsdeleteone = function(req, res ){
		let hotelid = req.params._id;
		let reviewId = req.params.reviewid;

	
	hotel
		.findById(hotelid)
		.exec(function(err, doc) {
			let response = {
				status: 200,
				message : doc
			};
			if(err) {
				console.log("Error finding hotel")
				response.status(500);
				response.message = err;
			}else if(!doc){
				console.log("Error finding hotel", id);
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found" + id
				}
			}else{
				thisReview = doc.reviews.id(reviewId)
				if(!thisReview){
					response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
		}
	}
	if(response.status !== 200){
		res
			.status(500)
			.json(response.message)
	}else{
		doc.reviews.id(reviewId).remove()

		doc.save(function(err, updatedReview){
			if(err){
				res
					.status(500)
					.json(err)
			}
			else
				{
				res
					.status(201)
					.json()
				}
		})
	}
});
}
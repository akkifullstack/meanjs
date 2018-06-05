let mongoose = require('mongoose');
let hotel = mongoose.model('Hotel')

module.exports.hotelsgetall = function(req, res){

	let offset = 0;
	let count = 5;
	if (req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}
	if (req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

hotel.
	find()
	.skip(offset)
	.limit(count)
	.exec(function(err, hotels){
		console.log("Found hotels", hotels.length);
		res
			.json(hotels);
		});

	// collection
	// 	.find()
	// 	.skip(offset)
	// 	.limit(count)
	// 	.toArray(function(err, docs) {
	// 		console.log("Found hotels", docs)
	// 		res
	// 			.status(200)
	// 			.json(docs)			
	
	// let docs = collection.find();

	// console.log("GET THE hotels",db);
	// console.log(req.query);

	// let offset = 0;
	// let count = 5;
	// if (req.query && req.query.offset){
	// 	offset = parseInt(req.query.offset, 10);
	// }
	// if (req.query && req.query.count){
	// 	count = parseInt(req.query.count, 10);
	// }
	// var returnData = hoteldata.slice(offset, offset+count);
	// res
	// 	.status(200)
	// 	.json( returnData );
}

module.exports.hotelsgetone = function(req, res){

	let hotelid = req.params._id;

	
	hotel
		.findById(hotelid)
		.exec(function(err, doc) {
			res
				.status(200)
				.json(doc);
		})

		console.log("GET hotel", hotelid);

}

module.exports.hotelsaddnew = function(req, res, next){
	// console.log(req.body)
	let name = req.body.name
	let location = req.body.location
 let hot = new hotel({
 	name : name,
 	location : location
 })
 hot.save().then((hoti) => {
    // assert(hoti === 'DONE', 'should change state');
  console.log(hoti);
  })
  .catch((error) => {console.log("No data inserted",error);
  });;
}

module.exports.hoteleditone = function(req, res){
	let hotelid = req.params._id;
	hotel
		.findById(hotelid)
		.select("-reviews")
		.exec(function(err, doc) {
			let response = {
				status: 200,
				message : doc
			};
			if(err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}else if(!doc){
				console.log("Error finding hotel", id);
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found" + id
				}
			}
			if(response.status !== 200){
				res
					.status(response.status)
					.json(response.message)
			} else {
				doc.name = req.body.name,
 				doc.location = req.body.location
			}
			doc.save(function(err, hotelUpdated){
				if(err){
					res
						.status(500)
						.json(err)
				}else{
					res
						.status(204)
						.json(hotelUpdated) 
				}
			})
});
}

module.exports.hoteldeleteone = function( req, res){
	let hotelid = req.params._id;

	hotel
		.findByIdAndRemove(hotelid)
		.exec(function(err, hotel){
			if(err){
				res
					.status(404)
					.json(err)
			}else{
				res
					.status(204)
					.json();
			}
		})
}
let mongoose = require('mongoose');

let reviewsSchema = new mongoose.Schema({
	name : {
		type:String,
		required: true
	},
	rating : {
		type:Number,
		min: 0,
		max: 5,
		required : true
	},
	review : {
		type : String,
		required : true
	},
	createdOn:{
		type: Date,
		default: Date.now
	}
})

// let roomSchema = new mongoose.Schema({
// 	type:String,
// 	number : Number,
// 	description : String,
// 	photos : [String],
// 	price : Number
// })

let hotelSchema = new mongoose.Schema({
	name : {
		type:String,
		required: true
	},
	// star : {
	// 	type:Number,
	// 	min: 0,
	// 	max: 5,
	// 	default: 0
	// },
	// services : [String],
	// description :{
	// 	type:String,
	// 	required: true
	// },
	// photos : [String],
	// currency : {
	// 	type:String,
	// 	required: true
	// },
	reviews : [reviewsSchema],
	// rooms :[roomSchema],
	location : String
	 // {
	// 	address : String,
	// 	coordinates : {
	// 		type: [Number],
	// 		index : '2dsphere'
			
	// 	}
	// }

})


mongoose.model('Hotel', hotelSchema);

let mongoose = require('mongoose');
let dburl = 'mongodb://localhost:27017/meanhotels';

mongoose.connect(dburl);

mongoose.connection.on('connected',function() {
	console.log("Mongoose connected to" +  dburl)
}
);

mongoose.connection.on('disconnected',function(){
	console.log("Mongoose disconnected")
});

mongoose.connection.on('error',function(err){
	console.log("Mongoose connected error" +  err);
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected(SIGNT)');
		process.exit(0);

	})
})

process.on('SIGTERM', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected(SIGTERM)');
		process.exit(0);

	})
})

process.once('SIGUSR2', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination(SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');

	})
})


//Bring In SCHEMAS And MODELS

require('./hotels.models.js');
const mongoose = require('mongoose');
const moment = require('moment');

const rideSchema = new mongoose.Schema({
	driver_id: {
		type: Number,
		default: 0
	},
	customer_id: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		default: 'waiting'
	},
	location: {
		type: String
	},
	booked_at: {
		type: Date,
		default: Date.now
	},
	started_at: {
		type: Date
	},
	end_at: {
		type: Date
	}
});

rideSchema.methods.start = function (driver_id) {
	this.started_at = new Date();
	this.driver_id = driver_id;
	this.status = 'ongoing';
}

rideSchema.methods.stop = function () {
	this.end_at = moment(this.started_at).add(5, 'minutes').format();
	this.status = 'complete';
}

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
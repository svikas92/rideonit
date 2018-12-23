const cron = require('node-cron');
const moment = require('moment');

const completeRide = async () => {
	const Ride = require('../models/ride');
	const now = new Date(Date.now());
	now.setMinutes(now.getMinutes() - 5);
	const rides = await Ride.find({ $and: [{ status: 'ongoing' }, { started_at: { $lte: now } }] });

	return rides.reduce((chain, ride) => chain.then(async () => {
		ride.stop();
		await ride.save();
	}), Promise.resolve());
};
module.exports = function () {
	cron.schedule('* * * * *', completeRide);
};
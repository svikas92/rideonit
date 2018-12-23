const Ride = require("../models/ride");
const express = require("express");
const router = express.Router();
const EventEmitter = require('events');

router.get("/customerapp.html", async (req, res) => {
	res.render(__basedir + '/views/customerapp.ejs');
});

router.get("/driverapp.html", async (req, res) => {
	const driver_id = req.query.id;
	if (!driver_id) return res.status(400).send('invalid provide driver id');

	const rides = await Ride.find()
		.select('-__v').sort('end_at');

	const driverRides = { waiting: [], ongoing: [], complete: [] };
	rides.map((ride) => {
		if (ride.status == 'waiting') {
			driverRides.waiting.push(ride);
		} else {
			if (ride.driver_id == driver_id)
				switch (ride.status) {
					case 'ongoing':
						driverRides.ongoing.push(ride);
						break;
					default:
						driverRides.complete.push(ride);
						break;
				}
		}
	});

	function dateDiff(date1, date2) {
		//Get 1 day in milliseconds
		var one_day = 1000 * 60 * 60 * 24;

		// Convert both dates to milliseconds
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;
		//take out milliseconds
		difference_ms = difference_ms / 1000;
		var seconds = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var minutes = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var hours = Math.floor(difference_ms % 24);
		var days = Math.floor(difference_ms / 24);

		let str = '';

		if (hours > 0) str += hours + ' hour(s), ';
		minutes >= 1 ? str += minutes + ' min(s)' : str += 'less than a min ';

		return str;
	}

	res.render(__basedir + '/views/driverapp.ejs', { rides: driverRides, dateDiff, driver_id });
});

router.get("/dashboard.html", async (req, res) => {
	const rides = await Ride.find()
		.select("-__v")
		.sort("end_at");

	function dateDiff(date1, date2) {
		//Get 1 day in milliseconds
		var one_day = 1000 * 60 * 60 * 24;

		// Convert both dates to milliseconds
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;
		//take out milliseconds
		difference_ms = difference_ms / 1000;
		var seconds = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var minutes = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var hours = Math.floor(difference_ms % 24);
		var days = Math.floor(difference_ms / 24);

		let str = '';

		if (hours > 0) str += hours + ' hour(s), ';
		minutes >= 1 ? str += minutes + ' min(s)' : str += 'less than a min ';

		return str;
	}

	res.render(__basedir + '/views/dashboard.ejs', { rides, dateDiff });
});

module.exports = router;

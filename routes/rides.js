const Ride = require("../models/ride");
const express = require("express");
const router = express.Router();
const moment = require('moment');
const EventEmitter = require('events');

router.post("/list", async (req, res) => {
	const rides = await Ride.find()
		.select("-__v")
		.sort("end_at");
	res.send(rides);
});

router.post("/book", async (req, res) => {
	const customer_id = req.body.customer_id;
	if (!customer_id) return res.status(400).send('enter customer id');

	let ride = new Ride({
		customer_id: customer_id
	});
	ride = await ride.save();

	res.sendStatus(200);
});

router.post('/:ride_id/start', async (req, res) => {
	const ride_id = req.params.ride_id;
	const driver_id = req.body.driver_id;
	if (!driver_id) return res.status(400).send('provide valid driver id');

	const ride = await Ride.findById(ride_id);
	if (ride.driver_id != 0) return res.sendStatus(400);

	ride.start(driver_id);
	await ride.save();

	// const begin = setTimeout(async () => {
	// 	ride.stop();
	// 	await ride.save();
	// 	clearTimeout(begin);
	// }, 5 * 60 * 1000);

	res.sendStatus(200);
});

module.exports = router;

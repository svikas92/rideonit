const mongoose = require('mongoose');

module.exports = function () {
	const db = 'mongodb://ola_usr:olauser7@ds141924.mlab.com:41924/olaapp';
	mongoose.connect(db, { useNewUrlParser: true })
		.then(() => console.log(`Connected to db - olaapp ...`));
}
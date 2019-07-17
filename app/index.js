const express = require('express')
const app = express()
const port = 4444
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

// Set up the api, /api will be used for now.
app.post('/api',(request,response) => {
	// Get the body of the request, this is from calorie_calc.js and will contain a UUID and an integer.
	const data = request.body;
	// Respond to the get request and send another object containing the status, uuid and result. This is just a placeholder and sends it back to the client. From here, it will be added into a database. This database will be
	// where the users are stored. 
	response.json({
		status:'success',
		user: data.uuid,
		result: data.result
	});
});

const express = require('express');
// nedb is a lightweight mongodb
const Datastore = require('nedb');
const app = express();
const port = 4444;

app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// nedb's recommended way to define a database
const database = new Datastore('db/users.db');

// if the database doesnt exist, this function will create it.
database.loadDatabase();

// Set up the api, /api will be used for now.
app.post('/api', (request, response) => {
    // Get the body of the request, this is from calorie_calc.js and will contain a UUID and an integer.
    const data = request.body;
    const timestamp = Date.now();
    // add the timestamp to the data
    data.timestamp = timestamp;
    // Respond to the get request and send another object containing the status, uuid and result. This is just a placeholder and sends it back to the client. From here, it will be added into a database. This database will be
    // where the users are stored. 

    // add it to the database
    database.insert(data);

    // similarly to calorie_calc.js, this just returns it to the clientside. may not be useful.
    response.json({
        status: 'success',
        timestamp: data.timestamp,
        user: data.uuid,
        result: data.result
    });
});
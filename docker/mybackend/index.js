const express = require("express")
const cors = require('cors');

const app = express()
const queries = require('./queries')

app.use(cors());
app.use(express.json());

queries.connectToDatabase();

app.get('/',(req, res) => {
    res.send("Weather App 0.1")
  });

app.get('/hello',(req, res) => {
    res.send("Hello from weather project")
  });

// Mapping operations to endpoints
app.get('/measurement', queries.getMeasurements);
app.get('/measurement/:id', queries.getMeasurementById);
app.post('/measurement', queries.createMeasurement);
app.put('/measurement/:id', queries.updateMeasurementById);
app.delete('/measurement/:id', queries.deleteMeasurementById);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API is listening of port ${PORT}`);
});

// Creating PostgreSQL connection
const { Pool } = require('pg');

//const pgClient = new Pool({
//    user: "postgres",
//    password: "1qaz2wsx",
//    database: "postgres",
//    host: "mypostgres",
//    port: "5432"
//});

const pgClient = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: "5432"
});

pgClient.on('error', () => {
    console.log("PostgreSQL not connected");
});

// Creating and testing redis connection
const redis = require('redis');

//const redisClient = redis.createClient({
//    host: "myredis",
//    port: 6379
//});

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: 6379
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

function connectToDatabase(){
    pgClient.query(`CREATE TABLE IF NOT EXISTS measurements (
            ID SERIAL PRIMARY KEY NOT NULL,
            timestamp TEXT NOT NULL,
            measurement TEXT NOT NULL
        );`)
    .catch( (err) => {
        console.log(err);
    });
};

const createMeasurement = (request, response) => {
    const { timestamp, measurement } = request.body

    pgClient.query('INSERT INTO measurements (timestamp, measurement) VALUES ($1, $2) RETURNING ID', [timestamp, measurement], (error, result) => {
      if (error) {
        throw error
      }
      var id = result.rows[0].id;
      response.status(201).send(`Measurement ${id} added`);
      redisClient.hmset(id, 'timestamp', timestamp, 'measurement', measurement);
    });
};

const getMeasurements = (request, response) => {
  pgClient.query('SELECT * FROM measurements ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getMeasurementById = (request, response) => {
  const id = parseInt(request.params.id)

  redisClient.exists(id, (err, ok) => {
    if (err) throw err;

    if (ok == 1) {
      redisClient.hgetall(id, function(err, object) {
        if(err) throw err;
        response.status(200).header('cache', 'true').json(object);
        console.log("got from redis!");
        })
    } else {
      pgClient.query('SELECT * FROM measurements WHERE id = $1', [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows[0])
        console.log("got from psql!");
      })
    }
  });
};

const updateMeasurementById = (request, response) => {
  const id = parseInt(request.params.id)
  const { timestamp, measurement} = request.body

  pgClient.query(
    'UPDATE measurements SET timestamp = $1, measurement = $2 WHERE id = $3',
    [timestamp, measurement, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Measurement modified with ID: ${id}`)
    }
  )
};

const deleteMeasurementById = (request, response) => {
  const id = parseInt(request.params.id)

  pgClient.query('DELETE FROM measurements WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Measurement deleted with ID: ${id}`)
  })
};

// Export API
module.exports = {
  connectToDatabase,
  createMeasurement,
  getMeasurements,
  getMeasurementById,
  updateMeasurementById,
  deleteMeasurementById
}

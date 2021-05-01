// Creating PostgreSQL connection
const { Pool } = require('pg');
const pgClient = new Pool({
    user: "postgres",
    password: "1qaz2wsx",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});
pgClient.on('error', () => {
    console.log("PostgreSQL not connected");
});

// Creating and testing redis connection
const redis = require('redis');
const redisClient = redis.createClient({
    host: "myredis",
    port: 6379
});
redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

// Database access methods
function checkOrInstantiateTable(){
    pgClient.query(`CREATE TABLE IF NOT EXISTS measurements (
            ID SERIAL PRIMARY KEY NOT NULL,
            timestamp TEXT NOT NULL,
            temperature TEXT NOT NULL
        );`)
    .catch( (err) => {
        console.log(err);
    });
};

const createMeasurement = (request, response) => {
    const { timestamp, temperature } = request.body

    pgClient.query('INSERT INTO measurements (timestamp, temperature) VALUES ($1, $2) RETURNING id', [timestamp, temperature], (error, result) => {
      if (error) {
        throw error
      }
      var id = result.rows[0].id;
      response.status(201).send(`Measurement ${id} added`);
      redisClient.hmset(id, 'timestamp', timestamp, 'temperature', temperature);
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
        response.status(200).json(results.rows)
        console.log("got from psql!");
      })
    }
  });
};

const updateMeasurementById = (request, response) => {
  const id = parseInt(request.params.id)
  const { timestamp, temperature } = request.body

  pgClient.query(
    'UPDATE measurements SET timestamp = $1, temperature = $2 WHERE id = $3',
    [timestamp, temperature, id],
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
  checkOrInstantiateTable,
  createMeasurement,
  getMeasurements,
  getMeasurementById,
  updateMeasurementById,
  deleteMeasurementById
}

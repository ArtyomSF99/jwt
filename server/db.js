const Pool = require('pg').Pool
const pool = new Pool({
  user: "ttgfxtojxowsub",
  password: "978ef1cc1f9be07dfade94acfc47238913a35de4e7e07377855691979e5972ee",
  database: "d7r5lqgq2663g8",
  port: 5432,
  host: "ec2-52-212-228-71.eu-west-1.compute.amazonaws.com",
  ssl: { rejectUnauthorized: false }
})

module.exports = pool
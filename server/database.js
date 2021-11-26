const { Pool } = require('pg')
const connectionString = "postgres://rbvpbrjq:0yjqe4dVhmlxuy-aA7QWSMrSusJSynJZ@rosie.db.elephantsql.com/rbvpbrjq"

const pool = new Pool( {
    // host:'localhost',
    // port: 5432,
    // password: '1234567890',
    // user:'postgres',
    // database:'Netflix'
    connectionString
    
})

pool.query( 'SELECT NOW()', (err,res) => {
    console.log(err)
})

pool.end

module.exports = pool




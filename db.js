const postgres = require('postgres')

const sql = postgres({
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    'password': 'Manizales',
    'database': 'sportsProducts'
})

module.exports = sql
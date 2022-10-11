const data = require('./database/connect')
 data.query('select * from category')
    .then((result) => {
        console.log(result.rows)
        data.end()
    })
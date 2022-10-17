const data = require('./database/connect')

//get user
// data.query('delete from category returning *')
//     .then( result => console.log(result.rows) )


data.query(`insert into users(username, password) values ('demo', '123123') returning *`)
    .then( result => console.log(result.rows) )
// data.query(`insert into users(username, password) values ('canthoshop', '123123') returning *`)
//     .then( result => console.log(result.rows) )

data.end()
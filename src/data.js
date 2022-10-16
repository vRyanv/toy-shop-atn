const data = require('./database/connect')
const database = require("./database/connect");
 // data.query('select * from shop')
 //    .then((result) => {
 //        console.log(result.rows)
 //        data.end()
 //    })
// data.query(`insert into users(username, password) values ('admin2', '123123')`)
//     .then((result) => {
//         console.log(result)
//         data.end()
//     })
data.query('select * from users')
    .then(result => console.log(result.rows))
    // .then(data.end())
// data.query('delete from users where user_id = 5')
//     .then( (result) => {
//         console.log(result.rows)
//         // data.end()
//     })
// database.query(`insert into users (username, password) values ('admin4', '123123') returning *`)
//     .then((result) => {
//         console.log(result.rows)
//     })

data.end()

nói tới recate shop
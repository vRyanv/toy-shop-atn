const data = require('./database/connect')
const database = require("./database/connect");
 // data.query('select * from shop')
 //    .then((result) => {
 //        console.log(result.rows)
 //        data.end()
 //    })
// data.query(`insert into users(username, password) values ('admin', '123456')`)
//     .then((result) => {
//         console.log(result)
//         data.end()
//     })
// data.query('select * from shop')
//     .then(result => console.log(result))
//     .then(data.end())
// data.query('select * from shop')
//     .then( (result) => {
//         console.log(result)
//         data.end()
//     })
let product = {
    name: 'asdf',
    cateId: 6,
    supId: 1,
    image: 'asdasd',
    price: 1,
    quantity: 1,
}
database.query(`insert into product(cate_id, shop_id, sup_id, pro_name, pro_image, pro_price, quantity)
                                                 values (${product.cateId}, 12, ${product.supId},
                                                         '${product.name}', '${product.image}',
                                                         '${product.price}', ${product.quantity})`)

const {Pool} = require('pg');
try{
    module.exports = new Pool({
        connectionString: '\n' +
            'postgres://maigoaislckeie:917b7ee136bcf7e00b8bf8da8a646e9aca551c4045fbb8c4601e71392cc3cad9@ec2-44-210-228-110.compute-1.amazonaws.com:5432/ded9gtjg54vtog',
        ssl: {
            rejectUnauthorized: false
        }
    });
    console.log('Connect database success')
}catch (error){
    console.log('Connect database fail!')
}
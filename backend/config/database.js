const mysql = require('mysql');

var connectDB;

// function connectDb(){
    connectDB = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'reactbiodata',
        multipleStatements: true
    });
// }

// check connection to DB
// connectDB.connect((err)=>{
//     if(err) throw err;
//     console.log('Mysql Connected');
// });


// connectDB.on('error', connectDb());

connectDB.query('select 1 + 1',(err,rows)=>{
    if(err) throw err;
    console.log('Mysql Connected');
});

// export file
module.exports = connectDB;
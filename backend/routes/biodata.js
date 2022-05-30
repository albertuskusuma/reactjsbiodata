const express = require('express');
const { route } = require('express/lib/router');
const connectDB = require('../config/database');
const router = express.Router();
var jwt = require('jsonwebtoken');

// const req = require('express/lib/request');

const config = process.env;

// jenis kelamin
router.get('/getJenisKelamin',verifyJWT,(req,res)=>{
    const querySQL = `select * from xm_jenis_kelamin`;

    connectDB.query(querySQL,(err,rows,field)=>{
        if(err){
            return res.status(500).json({code:0,message:`can't get data jenis kelamin`, error:err});
        }

        // success
        return res.status(200).json({code:1,message:`Data jenis kelamin Found`,data:rows});
    });
});

// fakultas
router.get('/fakultas',verifyJWT,(req,res)=>{
    const querySQL = `select * from xm_fakultas`;

    connectDB.query(querySQL,(err,rows,field)=>{
        if(err){
            return res.status(500).json({code:0,message:`can't get data fakultas`, error:err});
        }

        // success
        return res.status(200).json({code:1,message:`data fakultas found`, data:rows});
    });
});

// prodi
router.get('/getProdi',verifyJWT,(req,res)=>{
    let sql = `select * from xm_prodi`;

    connectDB.query(sql,(err,rows,field)=>{
        if(err){
            return res.status(500).json({code:0,message:`can't get data prodi`,data:[]})
        }

        // success
        return res.status(200).json({code:1,message:`data prodi find`,data:rows})
    })
})

router.post('/prodi',verifyJWT,(req,res)=>{

    // param
    let id_fakultasParam = req.body.id_fakultas;

    const querySQL = `select * from xm_prodi where id_fakultas = ?`;

    connectDB.query(querySQL,[id_fakultasParam],(err, rows, field)=>{
        if(err){
            return res.status(500).json({code:0,message:`can't get data prodi`,error:err});
        }

        // success
        return res.status(200).json({code:1, message:`data prodi found`, data:rows});
    });
});

// list biodata
router.get('/', verifyJWT,(req, res)=>{

    // let token = req.headers["x-access-token"];

    // query mysql

    const querySQL = `SELECT m.id, m.nama, m.umur, f.nama_fakultas, p.nama_prodi, j.jenis_kelamin
    FROM xm_biodata_mhs as m
    LEFT JOIN xm_fakultas as f ON m.id_fakultas = f.id_fakultas
    LEFT JOIN xm_prodi as p ON m.id_prodi = p.id_prodi
    LEFT JOIN xm_jenis_kelamin as j ON m.id_jenis_kelamin = j.id_jenis_kelamin
    WHERE m.is_delete = 0`;

    connectDB.query(querySQL, (err,rows,field)=>{
        // err handling
        if(err){
            return res.status(500).json({code:0,message:`Something Wrong`, error:err});
        }

        // success
        res.status(200).json({code:1, message:`Data Found`,data:rows});
    });
});
// list biodata

let refreshTokenJWT = [];

// refresh token JWT
router.post('/refreshTokenJWT', (req, res) => {

    const refreshToken = req.body.token || req.query.token;
    const username = req.body.username || req.query.username;
  
    if (refreshToken == null) return res.status(401).send({code:1,message:`param token empty`});
    if (!refreshTokenJWT.includes(refreshToken)) 
    // return res.status(403).send({code: 1, message:`token different`});
    {
        jwt.verify(refreshToken, '555', (err, user) => {
            if (err) return res.status(403).send({code:'1',message:err});
            const accessToken = generateJWT({ username:username })
            refreshTokenJWT = [];

            const refreshToken = jwt.sign(user,'555');
            refreshTokenJWT.push(refreshToken);
            // res.status(200).send({ code:'1', message:`refresh token success`,accessToken: accessToken })

            let update_refresh_token = `UPDATE xm_user set 
            access_token = ?,
            refresh_token = ?
            where username = ?`;

            connectDB.query(update_refresh_token,[
                accessToken,
                refreshToken,
                username
            ],(err,rows,field)=>{
                if(err) return res.status(500).send({code:0,err:err});

                return res.status(200).send({code:1,
                    refreshToken:refreshToken,
                    accessToken:accessToken,
                    username:username,
                    message:`success refresh token`})
            })
        })
    }
})
// refresh token JWT

// function verifyJWT
function verifyJWT(req, res, next) {
   
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    const refreshToken =
    req.body.refresh_token || req.query.refresh_token || req.headers["x-access-refreshtoken"];

    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, '444', (err, user) => {
      if (err) return res.status(403).send({code:0,message:err});
      req.user = user
      next()
    })
}
// function verifyJWT

// function generateJWT
function generateJWT(user){
    return jwt.sign(user, '444', { expiresIn: '1m' });
}
// function generateJWT

// login
router.post('/login',(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let is_delete = 0;
    let is_login = 1;

    let sql_cek = `select * from xm_user 
    WHERE username = ? AND password = ?
    AND is_delete = ?`;

    connectDB.query(sql_cek,[username, password, is_delete],(err,rows,field) => {
        if(err) return res.status(500).json({code:0,message:`please check your username and password`})
        else{
            if(is_login === rows[0].is_login){
                // already login
                // let tokenData = rows[0].token;
                // if(tokenData !== ""){
                //     return res.status(200).json({code:1,message:`success login`,
                //     token:tokenData,username:username,try1:`1`});
                // }else{
                    // refresh token
                    const username = req.body.username;
                    const user = {name: username}

                    const accessToken = generateJWT(user)
                    const refreshToken = jwt.sign(user,'555');
                    refreshTokenJWT.push(refreshToken);

                    let is_login = 1;
                    const id_user = rows[0].id_user;

                    // update token
                    let sql_update_token = `UPDATE xm_user SET 
                    access_token = ?, 
                    refresh_token = ?,
                    is_login = ?
                    WHERE username = ? AND password = ?`;

                    connectDB.query(sql_update_token,[accessToken, refreshToken, is_login, username, password],
                        (err,rows,fields) => {
                        if(err) return res.status(500).json({code:0,message:`Failed Update Token`})
                        else{
                            return res.status(200).json({code:1,message:`success login`,username:username,try2:`2`,
                            refreshToken:refreshToken, accessToken:accessToken});
                        }
                    })

                // }
                
            }

            else{ 
                let is_login = 1;
                // Create token
                const username = req.body.username
                const user = { name: username }
              
                const accessToken = generateJWT(user)
                const refreshToken = jwt.sign(user,'555');
                refreshTokenJWT.push(refreshToken);

                const id_user = rows[0].id_user;

                // update token
                let sql_update_token = `UPDATE xm_user SET 
                access_token = ?, 
                refresh_token = ?,
                is_login = ?
                WHERE username = ? AND password = ?`;

                connectDB.query(sql_update_token,[
                    accessToken,
                    refreshToken,
                    is_login,
                    username,
                    password],(err,rows,fields) => {
                    if(err) return res.status(500).json({code:0,message:`Failed Update Token`})
                    else{
                        return res.status(200).json({code:1,message:`success login`,username:username,try3:`3`,
                        accessToken:accessToken,
                        refreshToken:refreshToken});
                    }
                });
            }
        }
    
    })
});
// login

// list biodata using POST
router.post('/', verifyJWT,(req, res)=>{

    // let token = req.headers["x-access-token"];

    // query mysql

    const querySQL = `SELECT m.id, m.nama, m.umur, f.nama_fakultas, p.nama_prodi, j.jenis_kelamin
    FROM xm_biodata_mhs as m
    LEFT JOIN xm_fakultas as f ON m.id_fakultas = f.id_fakultas
    LEFT JOIN xm_prodi as p ON m.id_prodi = p.id_prodi
    LEFT JOIN xm_jenis_kelamin as j ON m.id_jenis_kelamin = j.id_jenis_kelamin
    WHERE m.is_delete = 0`;

    connectDB.query(querySQL, (err,rows,field)=>{
        // err handling
        if(err){
            return res.status(500).json({code:0,message:`Something Wrong`, error:err});
        }

        // success
        res.status(200).json({code:1, message:`Data Found`,data:rows});
    });
});
// list biodata using POST

// add biodata
router.post('/addBiodata',verifyJWT,(req,res)=>{

    // param
    let namaParam =  req.body.nama;
    let umurParam = req.body.umur;
    let id_jenis_kelaminParam = req.body.id_jenis_kelamin;
    let id_fakultasParam = req.body.id_fakultas;
    let id_prodiParam = req.body.id_prodi;

    let sql = `INSERT INTO xm_biodata_mhs(nama,umur,id_jenis_kelamin,id_fakultas, id_prodi) VALUES(?,?,?,?,?)`

    connectDB.query(sql,[namaParam, umurParam, id_jenis_kelaminParam, id_fakultasParam, id_prodiParam],
    (err,rows,field)=>{
        if(err) {
            return res.status(500).json({code:0,message:`Something Wrong`,error:err});
        }else{
            let is_delete = 0;
            let sql_get_biodata = `select * from xm_biodata_mhs WHERE is_delete = ?`;

            connectDB.query(sql_get_biodata,[is_delete],(err,rows, field)=>{
                if(err){
                    return res.status(500).json({code: 0, message:`Something Wrong`, error: err});
                }

                // success
                res.status(200).json({code:1,message:`Success Insert Data`,data:rows});
            });
        }
    });
});
// add biodata

// get data by id
router.post('/getBiodataById',verifyJWT,(req, res)=>{
    
    // params
    let id_mhs = req.body.id_mhs;
    let sql = `select * from xm_biodata_mhs where id = ?`;

    connectDB.query(sql,[id_mhs],(err, rows, field)=>{
        if(err){
            return res.status(500).json({code:0, message:`Something Wrong`, error:err})
        }

        // success
        res.status(200).json({code:1, message:`Success Get Data`, data:rows})
    });
});
// get data by id

// edit biodata
router.post('/editBiodata',verifyJWT,(req, res)=>{

    // params
    let id = req.body.id;
    let nama = req.body.nama;
    let umur = req.body.umur;
    let id_jenis_kelamin = req.body.id_jenis_kelamin;
    let id_fakultas = req.body.id_fakultas;
    let id_prodi = req.body.id_prodi;

    sql = `update xm_biodata_mhs SET 
    nama = ?,
    umur = ?, 
    id_jenis_kelamin = ?,
    id_fakultas = ?,
    id_prodi = ?
    WHERE id = ?`
    
    // console.log(req.body);

    connectDB.query(sql,[nama, umur, id_jenis_kelamin, id_fakultas, id_prodi, id],(err,rows,field)=>{
        if(err) return res.status(500).json({code:0, message:`Can't update data`,error:err})
        else{
            let is_delete = 0;
            let sql_get_biodata = `select * from xm_biodata_mhs WHERE is_delete = ?`;

            connectDB.query(sql_get_biodata,[is_delete],(err, rows, fields) => {
                if(err) return res.status(500).json({code:0,message:`cant update data`,error:err});

                // success
                return res.status(200).json({code:1,message:`success update data`,data:rows});
            });
        }
    });
});
// edit biodata

// delete biodata
router.post('/deleteBiodata',verifyJWT,(req, res)=>{

    // params
    let id = req.body.id;

    sql = `UPDATE xm_biodata_mhs SET is_delete = 1 WHERE id = ?`;

    connectDB.query(sql,[id],(err,rows,field)=>{
        if(err) return res.status(500).json({code:0,message:`cant delete data`,error:err});
        
        else{
            let is_delete = 0;
            let sql_get_biodata = `select * from xm_biodata_mhs WHERE is_delete = ?`;

            connectDB.query(sql_get_biodata,[is_delete],(err,rows,field)=>{
                if(err) return res.status(500).json({code:0,message:`cant delete data`,error:err});
                // success
                return res.status(200).json({code:1,message:`success delete data`, data:rows})       
            })
        }
    })
});
// delete biodata

module.exports = router;
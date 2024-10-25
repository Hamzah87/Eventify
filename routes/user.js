const express = require('express');
const router = express.Router();
const pool1 = require('../dbConnection/database');
const bcrypt = require('bcrypt');

router.get('/:id', async function(req,res){
    try {        
        const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
        const rows = await pool1.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
        
    } catch (error) {
        res.status(400).send(error.message)
    }

    //res.status(200).json(rows);
    //res.status(200).json({id:req.params.id})

});

router.post('/register', async function(req,res) {
    try {
        console.log('333333333333333333333333333');
        const {email, password} = req.body;
        
        const sqlQuery = 'INSERT INTO user (email, password) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [email, password]);
        //const result = await pool.query(sqlQuery, [email, encryptedPassword]);
        
        res.status(200).json({userId: result.insertId});
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/login', async function(req,res) {
    try {
        console.log('4444444444444444444444444444444444444');
        const {id,password} = req.body;

        const sqlGetUser = 'SELECT password FROM user WHERE id=?';
        const rows = await pool.query(sqlGetUser,id);
        if(rows){
            
            //const isValid = await bcrypt.compare(password,rows[0].password)
            const isValid = await password;
            res.status(200).json({valid_password: isValid});
        }
        res.status(200).send(`User with id ${id} was not found`);
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;
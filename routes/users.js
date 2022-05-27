const express = require('express');
const router = express.Router();


//---------Register Page----------//
router.get('/register', (req, res) => res.render('register'));


//---------Login Page----------//
router.get('/login', (req, res) => res.render('login'));


module.exports = router;
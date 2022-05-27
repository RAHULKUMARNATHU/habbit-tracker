const express = require('express');
const router = express.Router();

//---------User model----------//
const User = require('../models/User')

//---------Register Page----------//
router.get('/register', (req, res) => res.render('register'));


//---------Login Page----------//
router.get('/login', (req, res) => res.render('login'));



//---------Register Handle----------//
router.post('/register',(req,res) => {
    const {name , email , password ,cpassword} = req.body;
    
    //---------Checking for errors----------//
    let errors = [];

    if (!name || !email || !password ||!cpassword) {
        errors.push({ msg: 'Please enter all fields' });
    }
      if (password != cpassword){
        errors.push({ msg: 'Password not matched!!' });

        return res.redirect('back');
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            cpassword
            
        });
    }else {
        // --------------Validation passed----------->//
        User.findOne({email : email}).then (user => {
            if(user){
                //---------User already exists----------//
                errors.push({ msg: 'Email ID already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    cpassword
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password,
                    cpassword
                });
                 
            //---------Save user----------//
            newUser
            .save()
            .then(user => {
                req.flash(
                'success_msg',
                'You are now registered and can log in'
                );
                res.redirect('/users/login');
            }) 
            .catch(err => console.log(err));
           
            }
        });
    }
});





module.exports = router;
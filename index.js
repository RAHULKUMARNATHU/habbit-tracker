
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: "./config.env" }); //import config.env file

const DB = process.env.DATABASE;  
const PORT = process.env.PORT;

mongoose
  .connect(DB, {
    usenewurlparser: true,
    useunifiedtopology: true,
  })
  .then(() => {
    console.log("Successfully connected ");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });
const app = express();

// //-----DB Config---------//
// const db = require('./config/keys').MongoURI;


// //------Connect to Mongo--------//
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB successfully!"))
//     .catch(err => console.log(err));

//-----EJS---------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');

//------BodyParser--------//
app.use(express.urlencoded({ extended: false }));

//---------Express Session----------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        
    })
);


//---------Connect Flash----------//
app.use(flash());


//---------Global Variables----------//
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//-----Routes---------//
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// const PORT = process.env.PORT ||8000;

app.listen(PORT, console.log(`Server started on port  ${PORT}`));


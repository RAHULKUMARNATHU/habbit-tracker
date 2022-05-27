const express = require('express');
const expressLayouts = require('express-ejs-layouts');



const app = express();

//-----EJS---------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');








//-----Routes---------//
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 8000;

app.listen(PORT, console.log(`Server started on port  ${PORT}`));


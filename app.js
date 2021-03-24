const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDbUrl} = require('./config/configuration')



const app = express();




//Configure Mongoose to Connect to MongoDB
mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(response => {
        console.log("MongoDB Connected Successfully");
    }).catch( err => {
        console.log("Database Connection Failed.");
})


//Configure express
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './public')));
app.use('/admin/posts', express.static(path.join(__dirname, 'public')))


//Setup view Engine To Use Handlebars
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');




// Routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () =>{
    console.log(`Server is running on port 3000`);
});
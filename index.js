const mongoose = require('mongoose')
const config = require('config');
const morgan = require('morgan')
const helmet = require('helmet');
const customers = require('./routes/customers')
const logger = require('./middleware/logger');
const genres = require("./routes/genres");
const homepage = require('./routes/homepage');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
   .then(() => console.log('Connected to mongoDB...'))
   .catch(() => console.log('Could not connect to MongoDB...'));


app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(helmet());

app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/', homepage);

//Config
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));

if(app.get('env') === 'development'){
   app.use(morgan('tiny'));
   console.log("Morgan enabled....");
}

app.use(logger)

app.use((req, res, next) => {
   console.log('Authenticating...');
   next();
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`))
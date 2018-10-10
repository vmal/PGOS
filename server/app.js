const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const workOrderRouter = require('./routes/workOrder');
const app = express();

const uri = 'mongodb://admin:admin123@ds127293.mlab.com:27293/bluebottlecoffee';
mongoose.Promise = global.Promise;
mongoose.connect(uri,{
    useNewUrlParser: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/workorder',workOrderRouter);

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});
module.exports = app;

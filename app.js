//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
 
//Create connection
const conn = mysql.createConnection({
 	host	: 'localhost',
user	: 'root',
password: process.env.MYSQL_PW,
database: 'hist'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//set views file
app.set(path.join(__dirname,'/views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
//set public folder as static folder for static file
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
 
//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM Delivery";
 let query = conn.query(sql, (err, results) => {
    if(err) throw err;
res.render("product_view",
  {
results: results
    });
  });
});
app.get("/tour", function(req, res) {
var joke = "<strong>What do you call a small labrador?</strong> <em>A labradoodle </em>";
res.send(tour);
}); 
 
//route for insert data


//route for insert data
app.post('/save',(req, res) => {
  let data = {DeliveryMethod: req.body.DeliveryMethod, DeliveryDays: req.body.DeliveryDays, DeliveryCost: req.body.DeliveryCost};
  let sql = "INSERT INTO Delivery SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE Delivery SET DeliveryMethod='"+req.body.DeliveryMethod+"', DeliveryDays='"+req.body.DeliveryDays+"', DeliveryCost='"+req.body.DeliveryCost+"' WHERE DeliveryMethodID="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

 
//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM Delivery WHERE DeliveryMethodID="+req.body.DeliveryMethodID+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

app.get("/joke", function(req, res) {
var joke = "<strong>What do you call a small labrador?</strong> <em>A labradoodle </em>";
res.send(joke);
}); 
 
//server listening
app.listen(7000, () => {
  console.log('Server is running at port 7000');
});
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/node-mongo-hw' // change this as needed

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();


// The method of the root url. Be friendly and welcome our user :)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the APOD app.' });   
});

app.use('/api', router); // API Root url at: http://localhost:8080/api
app.use(express.static('../client/'))



const Scheme = mongoose.Schema

const item = new Scheme({
    image_url: String,
    date: String
})

const APOD = mongoose.model("APOD", item);

router.post('/add', function(req, res) {
    
    const toAdd = new APOD({
      image_url: req.body.photo_address,
      date: req.body.photo_date
    })

    toAdd.save((error, result) => {
      if (error) {
        res.json({status: "failure"})
      } else {
        res.json({
          status: "success",
          id: toAdd._id,
          content: result
        })
      }
    })

});

router.post('/delete', function(req, res) {
    
  const toAdd = new APOD({
    image_url: req.body.photo_address,
    date: req.body.photo_date
  })

  APOD.deleteMany({date: req.body.photo_date}, 
    (error, apod)=> {
      if (error) {
        res.json({status: "failure"})
      } else {
        res.json(apod)
      }
    }
  )

})


// router.get('/next', function(req, res) {
//     axios.get('https://api.nasa.gov/planetary/apod?date=2021-10-25&api_key=grnIxnrHQy02ckDar4A9URiod1bYcb65cBiaBSHu')
//     .then(json_format => {
//       // let url = json_format.data.url;
//       // let date = json_format.data.date;
//       res.json(json_format.data);
//     })
// });




    
router.get("/favorite", (req, res)=> {
  APOD.find().then((apods) => {
    // process the data in the backend
    toReturn = {data: []}
    for (let a of apods) {
      console.log(a);
      toReturn.data.push([a.image_url, a.date]);
    }
    res.json(toReturn);
  })
});




app.use('/api', router); // API Root url at: http://localhost:8080/api

app.listen(port);
console.log('Server listenning on port ' + port);
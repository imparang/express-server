var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(express.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.get('/json', function(req, res, next){
  res.send({message: 'This is json data'})
})

router.post('/Post', function(req, res, next){
  res.send({message: 'This is json data'})
})

router.post('/sendJson', function(req, res, next){
  console.log('Req query: ', req.query, 'Req body : ', req.body)
  res.send('성공!')
})

module.exports = router

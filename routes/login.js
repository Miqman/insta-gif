const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js');



router.get('/', Controller.loginGet)
  router.post('/', Controller.loginPost)


module.exports = router
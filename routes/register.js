const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js');



router.get('/', Controller.registerGet)
router.post('/', Controller.registerPost)

  module.exports = router
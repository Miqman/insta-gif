const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js')



router.get('/', Controller.showProfile)

router.get('/profileAdd', Controller.profileAddGet)

router.post('/profileAdd', Controller.profileAddPost)




module.exports = router
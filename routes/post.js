const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js');

const multer = require('multer');
const upload = multer()


// const storageM = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const originalName = file.originalname
//         const nameArr = originalName.split('.')
//         if (nameArr.length > 1) {
//             extension = nameArr[nameArr.length - 1]
//         }
//         cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
//     }
// })

// const multerUpload = multer({storage: storageM})

router.get('/', Controller.postList)


router.get('/postGif', Controller.postGifGet)

router.post('/postGif', upload.single('url'), Controller.postGifPost)

router.get('/delete/:id', Controller.deleteGif)

router.get('/like/:id', Controller.likeGif)
  

  module.exports = router
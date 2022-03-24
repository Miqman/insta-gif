const express = require('express')
const router = express()
const port = 3000
const post = require('./post.js')
const register = require('./register.js');
const login = require('./login.js');
const profile= require('./profile.js');
const logout = require('./logout.js');
const session = require('express-session')



router.set('view engine', 'ejs')
router.use(express.urlencoded({ extended: true }))



router.use(session({
  secret: 'hehe',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}))


router.get('/', (req, res) => {
  res.send('Home')
})


router.use('/register', register)
router.use('/login', login)

router.use(function(req,res,next){
  // console.log(req.session, '<<<<<<<<<<<')
  if(!req.session.sessionUserId){
    const error = `User Must Login`
    res.redirect(`/login?error=${error}`)
  }else{
    next()
  }
})



router.use('/post', post)
router.use('/profile', profile)
router.use('/logout', logout)


router.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
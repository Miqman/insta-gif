const express = require('express')
const router = express()
const PORT = process.env.PORT || 3000
const post = require('./routes/post.js')
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const profile= require('./routes/profile.js');
const logout = require('./routes/logout.js');
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
  res.render('Home')
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


router.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
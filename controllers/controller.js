const  {User, Profile, Category, Post} = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { imageKit } = require('../helpers/imageKit.js');
const { Op } = require('sequelize');


let userLogin;



class Controller{

    static registerGet(req,res){
        const {error} = req.query
        res.render('register', {error})

    }

    static registerPost(req,res){

        console.log(req.body);
        const {username, email,role,password} = req.body
        let obj = {username, email,role,password}

        User.create(obj)
        .then(() => {
            res.redirect('/login')
        }).catch((err) => {
            // console.log(err)
            // res.send(err)
            if(err.name === `SequelizeValidationError`){
                err = err.errors.map((res)=>{
                    return res.message
                })
            }
            res.redirect(`/register?error=${err}`)
        });

    }

    static loginGet(req,res){
        const {error} = req.query
        res.render('login', {error})
    }

    static loginPost(req,res){

        const {username, password}= req.body
        
        User.findOne({where: {username}})
        .then((user) => {
            // console.log(user)
            if(user){
                const validPassword = bcrypt.compareSync(password, user.password);
                if(validPassword){
                    req.session.sessionUserId = user.id
                    req.session.role = user.role
                    userLogin = req.session.sessionUserId
                    // console.log(req.session.sessionUserName)
                    // console.log(userLogin)
                    return res.redirect('/post')
                }else{
                    let notValid = `Password not valid`
                    res.redirect(`/login?error=${notValid}`)
                }
            }else{
                let usernameError = `Username not valid`
               return res.redirect(`/login?error=${usernameError}`)
            }
        }).catch((err) => {
            res.send(err)
        });

    }
    
    static postList(req,res){

        // console.log(req.query);

        const {sName} = req.query
        
        let options = {
            include: [User,Category ],
            where: {}
        }
        console.log(req.query)
        if (sName) {
            options.where = {
                name: {
                    [Op.iLike]: `%${sName}%`  
                }
            }
        }
        
        let temp = []
        Post.findAll(options)
        .then((posts) => {
            temp.push(posts)
            return User.findOne({
                include: Profile,
                where:{
                    id: userLogin
                }
            })
        })
        .then((user)=>{
            temp.push(user)
            res.render('posts', {posts: temp[0], user: temp[1]})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        });

    }

    static profileAddGet(req,res){
        res.render('addProfile')
    }

    static profileAddPost(req,res){
        const {name, bio, gender} = req.body
        Profile.create({
            name,
            bio,
            gender,
            UserId: userLogin
        })
        .then(() => {
        res.redirect('/post')
        }).catch((err) => {
            console.log(err)
            res.send(err)
        });
    }

    static postGifGet(req,res){
        // let temp = []
        
        Category.findAll()
        .then((categories) => {
            res.render('postGif', {categories})
        }).catch((err) => {
            res.send(err)
        });

    }

    static async postGifPost(req,res){
        try {
            const {buffer, originalname} = req.file
            const result = await imageKit(buffer, originalname)
            const imgUrl = result.data.url

            const {name, url, CategoryId} = req.body
            let obj = {
                name,
                url: imgUrl,
                UserId: userLogin,
                CategoryId
            }
            // console.log(req.file.filename, '============')
            if(req.body.url){
                    obj = {
                    name,
                    url,
                    UserId: userLogin,
                    CategoryId
                }
            }
            const posCreate = await Post.create(obj)
            if (posCreate) {
                res.redirect('/post')
            }
            // console.log(posCreate);
           
            // console.log(result.data.url, '<<<<<<<<<<<<<<<<<<<<');
        } catch (error) {
            console.log(error);
            res.send(error)
        }

        // console.log(req.file, req.body, '<<<<<<<<<<<<')

        // const {name, url, CategoryId} = req.body
        // console.log(name, url, CategoryId)
        // let obj = {
        //     name,
        //     url: imgUrl,
        //     UserId: userLogin,
        //     CategoryId
        // }
        // // console.log(req.file.filename, '============')
        // if(req.body.url){
        //         obj = {
        //         name,
        //         url,
        //         UserId: userLogin,
        //         CategoryId
        //     }
        // }
        // Post.create(obj)
        // .then(() => {
        //     res.redirect('/post')
        // }).catch((err) => {
        //     console.log(err)
        //     res.send(err)
        // });

    }

    static showProfile(req, res) {
        

        User.findProfile(Profile, Post, userLogin)
        .then((data) => {
            // console.log(data);
            res.render('profile', {data})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }
    
    static logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/login')
            }
        })
    }

    static deleteGif(req, res) {

        const { id } = req.params
        // console.log(req.params);
        Post.destroy({
            where: {id}
        })
        .then(() => {
            res.redirect('/post')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static likeGif(req, res) {
        
        const { id } = req.params
        // console.log(req.params);
        Post.increment('vote', {
            where: {id}
        })
        .then(() => {
            res.redirect('/post')
        })
        .catch((err) => {
            res.send(err)
        })
    }

}

module.exports = Controller
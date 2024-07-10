const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const {models} = require('../libs/sequelize')
const {LoginLog} = require('../middlewares/LogLogin.handler')
// const localStorage = window.localStorage;

authRouter.route('/signIn')
.get((req, res)=>{
    let log = "userId: "+ 0 + "\nRoleId: "+ 0
    LoginLog(log);
    res.render('auth/signIn')
})
.post(
    passport.authenticate('local',{
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true
    })
)

authRouter.route('/signUp')
.get((req, res)=>{
    res.render('auth/signUp')
})
.post(async (req, res)=> {
    const user = await models.user.create(req.body)
    req.login(user, () => {
        res.redirect('/');
    });
    //res.json(req.body)
})

authRouter.route('/profile').get((req,res) => {
    res.json(req.user)
})

module.exports = authRouter
const passport = require('passport')
const LocalStrategy = require('passport-local')
const {models} = require('../../libs/sequelize')
const {LoginLog} = require('../../middlewares/LogLogin.handler')

async function getUserByUsername( username ) {
    const user = await models.user.findAll({
        where: {
            username: username
        }
    })
    //console.log(user)
    if(user[0]){
        return user[0].dataValues
    }
    return null
    
}

passport.use(new LocalStrategy(
    async function(username, password, done) {
        //1. Consultar en BD el usuario
        const user = await getUserByUsername(username)
        //console.log(user)
        //2. Comparar la contraseña
        if(user && user.password == password){
            //3. Decidir si queda logueado o no
            //SI
            //localStorage.setItem('userId', user.type);
            let log = "userId: "+ user.type+ "\nRoleId: "+ user.id
            LoginLog(log);
            return done(null, user)
        }
        //NO
        return done(null, false)
    }
));
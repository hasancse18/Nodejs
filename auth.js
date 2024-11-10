const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/person')
passport.use(new LocalStrategy(async (uname, pass, done)=>{
    //authentication
    try {
        //console.log('Received Credentials: ', uname, pass);
        const user = await Person.findOne({username: uname});
        //const user = await Person.findOne({ username: uname }).select('+password');
        console.log(user)
        if(!user)
            return done(null, false,{message: 'Incorrect username'})
        const isMatch = await user.comparePassword(pass)
        if(isMatch)
            return done(null,user);
        else
            return done(null,false, {message: 'Incorrect password.'})
    } catch (error) {
        console.log("error")
        return done(error);
    }
}))


module.exports = passport
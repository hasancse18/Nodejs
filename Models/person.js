const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
personSchema.pre('save', async function (next) {  // Use a regular function, not an arrow function
    const person = this;
    if (!person.isModified('password')) {
        console.log("no encrypt")
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        person.password = hashPassword;
        console.log("encrypt block")
        next();
    } catch (error) {
        return next(error);
    }
});


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        //const isMatch = candidatePassword===this.password? true:false
        console.log(isMatch,candidatePassword,this.password)
        return isMatch;
    } catch (error) {
        throw(error)
    }
}

const sPerson = mongoose.model('Person',personSchema);
module.exports = sPerson;
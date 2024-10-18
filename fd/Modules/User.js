const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check } = require('email-existence');
const User = mongoose.Schema({
    Username:{
        type: String,
        required: [true, "Please enter your Username."],
        minlength: [4, 'Username must be 4 characters long.'],
        unique: true
    },
    Email:{
        type: String,
        required: [true, 'Please enter your Email.'],
        unique: true,
        validate:{
            validator: function(value){
                return new Promise((resolve, reject)=>{
                    check(value,(err, exists)=>{
                        if(err || !exists){
                            reject(new Error('Email must be valid.'));
                        }else{
                            resolve(true);
                        }
                    });
                });
            },
            message : 'Please enter a valid email.'
        }
    },
    Password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minlength: [8, 'Password must be 8 characters long.']
    }
})

User.pre('save', async function(next){
    this.Password = await bcrypt.hash(this.Password, 10);
    console.log(this.Password);
    next();
})

User.statics.login = async function(email, password){
    const user = await this.findOne({Email: email});
    if(user){
        const auth = await bcrypt.compare(user.password, password);
        if(auth){
            return user;
        }else{
            throw { path: 'Password', message: 'Incorrect password.' }
        }
    }else{
        throw{ path: 'Email', message:'Incorrect email. Email not registered.' }
    } 
}
module.exports = mongoose.model('Users', User);
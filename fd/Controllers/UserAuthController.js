const User = require('../Modules/User');

module.exports.signIn_post = async(req, res) =>{
    const { username, email, password} = req.body;
    try{
        const user = await User.create({
            Username: username,
            Email: email,
            Password: password
        });
    }catch(e){
        let errors = {
            Email:'', 
            Username: '',
            Password: ''
        }
        if(e.code === 11000){
            if(Object.keys(e.keyValue).includes('Username')){
                errors.Username = 'Username already taken.';
            }else{
                errors.Email = 'Email already registered.';
            }
            res.send({ errors });
        }
        if(e.message.includes('Users validation failed')){
            Object.values(e.errors).forEach(properties=> {
                errors[properties.path] = properties.message;
            })
            res.send({ errors });
        }
    }
}

module.exports.logIn_post =  async(req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
    }catch(e){
        let errors = {
            Email: '',
            password: ''
        }
        errors[e.path] = e.message;
        res.send({ errors });
    }
}
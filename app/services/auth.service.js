const UserService = require('../services/user.service');
const User = require("../models/user.model");

async function login(mail, password) {
    try {
        let token = null;
        const user = await User.findOne({ email: mail });
        
        if (!user){
            return null;
        }
        
       const validPassword = await user.validatePassword(password);
        if (!validPassword){
            return null;
        }

        token = user.generateAuthToken();

        const {_id, name, email} = user;

        return {
            user: {
                _id, 
                name, 
                email,
            },
            token: token
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { login }
const db = require("../models");
const User = db.user;

async function create(data){
    try {    
        const user = new User(data);
        
        await user.save(user);
        
        return user;
    } catch (error) {
        return error;  
    }
}

async function getByEmail(email){
    try {  
        const user = await User.find({ email });
        
        if(!user){
            return null;
        }

        return user;
    } catch (error) {
        return error;
    }
}

async function get(id){
    try {
        const user = await User.findById(id);
    
        if(!user){
            return null
        }
        
        return user
    } catch (error) {
        return error
    }
}


async function getAll(){
    const users = await User.find({});

    if(!users){
        return null
    }

    return users;
}

async function update(id, data){
    const updatedUser = await User.update(
        id, 
        data,
        { useFindAndModify: false }
    );

   if(!updatedUser){
       return null;
   }     
    
   const user = await get(updatedUser.id);

    return user;
}

async function remove(id){
    const removedUser = await User.findByIdAndRemove(id);

    if(!removedUser){
        return null;
    }

    return removedUser;
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    getByEmail
}
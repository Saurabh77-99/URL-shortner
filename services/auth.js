// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken')
const secret = "Dev@123"

// function setUser(id,user) {
function setUser(user) {
    // sessionIdToUserMap.set(id,user)
    // const payload = {
    //     id,
    //     ...user,
    // };
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },
    secret)
}

// function getUser(id){
function getUser(token) {
    if(!token) return null;
    // return sessionIdToUserMap.get(id);
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}
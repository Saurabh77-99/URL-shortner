const {getUser} = require('../services/auth')

function checkforAuthentication(req,res,next) {
    // const authorizationHeaderValue = req.headers["Authorization"];
    const tokenCookie = req.cookies["token"];
    req.user = null;
    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
    if(!tokenCookie)
    return next();

    // const token = authorizationHeaderValue.split("Bearer")[1];
    const token = tokenCookie;
    const user = getUser(token); 
    
    req.user = user;
    return next();
}

function restrictTo(roles) {
    return function(req,res,next) {
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

// async function restrictToLoggedinUserOnly(req,res,next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["Authorization"];

//     if(!userUid) return res.redirect('/login');

//     const token = userUid.split('Bearer')[1];

//     // const user = getUser(userUid)
//     const user = getUser(token)

//     if(!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"];

//     const token = userUid.split('Bearer')[1];
//     // const user = getUser(userUid)
//     const user = getUser(token)

//     req.user = user;
//     next();
    
// }

module.exports = {
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkforAuthentication,
    restrictTo
}

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnAuthenticatedError} = require('../errors');

const auth = async(req, res, next) => {

    //Check Header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnAuthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1];
 
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //Attach user to the job router
        req.user = {userID: payload.userID, name: payload.name}
        
        next();
    } catch (error) {
       throw new UnAuthenticatedError('Authentication invalid')
    }
}

module.exports = auth;
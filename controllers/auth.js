const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {


    const user = await User.create({...req.body})
    //Create token
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token});
}

const login = async(req, res) => {
    const {email, password} = req.body;

    //No values provided
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    //User doesnt exist in DB
    if(!user){
        throw new UnauthenticatedError('Please provide valid credentials');
    }

    const passwordCorrect = await user.comparePassword(password);
    //If password is correct
    if(!passwordCorrect){
        throw new UnauthenticatedError('Please provide correct password');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
    register, login
}
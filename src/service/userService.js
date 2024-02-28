const User = require('../model/user')
const NotFoundException = require('../exception/NotFoundException');
const { request } = require('express');
const { isUndefined } = require('lodash');

const createUser = async(request) =>{
    const {firstName,lastName,email,password} = request;

    const user = await User.findOne({email});
    if(user){
        throw new NotFoundException("Email already in use")
    } 

    const newUser = {
        firstName : firstName,
        lastName : lastName,
        email:  email,
        password : password,
    }

    const savedUser = await User.create(newUser) 

    const response = {
        _id : savedUser._id,
        firstName : savedUser.firstName,
        lastName : savedUser.lastName,
        email : savedUser.email,
    }

    return{
        data : response,
        message : "Registration Successful"
    }
}

const login = async (request)=>{
    const {email,password} = request;
    
    const user = await User.findOne({email})
    if(!user){
        throw new NotFoundException("User dosen't exit")
    }
    if(user.password != password){
        throw new NotFoundException("Invalid credentials")
    }
    return{
        msg : "Login successful"
    }
}

const deleteUser = async (request)=>{
    const {email,password} = request

    const user = await User.findOne({email})
    if(!user){
        throw new NotFoundException("User dosen't exit")
    }
    if(user.password != password){
        throw new NotFoundException("Invalid credentials")
    }
    await User.deleteOne(user)
    return{
        msg : "Account Deleted"
    }

}
module.exports = {createUser,login,deleteUser};
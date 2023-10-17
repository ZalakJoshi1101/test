const USER = require("../model/signup")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

exports.auth = async function (req, res, next) {
    try {
        // console.log(req.headers);
       const token = req.headers.token
       if(!token){
        throw new Error("not yet get token")
       }

       const checktoken = await jwt.verify(token , "SVCCS")
    //    console.log(checktoken);
       const checkuser = await USER.findById(checktoken.id)

       if(!checkuser){
        throw new Error("user is not found")
       }

       next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.signuppage = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const data = await USER.create(req.body)

        const token = jwt.sign({ id : data._id }, 'SVCCS');

        res.status(201).json({
            status: "success",
            message: "data created successfully",
            data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.loginpage = async function (req, res, next) {
    try {
        const checkdata = await USER.findOne({ uname: req.body.uname })
        if (!checkdata) {
            throw new Error("invalid user name")
        }

        const checkpassword = await bcrypt.compare(req.body.password, checkdata.password)
        if (!checkpassword) {
            throw new Error("check the password first")
        }

        const token = jwt.sign({ id : checkdata._id }, 'SVCCS');

        res.status(201).json({
            status: "success",
            message: "login successfully",
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.finddata = async function (req, res, next) {
    try {
        const data = await USER.find()

        res.status(200).json({
            status: "success",
            message: "data find successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
const Auth = require('./auth-model');


const checkPayload = (req,res,next) => {
    const { username,password } = req.body
    if(!username || !password){
        res.status(401).json({ message : "username and password required" })
    }
    else{
        next()
    }
}

const checkUsernameExist = async (req,res,next) => {
    try{
        const { username } = req.body;
        const [user] = await Auth.findBy({username});
        if(user){
            res.status(401).json({ message : "username taken" })
        }
        else{
            res.username = username;
            next()
        }
    }
    catch(err){
    next(err)
    }
}

const checkUsernameNotExist = async (req,res,next) => {
    try{
        const { username } = req.body;
        const [user] = await Auth.findBy({username});
        if(!user){
            res.status(401).json({ message : "invalid credentials" })
        }
        else{
            res.username = username;
            next()
        }
    }
    catch(err){
    next(err)
    }
}

module.exports = {
    checkUsernameExist,
    checkUsernameNotExist,
    checkPayload
}
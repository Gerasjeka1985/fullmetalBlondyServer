const jwt = require("jsonwebtoken");


module.exports = function (req, res, next){
    //split(' ')[1]
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        }catch(error){
            return res.json({
                message: "Нет доступа."
            })
        }
    }
    else{
        return res.json({
            message:"Нет доступа"
        })
    }
}
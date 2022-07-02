const jwt = require('jsonwebtoken')

const middlewareController = {

    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token 
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
                if (err) {
                    req.user = undefined    
                    res.status(403).json("Token is not valid")
                }
                // decoded: payload jwt
                req.user = decoded 
                next()
            })
        } else {
            res.status(401).json("You are not authenticated")
        }
    }
}

module.exports = middlewareController   
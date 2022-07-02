const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


let refreshTokens = []
const authController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            // Create new user
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashed
            }
            // Save on db
            User.create(newUser)
            res.status(200).json(newUser)
        }
        catch (err) {
            res.status(500), json(err)
        }
    },
    generateAccessToken: (user) => {
        jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" }
        )
    },
    generateRefreshToken: (user) => {
        jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "30s" }
        )
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (!user) {
               return res.status(404).json("Wrong Email")
            }

            const validPassword = bcrypt.compare(req.body.password, user.password)

            if (!validPassword) {
               return res.status(404).json("Wrong Password")
            }

            if (user && validPassword) {
                const accessToken = this.generateAccessToken(user)
                const refreshToken = this.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true
                })
                const { password, ...others } = user.dataValues
                res.status(200).json({...others, accessToken}) // FE
            }

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    requestRefreshToken: async(req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json('You are not authenticateds')
        }
        if (!refreshTokens.includes(refreshToken)) {

        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err)
            }
            refreshToken = refreshToken.filter((token) => token !== refreshToken)

            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)  
            refreshToken.push(newRefreshToken) 
            res.cookie("resfreshToken", newRefreshToken, {
                httpOnly: true
            })
            res.status(200).json({accessToken: newAccessToken})
        })
    },

    userLogout: async(req, res)=> {
        res.clearCookie("refreshToken")
        refreshTokens = requestRefreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Logged out Success")
    }
    
}

module.exports = authController
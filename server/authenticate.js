const jwt = require('jsonwebtoken')
const User = require('./model/userSchema')
const Faculty = require('./model/facultySchema')

const authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            throw new Error("no token")
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const rootUser = await User.findOne({ _id: verifyToken._id })
        const faculty = await Faculty.findOne({ _id: verifyToken._id })

        if (!rootUser && !faculty) { throw new Error('User not found') }

        if (!rootUser) {
            req.rootUser = faculty;
        } else {
            req.rootUser = rootUser;
        }

        next();

    } catch (err) {
        res.status(401).send("error")
        // console.log(err);
    }
}

module.exports = authenticate;
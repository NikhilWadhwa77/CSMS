const mongoose = require('mongoose')
const express = require('express');
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authenticate = require("./authenticate")


// user schema 
const User = require('./model/userSchema');
const Faculty = require('./model/facultySchema')

const app = express();

app.use(express.json())

app.use(cookieParser())


// env file (dotenv)
dotenv.config({ path: './config.env' })

const port = process.env.PORT

//database connectivity
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log('database connection [ SUCCESS ]')
}).catch((err) => {
    console.log('database connection [ FAIL ]')
})


// routes
app.get('/', (req, res) => {
    res.send('hello world from server')
})

app.get('/signin', (req, res) => {
    res.send('sign in page')
})

// post req to get and save student data in database

app.post('/register', (req, res) => {
    const { name, email, rollno, password, cpassword } = req.body;

    console.log(req.body)

    if (!name || !email || !rollno || !password || !cpassword) {
        return res.status(422).send({ messege: "enter data carefully" })
    }

    User.findOne({ rollno: rollno })
        .then((userExist) => {

            if (userExist) {
                return res.status(422).send({ err: "roll no already exists" })
            }

            if (password != cpassword) {
                return res.status(422).send({ err: "Passwords do not match" })
            }

            const user = new User({ name, email, rollno, password, cpassword })


            // pre method used in userSchema.js


            user.save().then(() => {
                res.status(201).send({ msg: "User registered Successfully" })
            }).catch((err) => {
                res.status(500).send({ err: "[ FAILED to register user ]" })
            })

        }).catch((err) => { console.log(err) })

})

app.post('/signin', async (req, res) => {

    try {
        const { rollno, password } = req.body

        if (!rollno || !password) {
            return res.status(400).send({ err: "Fill details to Sign In" })
        }

        const userLogin = await User.findOne({ rollno: rollno })

        // console.log(userLogin)

        if (userLogin) {

            const isPasswordMatch = await bcrypt.compare(password, userLogin.password)

            if (isPasswordMatch) {

                const token = jwt.sign({ _id: userLogin._id, role: "S" }, process.env.SECRET_KEY);
                res.cookie("token", token, {
                    expiresIn: "1h",
                    httpOnly: false
                });

                return res.send({ msg: "Sign In [ SUCCESS ]" })
            } else {
                return res.status(400).send({ err: "INVALID CREDENTIALS" })
            }

        } else {
            return res.status(400).send({ err: "INVALID CREDENTIALS" })
        }


    } catch (err) {
        console.log(err)
    }

})

// deletestudent

app.post('/deletestudent', async (req, res) => {

    const { deleteItem: rollno } = req.body

    if (!rollno) {
        return res.status(400).send({ err: "Fill details to Sign In" })
    }

    const stu = await User.findOne({ rollno: rollno })

    if (stu) {
        User.deleteOne({ rollno: rollno })
            .then(res.status(200).send({ msg: "Sucessfully DELETED" }))
            .catch(err => {
                console.log(err)
            })
    } else {
        return res.status(400).send({ err: "INVALID CREDENTIALS" })
    }


})

// about us

app.get('/myaccount', authenticate, (req, res) => {
    // console.log(req.rootUser);
    res.send(req.rootUser)
})

// to get user data
app.get('/getData', authenticate, (req, res) => {
    // console.log(req.rootUser);
    res.send(req.rootUser)
})

// add faculty



app.post('/addfaculty', (req, res) => {
    const { name, email, facultyID, password } = req.body;

    console.log(req.body)

    if (!name || !email || !facultyID || !password) {
        return res.status(422).send({ messege: "enter data carefully" })
    }

    Faculty.findOne({ facultyID: facultyID })
        .then((userExist) => {

            if (userExist) {
                return res.status(422).send({ err: "facultyID no already exists" })
            }

            const faculty = new Faculty({ name, email, facultyID, password })


            // pre method used in userSchema.js

            faculty.save().then(() => {
                res.status(201).send({ msg: "faculty registered Successfully" })
            }).catch((err) => {
                res.status(500).send({ err: "[ FAILED to add faculty ]" })
            })

        }).catch((err) => { console.log(err) })

})

// faculty sign in

app.post('/facultySignin', async (req, res) => {

    try {
        const { facultyID, password } = req.body

        if (!facultyID || !password) {
            return res.status(400).send({ err: "Fill details to Sign In" })
        }

        const userLogin = await Faculty.findOne({ facultyID: facultyID })

        // console.log(userLogin)

        if (userLogin) {

            const isPasswordMatch = userLogin.password === password

            if (isPasswordMatch) {
                const token = jwt.sign({ _id: userLogin._id, role: "F" }, process.env.SECRET_KEY);

                res.cookie("token", token, {
                    expiresIn: "1h",
                    httpOnly: false
                });

                return res.send({ msg: "Sign In [ SUCCESS ]" })
            } else {
                return res.status(400).send({ err: "INVALID CREDENTIALS" })
            }

        } else {
            return res.status(400).send({ err: "INVALID CREDENTIALS" })
        }


    } catch (err) {
        console.log(err)
    }

})

// deletefaculty

app.post('/deletefaculty', async (req, res) => {

    const { deleteItem: facultyID } = req.body

    if (!facultyID) {
        return res.status(400).send({ err: "Fill details to Sign In" })
    }

    const faculty = await Faculty.findOne({ facultyID: facultyID })

    if (faculty) {
        Faculty.deleteOne({ facultyID: facultyID })
            .then(res.status(200).send({ msg: "Sucessfully DELETED" }))
            .catch(err => {
                console.log(err)
            })
    } else {
        return res.status(400).send({ err: "INVALID CREDENTIALS" })
    }


})

// adminsignin

app.post('/adminsignin', (req, res) => {
    const { adminID, password } = req.body

    if (!adminID || !password) {
        return res.status(400).send({ err: "Fill details to Sign In" })
    }

    if (adminID === '1973' && password === '1973') {

        const token = jwt.sign({ role: "ADMIN" }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            expiresIn: "1h",
            httpOnly: false
        });

        return res.send({ msg: "Sign In [ SUCCESS ]" })

    } else {
        return res.status(400).send({ err: "INVALID CREDENTIALS bruh" })
    }
})

// get list of students
app.get('/getlist', async (req, res) => {
    const all = await User.find();
    res.send(all)
})

// getfacultylist
app.get('/getfacultylist', async (req, res) => {
    const all = await Faculty.find();
    res.send(all)
})

// listen
app.listen(port, () => {
    console.log(`server started at port ${port}`)
})
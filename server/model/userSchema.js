const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    marks: [
        {
            pa: {
                type: String
            },
            fee: {
                type: String
            },
            nalr: {
                type: String
            }
        }
    ]

})

// password hashing
userSchema.pre('save', async function (next) {

    // console.log("hello from hashing")

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }

    next();

});


const student = mongoose.model('STUDENT', userSchema);

module.exports = student;


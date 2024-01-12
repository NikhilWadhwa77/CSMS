const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    facultyID: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

const faculty = mongoose.model('faculty', userSchema);

module.exports = faculty;


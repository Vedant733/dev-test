const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: 'String',
        required: true
    },
    bio: {
        type: 'String',
    },
    qualification: {
        type: 'String',
        required: true
    },
    achievements: {
        type: 'String',
    },
    website: {
        type: 'String'
    },
    // projects: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'project'
    // }],
    contact: {
        type: 'String',
    },
    skills: {
        type: ['String'],
        required: true
    },
    social: {
        youtube: {
            type: 'String',
        },
        facebook: {
            type: 'String',
        },
        twitter: {
            type: 'String',
        },
        instagram: {
            type: 'String',
        },
        linkedin: {
            type: 'String'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
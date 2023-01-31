const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
            ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'No Profile' })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    var {
        bio,
        status,
        qualification,
        achievements,
        website,
        contact,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (qualification) profileFields.qualification = qualification
    if (achievements) profileFields.achievements = achievements
    if (contact) profileFields.contact = contact
    if (website) profileFields.website = website
    if (skills && skills.length > 0) {
        skills += ''
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram
    if (linkedin) profileFields.social.linkedin = linkedin

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id },
                { $set: profileFields },
                { new: true })

            return res.json(profile);
        }

        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error(err.message)
    }
})

// all Profiles

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// profile by user id

router.get('/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'Profile Not Found' })
        }
        res.json(profile)
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'Profile Not Found' })
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// delete profile user 

router.delete('/:user_id', auth, async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.params.user_id })
        // Remove User
        await User.findOneAndRemove({ _id: req.params.user_id })

        res.json({ msg: 'User Deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// add projects

// router.put('/project', [
//     auth, [
//         check('title', 'Title is Required').not().isEmpty(),
//         check('description', 'Description is Required').not().isEmpty(),
//     ]
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const { title, description, requirements, startDate, isCompleted } = req.body
//     const newProj = { title, description, requirements, startDate, isCompleted }

//     try {
//         const profile = await Profile.findOne({ user: req.user.id })
//         profile.projects.unshift(newProj)
//         await profile.save()
//         res.json(profile)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

// // delete project

// router.delete('/project/:proj_id', auth, async (req, res) => {
//     try {

//         const profile = await Profile.findOne({ user: req.user.id })
//         const indexRemove = profile.projects.map(item => item.id).indexOf(req.params.proj_id)
//         profile.projects.splice(indexRemove, 1)
//         await profile.save()
//         res.json(profile)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })


module.exports = router
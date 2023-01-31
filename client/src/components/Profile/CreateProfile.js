import React, { useState } from 'react'
import './CreateProfile.css'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { setCurrentProfile } from '../../actions/profile';


const style = {
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: 'translate(-50%)',
    width: '35vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    zIndex: 100,
};

function CreateProfile({ setAlert, isAuthenticated, setCurrentProfile, profile }) {
    const [displaySocials, setDisplaySocials] = useState('');

    const [formData, setFormData] = useState({
        status: '',
        bio: '',
        qualification: '',
        website: '',
        contact: '',
        twitter: '',
        youtube: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        skills: '',
    })

    if (profile.profile) return <Redirect to='/dashboard' />
    const {
        status,
        bio,
        qualification,
        website,
        contact,
        twitter,
        youtube,
        facebook,
        instagram,
        linkedin,
        skills,
    } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setCurrentProfile(formData)
    }

    return (
        <Box sx={style}>
            <h1 style={{ fontSize: '2em', color: '#539fff' }}><i className="fa fa-user" style={{ margin: '1em' }}></i>Create Your Profile</h1>
            <form className="createProfile_form " onSubmit={e => onSubmit(e)}>
                <select className="createProfile_status" name='status' value={status} onChange={(e) => onChange(e)}>
                    <option hidden value="0">Select Your Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student">Student</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <input placeholder="Bio" type="textarea" class="createProfile_bio" name="bio" value={bio} onChange={e => onChange(e)} />
                <input placeholder="Qualification" class="createProfile_qualification" name="qualification" value={qualification} onChange={e => onChange(e)} />
                <input placeholder="Website" class="createProfile_website" name="website" value={website} onChange={e => onChange(e)} />
                <input placeholder="Contact" class="createProfile_contact" name="contact" value={contact} onChange={e => onChange(e)} />
                <input placeholder="Skills" class="createProfile_skills" name="skills" value={skills} onChange={e => onChange(e)} />
                <small>Use comma separated values eg. C++ , Python</small>
                <Button style={{ margin: '2em' }} variant='outlined' onClick={() => setDisplaySocials(!displaySocials)}>Add Socials</Button>
                {displaySocials && <>
                    <Input style={{ fontSize: '1.2em', width: '25vw', margin: '1em' }} startAdornment={<InputAdornment position='start'><InstagramIcon /></InputAdornment>} placeholder="Instagram" class="createProfile_links_instagram" name="instagram" value={instagram} onChange={e => onChange(e)} />
                    <Input style={{ fontSize: '1.2em', width: '25vw', margin: '1em' }} startAdornment={<InputAdornment position='start'><LinkedInIcon /></InputAdornment>} placeholder="Linkedin" class="createProfile_links_linkedin" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                    <Input style={{ fontSize: '1.2em', width: '25vw', margin: '1em' }} startAdornment={<InputAdornment position='start'><TwitterIcon /></InputAdornment>} placeholder="Twitter" class="createProfile_links_twitter" name="twitter" value={twitter} onChange={e => onChange(e)} />
                    <Input style={{ fontSize: '1.2em', width: '25vw', margin: '1em' }} startAdornment={<InputAdornment position='start'><FacebookIcon /></InputAdornment>} placeholder="Facebook" class="createProfile_links_facebook" name="facebook" value={facebook} onChange={e => onChange(e)} />
                    <Input style={{ fontSize: '1.2em', width: '25vw', margin: '1em' }} startAdornment={<InputAdornment position='start'><YouTubeIcon /></InputAdornment>} placeholder="Youtube" class="createProfile_links_youtube" name="youtube" value={youtube} onChange={e => onChange(e)} />                </>}
                <Button type="submit" variant='contained' style={{ width: 'auto', fontSize: '1em' }}>Create Profile</Button>
            </form>
        </Box>
    )
}

CreateProfile.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile,
});

export default connect(mapStateToProps, { setAlert, setCurrentProfile })(CreateProfile)

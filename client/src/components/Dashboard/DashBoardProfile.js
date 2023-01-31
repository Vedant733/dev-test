import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Gravatar from 'react-gravatar'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button } from '@mui/material'
import { setCurrentProfile } from '../../actions/profile'

function DashBoardProfile({ auth, setCurrentProfile, profile }) {

    const [formData, setFormData] = useState({
        status: profile?.profile?.status,
        bio: profile?.profile?.bio,
        qualification: profile?.profile?.qualification,
        website: profile?.profile?.website,
        contact: profile?.profile?.contact,
        twitter: profile?.profile?.social?.twitter,
        youtube: profile?.profile?.social?.youtube,
        facebook: profile?.profile?.social?.facebook,
        instagram: profile?.profile?.social?.instagram,
        linkedin: profile?.profile?.social?.linkedin,
        skills: profile?.profile?.skills,
    })
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

    return (
        // Header
        <div style={{ zIndex: 0, padding: '1em', }}>
            <div style={{ padding: '1em', boxShadow: 'rgba(0, 0, 0, 0.45) 0px 5px 15px', zIndex: 10000, background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '1em', justifyContent: 'center' }}>
                    <img src={profile.profile.user.avatar} style={{ margin: '1em', height: '3em', width: '3em' }} />
                    Welcome {profile.profile.user.name}
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {bio && <><label style={{ fontSize: '1.4em' }}>Bio</label><input name='bio' value={bio} style={{ fontSize: '1.4em', border: 'none', marginBottom: '1em' }} onChange={e => onChange(e)} /></>}
                    <label style={{ fontSize: '1.4em' }}>Status</label><select className="createProfile_status" style={{ marginLeft: '0' }} name='status' value={status} onChange={(e) => onChange(e)}>
                        <option hidden value="0">Select Your Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student">Student</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    {contact && <><label style={{ fontSize: '1.4em' }}>Contact</label><input name='contact' value={contact} style={{ fontSize: '1.4em', marginBottom: '1em', border: 'none' }} onChange={e => onChange(e)} /></>}
                    {qualification && <><label style={{ fontSize: '1.4em' }}>Qualification</label><input name='qualification' value={qualification} style={{ fontSize: '1.4em', marginBottom: '1em', border: 'none' }} onChange={e => onChange(e)} /></>}
                    {skills && <><label style={{ fontSize: '1.4em' }}>Skills</label><input name='skills' value={skills} style={{ fontSize: '1.4em', marginBottom: '1em', border: 'none' }} onChange={e => onChange(e)} /></>}
                    {instagram && <><InstagramIcon /><input style={{ fontSize: '1.4em', border: 'none', marginBottom: '1em' }} name="instagram" value={instagram} onChange={e => onChange(e)} /></>}
                    {linkedin && <><LinkedInIcon /><input style={{ fontSize: '1.4em', border: 'none', marginBottom: '1em' }} name="linkedin" value={linkedin} onChange={e => onChange(e)} /> </>}
                    {twitter && <><TwitterIcon /><input style={{ fontSize: '1.4em', border: 'none', marginBottom: '1em' }} name="twitter" value={twitter} onChange={e => onChange(e)} /></>}
                    {facebook && <><FacebookIcon /><input style={{ fontSize: '1.4em', border: 'none', marginBottom: '1em' }} name="facebook" value={facebook} onChange={e => onChange(e)} /></>}
                    {youtube && <><YouTubeIcon /><input style={{ fontSize: '1.4em', border: 'none', marginBottom: '1em' }} name="youtube" value={youtube} onChange={e => onChange(e)} /></>}

                </div>
                <Button>Add Project</Button><br /><br />
                <Button onClick={(e) =>
                    setCurrentProfile(formData)
                }>Save</Button><br /><br /><hr />
                Created on <small>{profile.profile.date}</small>
            </div>
        </div>
    )
}

DashBoardProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    setCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { setCurrentProfile })(DashBoardProfile)

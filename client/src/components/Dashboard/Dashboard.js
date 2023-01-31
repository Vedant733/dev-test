import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Gravatar from 'react-gravatar'
import { Button } from '@mui/material'

function Dashboard({ auth, getCurrentProfile, profile }) {
    useEffect(async () => {
        await getCurrentProfile();
    }, [])


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
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
    return (
        <div>
            {profile.loading && profile.profile == null
                ? <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} size={40} thickness={4} />
                : profile.profile == null
                    ? <Link to='/createProfile'>Create Profile</Link>
                    : <div style={{ margin: '1em' }} >
                        <Button><Link style={{ margin: '1em', textDecoration: 'none' }} to="/editProfile">Edit Profile</Link></Button>
                        <Button><Link style={{ margin: '1em', textDecoration: 'none' }} to="/addProject">Add Project</Link></Button>
                    </div>
            }
        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)

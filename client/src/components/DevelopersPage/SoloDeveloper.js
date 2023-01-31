import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import axios from 'axios'

function SoloDeveloper({ getProfileById, match, auth }) {
    const [profile, setProfile] = React.useState(undefined)
    const [projects, setProjects] = React.useState(undefined)
    React.useEffect(async () => {
        setProfile(await axios.get(`/api/profile/${match.params.id}`))
        setProjects(await axios.get(`/api/project/user/${auth.user._id}`))
    }, [])
    console.log(projects.data)
    return (
        <div>
            {profile !== undefined && <>
                <div style={{ display: 'flex', alignItems: 'center', margin: '1em', marginLeft: 0 }}>
                    <img src={profile.data.user.avatar} height="60px" width="60px" style={{ marginRight: '1em' }} />
                    {profile.data.user.name}
                </div>
                <small>{profile.data.status}</small><br /><br />
                {profile.data.bio && <span style={{ display: 'block', marginBottom: '.7em' }}>{profile.data.bio}</span>}
                <h3 style={{ marginBottom: '.7em' }}>Skills : {profile.data.skills.join(' , ')}</h3>
                {profile.data.qualification && <span style={{ display: 'block', marginBottom: '.7em' }}>Qualification : {profile.data.qualification}</span>}
                {profile.data.contact && <span style={{ display: 'block', marginBottom: '.7em' }}>Contact : {profile.data.contact}</span>}

            </>
            }
        </div>
    )
}

SoloDeveloper.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(SoloDeveloper)


import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'
import DeveloperCard from './DeveloperCard'
import CircularProgress from '@mui/material/CircularProgress';

function Developers({ profile, getAllProfiles }) {
    useEffect(() => {
        getAllProfiles()
    }, [])
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>Developers</h1>
            {(profile.loading || !profile.profiles || !profile.profiles.data) && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} size={40} thickness={4} />}
            {!profile.loading && profile.profiles && profile.profiles.data && profile.profiles.data.length === 0 && <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>No Developer Found</h1>}
            {!(profile.loading || !profile.profiles || !profile.profiles.data) && profile.profiles.data.map(profile =>
                <DeveloperCard profile={profile} />
            )
            }
        </div>
    )
}

Developers.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getAllProfiles })(Developers)

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'


function Sidebar({ auth: { isAuthenticated, loading }, logout }) {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <div class="text-center">
            {!loading && isAuthenticated && <aside className='sidebar'>
                <Link to='/' style={{ textDecoration: 'none', marginLeft: '90%' }} onClick={logout}><i class="fas fa-sign-out-alt"></i> Logout</Link>
            </aside>}
        </div>
    )
}

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Sidebar);

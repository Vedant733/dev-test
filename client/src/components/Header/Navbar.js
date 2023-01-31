import './Navbar.css';
import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

function Navbar({ auth: { isAuthenticated, loading }, logout }) {

    const [isOpen, setIsOpen] = useState(false);
    const clickHandler = () => {
        setIsOpen((prevState) => {
            return !prevState;
        });
    }

    const authLinks = (
        <ul>
            <li className="nav-list-element"><Link to="/dashboard" className="nav-list-link" onClick={clickHandler}>Dashboard</Link></li>
            <li className="nav-list-element"><Link to="/projects" className="nav-list-link" onClick={clickHandler}>Projects</Link></li>
            <li className="nav-list-element"><span className="nav-list-link" onClick={() => {
                logout()
                clickHandler()
            }}>Logout</span></li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li className="nav-list-element"><Link to="/register" className="nav-list-link" onClick={clickHandler}>Register</Link></li>
            <li className="nav-list-element"><Link to="/login" className="nav-list-link" onClick={clickHandler}>Log In</Link></li>
        </ul>
    )

    return (
        <div className={'navigation'}>
            <input checked={isOpen} className='checkbox' type='checkbox' id='nav-toggle' onClick={clickHandler} />
            <label htmlFor='nav-toggle' className='nav-button'>
                <span className='nav-icon'>&nbsp; </span>
            </label>
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-list-element"><Link to="/" className="nav-list-link" onClick={clickHandler}>Home</Link></li>
                    <li className="nav-list-element" > <Link to="/developers" className="nav-list-link" onClick={clickHandler}>Developers</Link></li>
                    {!loading && isAuthenticated ? authLinks : guestLinks}
                </ul>
            </nav>
            <div className="nav-background">&nbsp; </div>
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar);

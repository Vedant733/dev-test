import React, { useState } from 'react'
import './Login.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    zIndex: 100,
};

function Login({ login, isAuthenticated }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        login(email, password);
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div class="login_container">
            <Box sx={style}>
                <h1 style={{ marginBottom: '1em', fontSize: '2.3em', color: '#539fff' }}>Log In</h1>
                <span style={{ fontSize: '1.2em' }}><i className="fa fa-user" style={{ margin: '1em' }}></i>Sign Into Your Account</span>
                <form className="login_form" onSubmit={e => onSubmit(e)}>
                    <input placeholder="Email" class="login_form_email" name="email" value={email} onChange={e => onChange(e)} required />
                    <input type="password" placeholder="Password" class="login_form_password" name="password" value={password} minLength='6' onChange={e => onChange(e)} required />
                    <Button type="submit" variant='contained' style={{ width: 'auto', fontSize: '1em' }}>Log In</Button>
                    <span style={{ margin: '1em' }}>Don't Have an Account? <Link to="/login">Sign Up</Link></span>
                </form>
            </Box>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login)

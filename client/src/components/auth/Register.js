import React, { useState } from 'react'
import './Register.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

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

function Register({ setAlert, register, isAuthenticated }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    })

    const { name, email, password, confirm_password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirm_password) {
            setAlert('Passwords do not match', 'error')
        }
        else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div class="register_container">
            <Box sx={style}>
                <h1 style={{ marginBottom: '1em', fontSize: '2.3em', color: '#539fff' }}>Sign Up</h1>
                <span style={{ fontSize: '1.2em' }}><i className="fa fa-user" style={{ margin: '1em' }}></i>Create Your Account</span>
                <form className="register_form" onSubmit={e => onSubmit(e)}>
                    <input placeholder="Name" class="register_form_name" name="name" value={name} onChange={e => onChange(e)} />
                    <input placeholder="Email" class="register_form_email" name="email" value={email} onChange={e => onChange(e)} />
                    <input type="password" placeholder="Password" class="register_form_password" name="password" value={password} minLength='6' onChange={e => onChange(e)} />
                    <input type="password" placeholder="Confirm Password" class="register_form_confirmPass" name="confirm_password" value={confirm_password} onChange={e => onChange(e)} />
                    <Button type="submit" variant='contained' style={{ width: 'auto', fontSize: '1em' }}>Register</Button>
                    <span style={{ margin: '1em' }}>Already Have An Account? <Link to="/login">Sign In</Link></span>
                </form>
            </Box>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register)

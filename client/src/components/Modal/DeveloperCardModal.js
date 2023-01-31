import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ReactDOM from 'react-dom'
import './DeveloperCardModal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function DeveloperCardModal(props) {
    const profile = props.profile
    const handleClose = () => props.setIsModalOpen(false);
    return ReactDOM.createPortal(
        <Modal
            open={props.isModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '1em', marginLeft: 0 }}>
                    <img src={profile.user.avatar} height="60px" width="60px" style={{ marginRight: '1em' }} />
                    {profile.user.name}
                </div>

                <small>{profile.status}</small><br /><br />
                {profile.bio && <span style={{ display: 'block', marginBottom: '.7em' }}>{profile.bio}</span>}
                <h3 style={{ marginBottom: '.7em' }}>Skills : {profile.skills.join(' , ')}</h3>
                {profile.qualification && <span style={{ display: 'block', marginBottom: '.7em' }}>Qualification : {profile.qualification}</span>}
                {profile.contact && <span style={{ display: 'block', marginBottom: '.7em' }}>Contact : {profile.contact}</span>}
                <Button onClick={() => handleClose()}>Close</Button>
            </Box>
        </Modal >
        , document.getElementById('modal'))
}


export default DeveloperCardModal


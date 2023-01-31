import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ReactDOM from 'react-dom'
import axios from 'axios';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

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

function ProjectModal(props) {
    const [socials, setSocials] = useState(null)
    React.useEffect(async () => {
        setSocials(await axios.get(`/api/social/${props.user_id}`))
    }, [])
    console.log(socials)
    const project = props.project
    const handleClose = () => props.setIsModalOpen(false);
    return ReactDOM.createPortal(
        <Modal
            open={props.isModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={project.avatar} width='40px' height='40px' style={{ marginRight: '1em' }} /><h3 style={{ display: 'inline', fontSize: '1.4    em' }} >{project.title}</h3>
                </div>
                {/* Content */}
                <div style={{ padding: '1em', margin: '1em' }}>
                    <h5 style={{ margin: '1em', fontSize: '1.2em' }}>Description : {project.description}</h5>
                    <h5 style={{ margin: '1em', fontSize: '1.2em' }}>Requirements : {project.requirements.join(' , ')}</h5>
                    {
                        socials !== null &&
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', margin: '1em' }}>
                                {socials.data.instagram && <div style={{ display: 'flex', alignItems: 'center' }} ><InstagramIcon />{socials.data.instagram}<br /></div>}
                                {socials.data.linkedin && <div style={{ display: 'flex', alignItems: 'center' }} ><LinkedInIcon /> {socials.data.linkedin}<br /></div>}
                                {socials.data.twitter && <div style={{ display: 'flex', alignItems: 'center' }} ><TwitterIcon />  {socials.data.twitter}<br /></div>}
                                {socials.data.facebook && <div style={{ display: 'flex', alignItems: 'center' }} ><FacebookIcon /> {socials.data.facebook}<br /></div>}
                                {socials.data.youtube && <div style={{ display: 'flex', alignItems: 'center' }} ><YouTubeIcon />  {socials.data.youtube}</div>}
                            </div>
                        </>
                    }
                </div>
                <Button onClick={() => handleClose()}>Close</Button>
            </Box>
        </Modal>
        , document.getElementById('modal'))
}


export default ProjectModal


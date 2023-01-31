import React from 'react'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './AddProject.css'
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { Button } from '@mui/material';
import { setProject } from '../../actions/project';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '35vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    zIndex: 100,
};

function AddProject({ setProject }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [project, setUProject] = React.useState({
        title: '',
        description: '',
        requirements: '',
        isCompleted: false,
        avatar: '',
        date: '',
        commnets: '',
        likes: '',
    })

    const {
        title,
        description,
        requirements,
        isCompleted,
        avatar,
        date,
        commnets,
        likes,
    } = project

    const onChange = (e) => {
        setUProject({ ...project, [e.target.name]: e.target.value })
    }
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );




    return (
        < Box sx={style}>
            <h1 style={{ display: 'flex', alignItems: 'center' }}><DomainVerificationIcon style={{ fontSize: '1.3em', marginRight: '.3em' }} /> Add Project</h1><br />
            <form class="addProject_form" style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => {
                e.preventDefault();
                if (setProject(project)) { setOpen(true); }
            }}>
                <input type="text" name="title" placeholder="Title" value={title} class="addProject_title" onChange={e => onChange(e)} />
                <textarea type="textarea" name="description" rows="5" style={{ resize: 'none' }} placeholder="Description" value={description} class="addProject_description" onChange={e => onChange(e)} />
                <input name="requirements" placeholder="Requirements" value={requirements} class='addProject_requirements' onChange={e => onChange(e)} />
                <Button type="submit">Submit</Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Project Added"
                action={action}
            />
        </Box>
    )
}

AddProject.propTypes = {
    setProject: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { setProject })(AddProject)

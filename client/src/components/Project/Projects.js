import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects } from '../../actions/project'
import CircularProgress from '@mui/material/CircularProgress';
import ProjectCard from './ProjectCard';

function Projects({ auth, getAllProjects, project }) {
    useEffect(() => {
        getAllProjects()
    }, [])
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Projects</h1>
            {(project.loading || !project.projects) && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} size={40} thickness={4} />}
            {!project.loading && project.projects.data.map(project =>
                <div>
                    <ProjectCard project={project} />
                </div>)
            }
        </div>
    )
}

Projects.propTypes = {
    getAllProjects: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    project: state.project,
})

export default connect(mapStateToProps, { getAllProjects })(Projects)


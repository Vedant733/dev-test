import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects } from '../../actions/project'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ProjectModal from './ProjectModal';

function ProjectCard({ project }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    return (
        <>
            {isModalOpen && <ProjectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} project={project} user_id={project.user} />}
            <Card sx={{ minWidth: 275, margin: '1em', backgroundColor: project.isCompleted ? '#E8E8E8' : 'white' }} variant='outlined' >
                <CardContent onClick={() => {
                    if (project.isCompleted) return
                    setIsModalOpen(true);
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={project.avatar} width='30px' height='30px' style={{ marginRight: '1em' }} /><h3 style={{ display: 'inline' }} >{project.title}</h3>
                    </div>
                    <br />
                    {/* Content */}
                    <div style={{ padding: '1em' }}>
                        {<h5>{project.description}</h5>}
                    </div>
                    <div style={{ marginTop: '2em' }}>{project.date}</div>
                </CardContent>
            </Card>
        </>
    )
}

export default ProjectCard


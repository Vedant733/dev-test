import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Gravatar from 'react-gravatar'
import DeveloperCardModal from '../Modal/DeveloperCardModal';
import { Button } from '@mui/material';

function DeveloperCard({ profile }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    return (
        <>
            {isModalOpen && <DeveloperCardModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} profile={profile} />}
            <Card sx={{ minWidth: 275, margin: '1em' }} variant='outlined' >
                <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={profile.user.avatar} height='40' width='40' style={{ margin: '1em' }} />
                        {profile.user.name}
                    </div>
                    <small>{profile.status}</small><br /><br />
                    {profile.bio.length > 80 ? profile.bio.substring(0, 80) + '...' : profile.bio}
                </CardContent>
                <Button onClick={() => {
                    setIsModalOpen(true)
                }}>More</Button>
            </Card>

        </>
    )
}

export default DeveloperCard

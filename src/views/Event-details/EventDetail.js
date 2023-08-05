import { Box, Button, Card, CardMedia, Divider, Grid, Tabs, Tab, Typography, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import ReadMore from './ReadMore';

import GoogleMapReact from 'google-map-react'; // google map api library

import './eventStyle.css'; // styling to overriede mui

//dummy datas
import Events from 'data/events';
import Organizers from 'data/organizers';

const EventDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState('');

    const event = Events[0]; // event fetched from the dummy data object
    const organizer = Organizers.find((organizer) => organizer.organizer_name === event.event_organizer);

    const defaultProps = {
        //for the goggle map component
        center: {
            lat: 8.9806,
            lng: 38.7578
        },
        zoom: 11
    };

    const formatDate = (dateString) => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(dateString);
        const day = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        const formattedDate = `${day} ${month} ${date.getDate().toString().padStart(2, '0')}`;

        return formattedDate;
    };

    const formatTime = (time24) => {
        const [hours, minutes] = time24.split(':');
        let period = 'AM';
        let hours12 = parseInt(hours, 10);

        if (hours12 >= 12) {
            period = 'PM';
            if (hours12 > 12) {
                hours12 -= 12;
            }
        }

        return `${hours12}:${minutes} ${period}`;
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getEventStatus = (event) => {
        const today = new Date();
        const nextSunday = new Date(today);
        nextSunday.setDate(today.getDate() + (7 - today.getDay()));
        if (event.priority === 1) return 'Featuring';
        else if (new Date(event.start_date) <= today && new Date(event.end_date) >= today) {
            return 'Happening';
        } else if (new Date(event.start_date) > today && new Date(event.end_date) <= nextSunday) {
            return 'This Week';
        } else {
            return 'Upcoming';
        }
    };
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                m={1}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Typography variant="h2">Event Detail</Typography>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ width: '100px', bgcolor: '#D1E9FF', color: '#0065DB', '&:hover': { color: 'white' } }}
                    onClick={() => navigate('/events')}
                >
                    Back
                </Button>
            </Grid>
            <Divider sx={{ width: '100%' }} bgcolor="#B6B6B6" />
            <Grid container m={{ md: 1, lg: 3, xl: 3 }} sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }} mb={5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card sx={{ width: '100%' }}>
                            <CardMedia component="img" image={event.event_image} alt="event image"></CardMedia>
                        </Card>
                        <Grid item mt={1.5} gap={1.5} display={'flex'} alignItems={'center'}>
                            <Typography variant="h3">{event.event_name}</Typography>
                            <Divider sx={{ height: 10, bgcolor: 'B6B6B6' }} orientation="vertical" />
                            <Typography variant="h3">5.0</Typography>
                            <StarIcon sx={{ width: '12px', height: '12px', color: '#FFBB00' }} />
                        </Grid>
                        <Grid item>
                            <ReadMore text={event.event_description} maxLetters={250} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5.5} xl={5.5}>
                        <Card sx={{ width: '100%', padding: 3, marginBottom: 1 }}>
                            <Typography variant="h4">Event Detail</Typography>
                            <Divider sx={{ width: '100%' }} bgcolor="#B6B6B6" />
                            <Grid container display={'flex'} gap={5}>
                                <Grid item>
                                    <Typography mt={1}> id</Typography>
                                    <Typography mt={1}>status</Typography>
                                    <Typography mt={1}> Added on</Typography>
                                    <Typography mt={1}>Event Type</Typography>
                                </Grid>
                                <Grid>
                                    <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                        {event.id}
                                    </Typography>
                                    <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                        {event.event_status}
                                    </Typography>
                                    <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                        {event.added_date}
                                    </Typography>
                                    <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                        {event.event_type}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card sx={{ width: '100%', padding: 3, marginBottom: 1 }}>
                            <Grid item display={'flex'} gap={4}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#F3F3F3', borderRadius: '15px' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>
                                        {formatDate(event.start_date)} @ {formatTime(event.start_time)}
                                    </Typography>
                                    <Typography fontSize={theme.typography.caption}>Start Date and Time</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#F3F3F3', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>
                                        {formatDate(event.end_date)} @ {formatTime(event.end_time)}
                                    </Typography>
                                    <Typography fontSize={theme.typography.caption}>End Date and Time</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#F3F3F3', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{getEventStatus(event)}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Status</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#F3F3F3', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{event.event_address}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Event Address</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#F3F3F3', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{event.category}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Category</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card sx={{ width: '100%', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Grid display={'flex'} gap={2}>
                                <Box sx={{ maxWidth: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden' }}>
                                    <img src={organizer.organizer_image} alt="event organizer" />
                                </Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontSize={theme.typography.h4}>{organizer.organizer_name}</Typography>
                                    <Typography fontWeight={theme.typography.fontWeightMedium}>{organizer.category}</Typography>
                                    <Typography>
                                        <Typography display={'inline'} fontWeight={theme.typography.fontWeightBold}>
                                            {organizer.events}
                                        </Typography>{' '}
                                        events
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid display={'flex'}>
                                <Typography variant="h3">{organizer.rate}</Typography>
                                <StarIcon sx={{ width: '12px', height: '12px', color: '#FFBB00', marginTop: 0.5 }} />
                            </Grid>
                        </Card>
                        <Grid item mt={2}>
                            <Button variant="outlined" sx={{ width: '103px' }}>
                                Edit
                            </Button>
                            <Button variant="text" sx={{ color: '#383838' }}>
                                Postpone
                            </Button>
                            <Button variant="text" sx={{ color: '#FF1D1D' }}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container sx={{ width: '100%' }}>
                    <Card sx={{ width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                variant="fullWidth"
                                sx={{ height: '50px', display: 'flex', alignItems: 'center', bgcolor: '#FFF9E8' }}
                                value={tabValue}
                                className="custom-tabs"
                                indicatorColor="white"
                                onChange={handleTabChange}
                            >
                                <Tab value="map" label="Map" />
                                <Tab value="happening" label="Tickets" />
                                <Tab value="speakers" label="Speakers" />
                                <Tab value="schedule" label="Schedule" />
                                <Tab value="sponsor" label="Sponsor" />
                                <Tab value="attendees" label="Attendees" />
                            </Tabs>
                        </Box>
                        <Grid padding={3}>
                            <Grid item display={'flex'} gap={3}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#F3F3F3', borderRadius: '15px' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontSize={theme.typography.h4}>{event.event_address}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Event Address</Typography>
                                </Grid>
                            </Grid>
                            <Box style={{ height: '40vh', width: '100%', borderRadius: '12px' }} mt={2}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: '' }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                >
                                    <Card lat={event.address_latitude} lng={event.address_longitude} text="Here"></Card>
                                </GoogleMapReact>
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EventDetail;

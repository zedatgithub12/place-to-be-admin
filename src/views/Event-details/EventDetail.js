import { useState, useEffect, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    Tab,
    Typography,
    useTheme,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import StarIcon from '@mui/icons-material/Star';
import ReadMore from './ReadMore';
import Connections from 'api';
import GoogleMapReact from 'google-map-react';

import { MoreVert } from '@mui/icons-material';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    IconCalendarMinus,
    IconCalendarTime,
    IconCategory,
    IconCheck,
    IconCircleDashed,
    IconCoins,
    IconLink,
    IconMapPin,
    IconMoonStars,
    IconPhone,
    IconStar,
    IconTags
} from '@tabler/icons';
import { DateFormater, EventStatus, TimeFormater } from 'utils/functions';
import { EventStatuses } from 'data/eventStatus';
import './eventStyle.css'; // styling to overriede mui
import pin from 'assets/icons/marker.svg';
import Loader from 'ui-component/Loader';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Marker = () => (
    <div className="marker">
        <img src={pin} alt="marker" width={30} height={30} />
    </div>
);

const EventDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const GoBack = () => {
        navigate(-1);
    };
    const [tabValue, setTabValue] = useState('map');
    const { state } = useLocation();

    const [event, setEvent] = useState(state);
    const [statusOfEvent, setStatusOfEvent] = useState(state.event_status);
    const [featured, setFeatured] = useState(state.priority);
    const [featuring, setFeaturing] = useState(false);
    const [cancelled, setCancelled] = useState(state.cancelled);
    const [cancelling, setCancelling] = useState(false);
    const [coords, setCoords] = useState(true);
    const [organizer, setOrganizer] = useState([]);
    const [rating, setRating] = useState();
    const [numberOfRatings, setNumberOfRatings] = useState();
    const [loading, setLoading] = useState(true);
    const [fetchingFailed, setFetchingFailed] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const [ratingDetails, setRatingDetails] = useState([]);
    const [userRated, setUserRated] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPopup({
            ...popup,
            status: false
        });
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectItem = (events) => {
        handleMenuClick(events);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    var featuredImageUri = Connections.api + Connections.assets;

    const defaultProps = {
        //for the goggle map component
        center: {
            lat: 8.9806,
            lng: 38.7578
        },
        zoom: 11
    };
    const checkCoords = (latlng) => {
        var latitude = latlng.address_latitude;
        var longitude = latlng.address_latitude;

        if (latitude == null && longitude == null) {
            setCoords(false);
        }
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

    const FeatchEvent = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);

        var ApiUrl = Connections.api + Connections.eventDetail + state.id;

        var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(ApiUrl, {
            method: 'GET',
            headers: headers,
            signal: signal
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    let event = response.data;
                    let ticket = response.tickets;
                    let organizer = response.organizer;
                    let rating = response.rating;
                    let numberOfRatings = response.numberOfRatings;

                    let startTime = response.StartTime;
                    let EndTime = response.EndTime;
                    setEvent(event);
                    setOrganizer(organizer);
                    setRating(rating);
                    setNumberOfRatings(numberOfRatings);
                    setLoading(false);
                    checkCoords(event);
                } else {
                    setLoading(false);
                    setFetchingFailed(true);
                }
            })
            .catch((error) => {
                setLoading(false);
                setFetchingFailed(true);
            });

        return () => {
            controller.abort();
        };
    };

    const FetchUserRating = async () => {
        if (state.userId) {
            const controller = new AbortController();
            const signal = controller.signal;
            var ApiUrl = Connections.api + Connections.moreEventDetails + `?eventid=${state.id}&userid=${state.userId}`;
            // header type for text data to be send to server
            var headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };
            fetch(ApiUrl, {
                method: 'GET',
                headers: headers,
                signal: signal
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setRatingDetails(response.userrating);
                        setCurrentRating(response.userrating.rating);
                        setUserRated(response.userrating.rating ? true : false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });

            return () => {
                controller.abort();
            };
        }
    };

    const handleStatusChange = (status, id) => {
        var Api = Connections.api + Connections.changeEventStatus + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            event_status: status
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });
                    setAnchorEl(null);
                    setStatusOfEvent(status);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error updating event status!'
                });
            });
    };

    //handle the status indicator state of featured event

    const handleFeaturedIndicator = () => {
        if (featured == 1) {
            setFeatured(0);
        } else {
            setFeatured(1);
        }
    };

    const handleCancelledIndicator = () => {
        if (cancelled == 1) {
            setFeatured(0);
        } else {
            setFeatured(1);
        }
    };
    //The following function handles setting event featured
    const handleEventFeaturing = (id) => {
        setFeaturing(true);
        var Api = Connections.api + Connections.MakeEventFeatured + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'PUT', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });

                    setFeaturing(false);
                    handleFeaturedIndicator();
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });

                    setFeaturing(false);
                }
            })
            .catch((error) => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });

                setFeaturing(false);
            });
    };

    //handle cancelling event
    const handleCancelEvent = (id) => {
        setCancelling(true);
        var Api = Connections.api + Connections.MakeEventCancelled + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'PUT', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });

                    setCancelling(false);
                    handleCancelledIndicator();
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });

                    setCancelling(false);
                }
            })
            .catch((error) => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });

                setCancelling(false);
            });
    };

    //handle deleting event
    const Delete = () => {
        setSpinner(true);
        var Api = Connections.api + Connections.deleteEvent + event.id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        // Make the API call using fetch()
        fetch(Api, {
            method: 'DELETE',
            headers: headers,
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });

                    setSpinner(false);
                    handleDialogClose();
                    GoBack();
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                    setSpinner(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error deleting this event!'
                });
                setSpinner(false);
            });
    };
    useEffect(() => {
        FeatchEvent();
        FetchUserRating();

        return () => {};
    }, [state.id]);
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
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 2.4 }}
            >
                <Typography variant="h2">{event.event_name}</Typography>
                <Button variant="text" size="small" sx={{ width: '100px' }} onClick={() => GoBack()}>
                    Back
                </Button>
            </Grid>
            <Divider sx={{ width: '100%' }} bgcolor="#B6B6B6" />
            <Grid container m={{ md: 1, lg: 3, xl: 3 }} sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }} mb={5}>
                    <Grid item xs={12} sm={12} md={5.9} lg={5.9} xl={3.8} sx={{ marginBottom: 1 }}>
                        <Card
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: theme.palette.background.main
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={featuredImageUri + event.event_image}
                                alt="event poster"
                                sx={{ width: '100%', height: '81%' }}
                            />
                            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                                {cancelled != 1 && featured == 1 && (
                                    <Box sx={{ background: theme.palette.background.default, padding: 1, borderBottomLeftRadius: 4 }}>
                                        <Typography variant="h1">
                                            <StarIcon sx={{ color: '#e29000' }} />
                                        </Typography>
                                    </Box>
                                )}
                                {cancelled == 1 && (
                                    <Box sx={{ background: theme.palette.background.default, padding: 1, borderBottomLeftRadius: 10 }}>
                                        <Typography variant="subtitle1" color="error">
                                            Cancelled
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5.9} lg={5.9} xl={3.8}>
                        <Card sx={{ width: '100%', padding: 3, marginBottom: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h4">Event Detail</Typography>
                                <IconButton
                                    aria-controls="row-menu"
                                    aria-haspopup="true"
                                    onClick={(events) => handleSelectItem(events, event)}
                                >
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id="row-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    className="shadow-sm"
                                >
                                    {EventStatuses.filter((item) => item.value !== statusOfEvent).map((item) => (
                                        <MenuItem key={item.id} onClick={() => handleStatusChange(item.value, event.id)}>
                                            {item.label}
                                        </MenuItem>
                                    ))}

                                    {cancelled != 1 && (
                                        <>
                                            <Divider />
                                            <MenuItem onClick={() => handleEventFeaturing(event.id)}>
                                                Featured {featuring && <Loader />}{' '}
                                            </MenuItem>
                                        </>
                                    )}
                                    {cancelled != 1 && (
                                        <MenuItem onClick={() => handleCancelEvent(event.id)}>
                                            Cancel event {cancelling && <Loader />}
                                        </MenuItem>
                                    )}
                                </Menu>
                            </Box>

                            <Divider sx={{ marginY: 1 }} />
                            <Grid container display={'flex'} gap={5}>
                                <Grid item>
                                    <Typography mt={1}>ID</Typography>
                                    <Typography mt={2}>Status</Typography>
                                    <Typography mt={2}> Added on</Typography>
                                    <Typography mt={2}>Event Type</Typography>
                                    <Typography mt={2}>Rating</Typography>
                                </Grid>
                                <Grid>
                                    <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                        {event.id}
                                    </Typography>
                                    <Typography
                                        mt={2}
                                        fontWeight={theme.typography.fontWeightBold}
                                        sx={{ color: EventStatus(statusOfEvent).statusColor }}
                                    >
                                        {EventStatus(statusOfEvent).literalStatus}
                                    </Typography>
                                    <Typography mt={2} fontWeight={theme.typography.fontWeightBold}>
                                        {DateFormater(event.created_at)}
                                    </Typography>
                                    <Typography mt={2} fontWeight={theme.typography.fontWeightBold}>
                                        {event.event_type}
                                    </Typography>
                                    <Typography mt={2} fontWeight={theme.typography.fontWeightBold}>
                                        {event.rating} <StarIcon fontSize="22" sx={{ color: '#e29000' }} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card sx={{ width: '100%', padding: 3, marginBottom: 1 }}>
                            <Grid item display={'flex'} gap={4}>
                                <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                    <IconCalendarTime />
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>
                                        {DateFormater(event.start_date)} @ {TimeFormater(event.start_time)}
                                    </Typography>
                                    <Typography fontSize={theme.typography.caption}>Start Date and Time</Typography>
                                </Box>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                    <IconCalendarMinus />
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>
                                        {DateFormater(event.end_date)} @ {TimeFormater(event.end_time)}
                                    </Typography>
                                    <Typography fontSize={theme.typography.caption}>End Date and Time</Typography>
                                </Box>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                    {getEventStatus(event) === 'Happening' ? <IconCheck /> : <IconCircleDashed />}
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{getEventStatus(event)}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Status</Typography>
                                </Box>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                    <IconMapPin />
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{event.event_address}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Event Address</Typography>
                                </Box>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                    <IconCategory />
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{event.category}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Category</Typography>
                                </Box>
                            </Grid>

                            {event.event_type === 'paid' && (
                                <Grid item display={'flex'} gap={4} mt={2}>
                                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                        <IconCoins />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight={theme.typography.fontWeightBold}>{event.event_entrance_fee} ETB</Typography>
                                        <Typography fontSize={theme.typography.caption}>Regular Ticket Price</Typography>
                                    </Box>
                                </Grid>
                            )}

                            {event.contact_phone && (
                                <Grid item display={'flex'} gap={4} mt={2}>
                                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                        <IconPhone />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight={theme.typography.fontWeightBold}>{event.contact_phone} </Typography>
                                        <Typography fontSize={theme.typography.caption}>Contact phone one</Typography>
                                    </Box>
                                </Grid>
                            )}

                            {event.contact_phone_2 && (
                                <Grid item display={'flex'} gap={4} mt={2}>
                                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                        <IconPhone />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight={theme.typography.fontWeightBold}>{event.contact_phone_2} </Typography>
                                        <Typography fontSize={theme.typography.caption}>Contact phone two</Typography>
                                    </Box>
                                </Grid>
                            )}

                            {event.link_label && (
                                <Grid item display={'flex'} gap={4} mt={2}>
                                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                        <IconTags />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight={theme.typography.fontWeightBold}>{event.link_label} </Typography>
                                        <Typography fontSize={theme.typography.caption}>Link Label</Typography>
                                    </Box>
                                </Grid>
                            )}

                            {event.redirectUrl && (
                                <Grid item display={'flex'} gap={4} mt={2}>
                                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                        <IconLink />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight={theme.typography.fontWeightBold}>{event.redirectUrl} </Typography>
                                        <Typography fontSize={theme.typography.caption}>Link Url</Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5.9} lg={5.9} xl={3.8}>
                        <Card sx={{ width: '100%', padding: 3, display: 'flex', marginBottom: 1 }}>
                            <Grid item>
                                <Typography variant="h4">About Event</Typography>
                                <Divider sx={{ marginY: 1 }} />
                                <ReadMore text={event.event_description} maxLetters={250} />
                            </Grid>
                        </Card>
                        <Card sx={{ width: '100%', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Grid display={'flex'} gap={2}>
                                <Avatar
                                    size={50}
                                    src={featuredImageUri + organizer.business_logo}
                                    alt="event organizer"
                                    style={{ resize: 'contain', aspectRatio: 1 }}
                                />

                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontSize={theme.typography.h4}>{organizer.business_name}</Typography>
                                    <Typography fontWeight={theme.typography.fontWeightMedium}>{organizer.business_category}</Typography>
                                    <Typography>
                                        <Typography display={'inline'} fontWeight={theme.typography.fontWeightBold}>
                                            {organizer.events}
                                        </Typography>
                                        events
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid display={'flex'}>
                                <Typography variant="h4">{organizer.rating}</Typography>
                                <StarIcon sx={{ width: '12px', height: '12px', color: '#FFBB00', marginTop: 0.5 }} />
                            </Grid>
                        </Card>
                        <Grid item mt={2}>
                            <Button
                                variant="text"
                                sx={{ width: '103px' }}
                                onClick={() => navigate('/update-event', { state: { ...event } })}
                            >
                                Update
                            </Button>

                            <Button variant="text" sx={{ color: '#808080' }} onClick={() => handleDialogOpen()}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={8} lg={7.9} xl={7.9}>
                        <Card sx={{ width: '100%' }}>
                            <TabContext value={tabValue}>
                                <TabList
                                    onChange={handleTabChange}
                                    sx={{ width: '100%' }}
                                    className="custom-tabs "
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab value="map" label="Map" />
                                    <Tab value="tickets" label="Tickets" />
                                    <Tab value="speakers" label="Speakers" />
                                    <Tab value="schedule" label="Schedule" />
                                    <Tab value="sponsor" label="Sponsor" />
                                    <Tab value="attendees" label="Attendees" />
                                </TabList>

                                <TabPanel value="map">
                                    <Grid padding={3}>
                                        <Grid item display={'flex'} gap={3}>
                                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                                <IconMapPin />
                                            </Avatar>
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
                                                <Marker lat={event.address_latitude} lng={event.address_longitude} />
                                            </GoogleMapReact>
                                        </Box>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="tickets"> Tickets List Coming soon </TabPanel>
                                <TabPanel value="speakers">Speakers List Coming soon </TabPanel>
                                <TabPanel value="schedule">Schedule List Coming soon </TabPanel>
                                <TabPanel value="sponsor">Sponsors List Coming soon </TabPanel>
                                <TabPanel value="attendees">Attendes List Coming soon </TabPanel>
                            </TabContext>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Deleting Event</DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <Typography>You are about to delete - {event.event_name}</Typography>
                    <Typography sx={{ marginTop: 2 }}>Are you sure?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="dark" onClick={handleDialogClose}>
                        No
                    </Button>
                    <Button variant="text" color="error" onClick={() => Delete(event.id)}>
                        {spinner ? <CircularProgress size={18} /> : 'Yes'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default EventDetail;

// material-ui
import { Add, ExpandMore } from '@mui/icons-material';
import { useRef, useState, forwardRef } from 'react';
import {
    Grid,
    Typography,
    Button,
    Divider,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    IconButton,
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    useTheme,
    CircularProgress
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import Connections from 'api';
import placeholder from 'assets/images/placeholder.jpg';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import pin from 'assets/icons/marker.svg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EventLocation from './components/EventLocation';
import Category from 'data/category';
import { Constants } from 'constants';
import { IconAlarm, IconCircleCheck, IconClock, IconInfoCircle, IconX } from '@tabler/icons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
// ==============================|| EVENT ADDING PAGE ||============================== //

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Marker = () => (
    <div className="marker">
        <img src={pin} alt="marker" width={30} height={30} />
    </div>
);

const AddEvent = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const fileInputRef = useRef(null);

    const [activeAccordion, setActiveAccordion] = useState(0);
    const [posterPreview, setPosterPreview] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({ lat: '', lng: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [submissionOne, setSubmissionOne] = useState('pending');
    const [submissionTwo, setSubmissionTwo] = useState('pending');

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

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        eventorganizer: '',
        eventAddress: '',
        latitude: '8.9919489',
        longitude: '38.7385058',
        eventCategory: 'Entertainment',
        eventType: 'free',
        regularPrice: '',
        phone: '',
        phone2: '',
        linkUrl: '',
        buttonLabel: '',
        poster: null
    });
    const [address, setAddress] = useState('');

    const handleMapClick = ({ lat, lng }) => {
        setSelectedLocation({ lat, lng });
        setFormData({ ...formData, latitude: lat, longitude: lng });
    };

    const handleChange = (value) => {
        setAddress(value);
    };

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        var lat = latLng.lat;
        var lng = latLng.lng;

        setSelectedLocation({ lat, lng });
        setFormData({ ...formData, latitude: latLng.lat, longitude: latLng.lng });
        setAddress(value);
    };

    const handleResetClick = (index) => () => {
        let updatedFormData = { ...formData };

        if (index === 0) {
            updatedFormData.title = '';
            updatedFormData.description = '';
        } else if (index === 1) {
            updatedFormData.startDate = null;
            updatedFormData.endDate = null;
            updatedFormData.startTime = null;
            updatedFormData.endTime = null;
        } else if (index === 2) {
            updatedFormData.eventAddress = '';
            updatedFormData.eventCategory = '';
        } else if (index === 3) {
            updatedFormData.phone = '';
            updatedFormData.phone2 = '';
            updatedFormData.linkUrl = '';
            updatedFormData.buttonLabel = '';
        }

        setFormData(updatedFormData);
    };

    const handlePosterUpload = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            poster: file
        });
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPosterPreview(reader.result);
            };
        }
    };

    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleNext = () => {
        setActiveAccordion((prev) => prev + 1);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        setSubmissionOne('processing');
        const userId = sessionStorage.getItem('user');
        var id = JSON.parse(userId).id;

        const data = new FormData();
        data.append('userId', id);
        data.append('event_image', formData.poster);
        data.append('event_name', formData.title);
        data.append('event_description', formData.description);
        data.append('start_date', formData.startDate);
        data.append('start_time', formData.startTime);
        data.append('end_date', formData.endDate);
        data.append('end_time', formData.endTime);
        data.append('category', formData.eventCategory);
        data.append('event_address', formData.eventAddress);
        data.append('latitude', selectedLocation.lat);
        data.append('longitude', selectedLocation.lng);
        data.append('contact_phone', formData.phone);
        data.append('contact_phone_2', formData.phone2);
        data.append('link_label', formData.buttonLabel);
        data.append('redirectUrl', formData.linkUrl);
        data.append('event_type', formData.eventType);
        data.append('event_entrance_fee', formData.regularPrice);

        var Api = Connections.api + Connections.AddEvent;
        fetch(Api, {
            method: 'POST',
            body: data
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setSubmissionOne('succeed');
                    PostingMiddleware();
                } else {
                    setSubmissionOne('failed');

                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                }
            })
            .catch((error) => {
                setSubmissionOne('failed');
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });
            });
    };

    const PostingMiddleware = async () => {
        await UploadImageOnOld();
    };

    const PostOnOldPlatform = async (filename) => {
        // we retrived usertoken from async storage and store it in global scope
        const userId = sessionStorage.getItem('user');
        var id = JSON.parse(userId).id;

        // After this we initiate featch method to send user data to database
        var InsertAPIUrl = 'https://app.p2b-ethiopia.com/placetobe/AddEvent.php';
        // header type for text data to be send to server
        var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // data to be stored in the database
        var Data = {
            userId: id,
            picture: filename,
            name: formData.title,
            about: formData.description,
            startD: formData.startDate,
            startT: formData.startTime,
            endD: formData.endDate,
            eTime: formData.endTime,
            eventOrganizers: formData.eventorganizer,
            eventCategories: formData.eventCategory,
            eventVenuesAddress: formData.eventAddress,
            eventFee: formData.regularPrice,
            latitude: formData.latitude,
            longitude: formData.longitude,
            organizerPhone: formData.phone,
            redirectUrl: formData.linkUrl,
            status: '0'
        };
        // fetch function
        fetch(InsertAPIUrl, {
            method: 'POST', // method used to store data in the database
            headers: headers, // header type which we declare on the top will be assign to headers
            body: JSON.stringify(Data) // a data will be converted to json format
        })
            .then((response) => response.json()) //check response type of the API
            .then((response) => {
                let returnedResponse = response[0];
                let message = returnedResponse.message;
                if (message === 'successfully Added') {
                    setSubmissionTwo('succeed');
                } else {
                    setSubmissionTwo('failed');
                }
            })
            .catch((err) => {
                setSubmissionTwo('failed');
            });
    };

    const UploadImageOnOld = async () => {
        setSubmissionTwo('processing');
        const poster = formData.poster;
        //the url which the image will be sent to
        var ApiUrl = 'https://app.p2b-ethiopia.com/placetobe/uploadPoster.php';
        const data = new FormData();
        // Assume "photo" is the name of the form field the server expects

        data.append('photo', poster);

        fetch(ApiUrl, {
            method: 'POST', //request method
            body: data // data to be sent to server
        })
            .then((response) => response.json()) //check response type of the API
            .then((response) => {
                let message = response.message;
                if (message === 'Image uploaded successfully') {
                    PostOnOldPlatform(response.filename);
                    setSubmissionTwo('processing');
                } else {
                    setSubmissionTwo('failed');
                }
            });
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setActiveAccordion(isExpanded ? panel : false);
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
                <Typography variant="h3" sx={{ marginLeft: 3 }}>
                    Add Event
                </Typography>
                <Button
                    variant="text"
                    size="small"
                    sx={{ paddingX: 5, marginRight: 2, color: theme.palette.primary.main, '&:hover': { color: 'dark' } }}
                    onClick={() => navigate('/events')}
                >
                    Back
                </Button>
            </Grid>
            <Divider sx={{ width: '100%' }} bgcolor="#B6B6B6" />
            <Grid container m={{ md: 1, lg: 3, xl: 3 }} sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={12} sm={12} md={6} lg={5.5} xl={5.5} mb={{ xs: 2, sm: 2, md: 2, lg: 0 }}>
                        <Card sx={{ width: '100%', padding: 3 }}>
                            <Typography variant="h5"> Add event details</Typography>
                            <Box sx={{ marginY: 3 }}></Box>
                            <form onSubmit={handleOnSubmit}>
                                <Accordion expanded={activeAccordion === 0} onChange={handleAccordionChange(0)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: theme.palette.primary.light, mb: 1, borderRadius: '5px', border: 'none' }}
                                    >
                                        <Typography>Basic information</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Grid item xs={12}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    sx={{
                                                        padding: 2,
                                                        borderRadius: '8px',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        bgcolor: theme.palette.primary.light
                                                    }}
                                                >
                                                    <input
                                                        ref={fileInputRef}
                                                        onChange={handlePosterUpload}
                                                        hidden
                                                        accept="image/*"
                                                        type="file"
                                                        id="event-poster"
                                                    />
                                                    <label htmlFor="event-poster">
                                                        <div>
                                                            {posterPreview ? (
                                                                <Box sx={{}}>
                                                                    <img
                                                                        src={posterPreview}
                                                                        alt="poster"
                                                                        style={{
                                                                            width: 300,
                                                                            height: 300,
                                                                            objectFit: 'contain',
                                                                            aspectRatio: 1,
                                                                            resize: 'contain',
                                                                            borderRadius: 6
                                                                        }}
                                                                    />
                                                                </Box>
                                                            ) : (
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignContent: 'center'
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={placeholder}
                                                                        alt="Poster"
                                                                        style={{
                                                                            aspectRatio: 1,
                                                                            objectFit: 'contain',
                                                                            resize: 'contain'
                                                                        }}
                                                                    />
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color={'#0065DB'}
                                                                        sx={{ textAlign: 'center' }}
                                                                    >
                                                                        {formData.poster ? formData.poster.name : 'Upload Poster'}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        </div>
                                                    </label>
                                                </Stack>

                                                <Grid item xl={12}>
                                                    <Typography variant="h5" mt={2}>
                                                        Title
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        style={{ marginTop: 2 }}
                                                        size="small"
                                                        required
                                                        value={formData.title}
                                                        onChange={(e) => handleFieldChange('title', e.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography variant="h5" mt={2}>
                                                        Description
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        style={{ marginTop: 2 }}
                                                        multiline
                                                        rows={4}
                                                        required
                                                        value={formData.description}
                                                        onChange={(e) => handleFieldChange('description', e.target.value)}
                                                    />
                                                </Grid>

                                                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                    <Button
                                                        variant="text"
                                                        sx={{ color: '#1E1E1E', width: '61px', height: '25px' }}
                                                        onClick={handleResetClick(0)}
                                                    >
                                                        Reset
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{ width: '61px', height: '25px' }}
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={activeAccordion === 1} onChange={handleAccordionChange(1)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: theme.palette.primary.light, mb: 1, borderRadius: '5px', border: 'none' }}
                                    >
                                        <Typography>Event Session</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Box display={'flex'} gap={2}>
                                                <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
                                                    <Typography variant="h5">Start Date</Typography>

                                                    <TextField
                                                        type="date"
                                                        name="startDate"
                                                        value={formData.startDate}
                                                        onChange={(event) => handleFieldChange('startDate', event.target.value)}
                                                    />
                                                    <Typography variant="h5" mt={1}>
                                                        End Date
                                                    </Typography>

                                                    <TextField
                                                        type="date"
                                                        name="endDate"
                                                        value={formData.endDate}
                                                        onChange={(event) => handleFieldChange('endDate', event.target.value)}
                                                    />
                                                </Box>
                                                <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
                                                    <Typography variant="h5">Start Time</Typography>

                                                    <TextField
                                                        type="time"
                                                        name="startTime"
                                                        value={formData.startTime}
                                                        onChange={(event) => handleFieldChange('startTime', event.target.value)}
                                                    />

                                                    <Typography variant="h5" mt={1}>
                                                        End Time
                                                    </Typography>
                                                    <TextField
                                                        type="time"
                                                        name="endTime"
                                                        value={formData.endTime}
                                                        onChange={(event) => handleFieldChange('endTime', event.target.value)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                <Button
                                                    variant="text"
                                                    sx={{ color: '#1E1E1E', width: '61px', height: '25px' }}
                                                    onClick={handleResetClick(1)}
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ width: '61px', height: '25px' }}
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={activeAccordion === 2} onChange={handleAccordionChange(2)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: theme.palette.primary.light, mb: 1, borderRadius: '5px', border: 'none' }}
                                    >
                                        <Typography>Event Detail</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Box display={'flex'} gap={2}>
                                                <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
                                                    <Typography variant="h5">Event Address</Typography>
                                                    <TextField
                                                        value={formData.eventAddress}
                                                        onChange={(e) => handleFieldChange('eventAddress', e.target.value)}
                                                        style={{ marginTop: 5 }}
                                                        size="small"
                                                        fullWidth
                                                        required
                                                    />
                                                    <Typography variant="h5" mt={2}>
                                                        Event Type
                                                    </Typography>
                                                    <FormControl size="small" sx={{ width: '132px', marginTop: 0.7 }}>
                                                        <Select
                                                            value={formData.eventType}
                                                            onChange={(e) => handleFieldChange('eventType', e.target.value)}
                                                            label="event type"
                                                        >
                                                            <MenuItem value={'paid'}>Paid</MenuItem>
                                                            <MenuItem value={'free'}>Free</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
                                                    <Typography variant="h5">Event Category</Typography>

                                                    <FormControl size="small" sx={{ marginTop: 0.7 }}>
                                                        <Select
                                                            value={formData.eventCategory}
                                                            onChange={(e) => handleFieldChange('eventCategory', e.target.value)}
                                                            fullWidth
                                                            required
                                                        >
                                                            {Category.map((item, index) => (
                                                                <MenuItem key={index} value={item.name}>
                                                                    {item.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <Typography variant="h5" mt={2}>
                                                        Regular Ticket Price
                                                    </Typography>
                                                    <TextField
                                                        value={formData.regularPrice}
                                                        onChange={(e) => handleFieldChange('regularPrice', e.target.value)}
                                                        style={{ marginTop: 5 }}
                                                        size="small"
                                                        fullWidth
                                                    />
                                                </Box>
                                            </Box>

                                            <Grid item xs={12} sx={{ padding: 2, marginY: 1, borderRadius: 6 }}>
                                                <Typography>Select address on the map</Typography>

                                                <Box sx={{ borderRadius: 8, height: 400, width: '100%' }}>
                                                    <Box sx={{}}>
                                                        <EventLocation
                                                            apiKey="GBJmOb_KZsptY1uVEGOq3k2Y_bgs8"
                                                            address={address}
                                                            handleChange={handleChange}
                                                            handleSelect={handleSelect}
                                                        />
                                                    </Box>
                                                    <GoogleMapReact
                                                        defaultZoom={12}
                                                        center={selectedLocation}
                                                        zoom={14}
                                                        onClick={handleMapClick}
                                                    >
                                                        {selectedLocation.lat && selectedLocation.lng && (
                                                            <Marker lat={selectedLocation.lat} lng={selectedLocation.lng} />
                                                        )}
                                                    </GoogleMapReact>
                                                </Box>
                                            </Grid>

                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 8 }}>
                                                <Button
                                                    variant="text"
                                                    sx={{ color: '#1E1E1E', width: '61px', height: '25px' }}
                                                    onClick={handleResetClick(2)}
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ width: '61px', height: '25px' }}
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={activeAccordion === 3} onChange={handleAccordionChange(3)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: theme.palette.primary.light, mb: 1, borderRadius: '5px', border: 'none' }}
                                    >
                                        <Typography>Contact information</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Box display={'flex'}>
                                                <Box display={'flex'} sx={{ width: '100%', gap: 2, mt: 2 }}>
                                                    <Box flex={1}>
                                                        <Typography variant="h5">Phone 1</Typography>
                                                        <TextField
                                                            value={formData.phone}
                                                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                                                            size="small"
                                                            fullWidth
                                                        />
                                                    </Box>
                                                    <Box flex={1}>
                                                        <Typography variant="h5">Phone 2</Typography>
                                                        <TextField
                                                            value={formData.phone2}
                                                            size="small"
                                                            onChange={(e) => handleFieldChange('phone2', e.target.value)}
                                                            fullWidth
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box mt={2}>
                                                <Typography variant="h5" mb={0.5}>
                                                    Select action button label
                                                </Typography>
                                                <FormControl size="small" sx={{ width: '132px' }}>
                                                    <InputLabel id="select-label">Learn more</InputLabel>
                                                    <Select
                                                        value={formData.buttonLabel}
                                                        onChange={(e) => handleFieldChange('buttonLabel', e.target.value)}
                                                        label="Learn more"
                                                    >
                                                        <MenuItem value={'learn more'}>Learn More</MenuItem>
                                                        <MenuItem value={'register'}>Register</MenuItem>
                                                        <MenuItem value={'book'}>Book</MenuItem>
                                                        <MenuItem value={'rsvp'}>RSVP</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <IconButton style={{ bgColor: '#EBF5FF' }}>
                                                    <Add style={{ color: '#0065DB' }} />
                                                </IconButton>
                                            </Box>
                                            <Box mt={2} display={'flex'} flexDirection={'column'}>
                                                <Typography variant="h5" mb={0.5}>
                                                    Link Url
                                                </Typography>
                                                <TextField
                                                    value={formData.linkUrl}
                                                    onChange={(e) => handleFieldChange('linkUrl', e.target.value)}
                                                    size="small"
                                                    fullWidth
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                <Button
                                                    variant="text"
                                                    sx={{ color: '#1E1E1E', width: '138px', height: '33px' }}
                                                    onClick={handleResetClick(3)}
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="small"
                                                    sx={{ bgcolor: '#0065DB', width: '138px', height: '33px' }}
                                                >
                                                    Post
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </form>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card sx={{ width: '100%', height: '100%' }}>
                            <Typography sx={{ padding: 3, paddingBottom: 1 }} variant="h3">
                                Preview
                            </Typography>

                            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h1" color={'#DEDEDE'}>
                                    To be designed and developed
                                </Typography>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            {isAdding && (
                <Box
                    sx={{
                        minWidth: 380,
                        minHeight: 200,
                        backgroundColor: theme.palette.background.default,
                        boxShadow: 2,
                        position: 'fixed',
                        bottom: 18,
                        right: 20,
                        padding: 3,
                        borderRadius: 2
                    }}
                >
                    <IconButton sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => setIsAdding(false)}>
                        <IconX size={20} />
                    </IconButton>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingX: 1,
                            paddingY: 1,
                            marginTop: 3
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                variant="h4"
                                sx={{ color: submissionOne === 'pending' ? theme.palette.grey[500] : theme.palette.grey[800] }}
                            >
                                Submission to the new platfrom{' '}
                            </Typography>
                        </Box>

                        {submissionOne === 'processing' ? (
                            <CircularProgress size={20} />
                        ) : submissionOne === 'succeed' ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                        ) : submissionOne === 'failed' ? (
                            <ErrorIcon fontSize="small" color="error" />
                        ) : (
                            <IconClock size={20} color="grey" />
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingX: 1,
                            paddingY: 1,
                            marginTop: 3
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                variant="h4"
                                sx={{ color: submissionTwo === 'pending' ? theme.palette.grey[500] : theme.palette.grey[800] }}
                            >
                                Submission to the old platfrom{' '}
                            </Typography>
                        </Box>

                        {submissionTwo === 'processing' ? (
                            <CircularProgress size={20} />
                        ) : submissionTwo === 'succeed' ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                        ) : submissionTwo === 'failed' ? (
                            <ErrorIcon fontSize="small" color="error" />
                        ) : (
                            <IconClock size={20} color="grey" />
                        )}
                    </Box>
                </Box>
            )}

            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default AddEvent;

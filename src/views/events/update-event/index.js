// material-ui
import { Add, ExpandMore } from '@mui/icons-material';
import { useRef, useState, forwardRef } from 'react';
import {
    Grid,
    Typography,
    Button,
    Divider,
    Card,
    Tabs,
    Tab,
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
import { useLocation, useNavigate } from 'react-router';
import Connections from 'api';
import placeholder from 'assets/images/placeholder.jpg';
import GoogleMapReact from 'google-map-react';
import pin from 'assets/icons/marker.svg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LinkLabels } from 'data/LinkLabels';

// ==============================|| EVENT UPDATING PAGE ||============================== //

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Marker = () => (
    <div className="marker">
        <img src={pin} alt="marker" width={30} height={30} />
    </div>
);

const UpdateEvent = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const fileInputRef = useRef(null);

    const { state } = useLocation();
    const event = state;

    const userId = async () => sessionStorage.getItem('user');
    const [activeAccordion, setActiveAccordion] = useState(0);
    const [posterPreview, setPosterPreview] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });

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
        poster: event.event_image,
        title: event.event_name,
        description: event.event_description,
        startDate: event.start_date,
        endDate: event.end_date,
        startTime: event.start_time,
        endTime: event.end_time,
        eventAddress: event.event_address,
        eventType: event.event_type,
        eventCategory: event.category,
        regularPrice: event.event_entrance_fee ? event.event_entrance_fee : 0,
        phone: event.contact_phone ? event.contact_phone : '',
        phone2: event.contact_phone_2 ? event.contact_phone_2 : '',
        linkUrl: event.redirectUrl,
        buttonLabel: event.link_label
    });

    var featuredImageUri = Connections.api + Connections.assets;

    const handleMapClick = ({ lat, lng }) => {
        setSelectedLocation({ lat, lng });
        setFormData({ ...formData, latitude: lat, longitude: lng });
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

    // const handleNext = () => {
    //     setActiveAccordion((prev) => prev + 1);
    // };

    const handleForms = (e, form) => {
        e.preventDefault();

        const data = new FormData();
        var Api;
        if (form === 'first') {
            data.append('userId', '1');
            data.append('poster', formData.poster);
            data.append('event_name', formData.title);
            data.append('event_description', formData.description);

            var Api = Connections.api + Connections.sectionOneUpdate + event.id;
        } else if (form === 'second') {
            data.append('start_date', formData.startDate);
            data.append('start_time', formData.startTime);
            data.append('end_date', formData.endDate);
            data.append('end_time', formData.endTime);
            Api = Connections.api + Connections.sectionTwoUpdate + event.id;
        } else if (form === 'three') {
            data.append('category', formData.eventCategory);
            data.append('event_address', formData.eventAddress);
            data.append('event_type', formData.eventType);
            data.append('event_entrance_fee', formData.regularPrice);
            data.append('latitude', selectedLocation.lat);
            data.append('longitude', selectedLocation.lng);
            Api = Connections.api + Connections.sectionThreeUpdate + event.id;
        } else if (form === 'fourth') {
            data.append('contact_phone', formData.phone);
            data.append('contact_phone_2', formData.phone2);
            data.append('link_label', formData.buttonLabel);
            data.append('link_url', formData.linkUrl);
            Api = Connections.api + Connections.sectionFourUpdate + event.id;
        }
        setSpinner(true);
        fetch(Api, {
            method: 'POST',
            body: data
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
            .catch((error) => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });
                setSpinner(false);
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
                    Update Event
                </Typography>
                <Button
                    variant="text"
                    size="small"
                    sx={{ paddingX: 5, marginRight: 2, color: theme.palette.primary.main, '&:hover': { color: 'dark' } }}
                    onClick={() => navigate(-1)}
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
                                            <form onSubmit={(events) => handleForms(events, 'first')}>
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
                                                                <Box>
                                                                    <img
                                                                        src={posterPreview}
                                                                        alt="poster"
                                                                        style={{
                                                                            width: 400,
                                                                            maxWidth: 600,
                                                                            height: 400,
                                                                            maxHeight: 600,
                                                                            aspectRatio: 1,
                                                                            resize: 'cover',
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
                                                                        src={
                                                                            event.event_image
                                                                                ? featuredImageUri + event.event_image
                                                                                : placeholder
                                                                        }
                                                                        alt="Poster"
                                                                        style={{
                                                                            width: 400,
                                                                            height: 400,
                                                                            aspectRatio: 1,
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
                                                        minRows={10}
                                                        required
                                                        value={formData.description}
                                                        onChange={(e) => handleFieldChange('description', e.target.value)}
                                                    />
                                                </Grid>

                                                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                    {/* <Button
                                                        variant="text"
                                                        sx={{ color: '#1E1E1E', width: '61px', height: '25px' }}
                                                        onClick={handleResetClick(0)}
                                                    >
                                                        Reset
                                                    </Button> */}
                                                    <Button variant="outlined" size="small" sx={{ paddingX: 4, marginY: 1 }} type="submit">
                                                        {spinner ? <CircularProgress size={16} /> : 'Update'}
                                                    </Button>
                                                </Box>
                                            </form>
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
                                        <form onSubmit={(events) => handleForms(events, 'second')}>
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
                                                {/* <Button
                                                    variant="text"
                                                    sx={{ color: '#1E1E1E', width: '61px', height: '25px' }}
                                                    onClick={handleResetClick(1)}
                                                >
                                                    Reset
                                                </Button> */}
                                                <Button variant="outlined" size="small" sx={{ paddingX: 4 }} type="submit">
                                                    {spinner ? <CircularProgress size={16} /> : 'Update'}
                                                </Button>
                                            </Box>
                                        </form>
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
                                        <form onSubmit={(events) => handleForms(events, 'three')}>
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
                                                    <TextField
                                                        value={formData.eventCategory}
                                                        onChange={(e) => handleFieldChange('eventCategory', e.target.value)}
                                                        style={{ marginTop: 5 }}
                                                        size="small"
                                                        fullWidth
                                                        required
                                                    />
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
                                                <Typography sx={{ paddingBottom: 1 }}>Select location on the map</Typography>
                                                <Box sx={{ height: 400, width: '100%' }}>
                                                    <GoogleMapReact
                                                        defaultCenter={{ lat: 9.0108, lng: 38.7617 }} // Set the default center of the map
                                                        defaultZoom={12} // Set default zoom level
                                                        onClick={handleMapClick} // Call handleMapClick function when the map is clicked
                                                    >
                                                        {selectedLocation.lat && selectedLocation.lng && (
                                                            <Marker lat={selectedLocation.lat} lng={selectedLocation.lng} />
                                                        )}
                                                    </GoogleMapReact>
                                                </Box>
                                            </Grid>

                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                {/* <Button
                                                    variant="text"
                                                    sx={{ color: '#1E1E1E', width: '61px', height: '25px' }}
                                                    onClick={handleResetClick(2)}
                                                >
                                                    Reset
                                                </Button> */}
                                                <Button variant="outlined" size="small" sx={{ paddingX: 4 }} type="submit">
                                                    {spinner ? <CircularProgress size={16} /> : 'Update'}
                                                </Button>
                                            </Box>
                                        </form>
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
                                        <form onSubmit={(events) => handleForms(events, 'fourth')}>
                                            <Box display={'flex'}>
                                                <Box display={'flex'} sx={{ width: '100%', gap: 2, mt: 2 }}>
                                                    <Box flex={1}>
                                                        <TextField
                                                            value={formData.phone}
                                                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                                                            size="small"
                                                            fullWidth
                                                            label="Phone 1"
                                                        />
                                                    </Box>
                                                    <Box flex={1}>
                                                        <TextField
                                                            value={formData.phone2}
                                                            size="small"
                                                            onChange={(e) => handleFieldChange('phone2', e.target.value)}
                                                            fullWidth
                                                            label="Phone 2"
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box mt={2}>
                                                <Typography variant="h5" mb={0.5}>
                                                    Select link label
                                                </Typography>

                                                <FormControl size="small" sx={{ width: '132px' }}>
                                                    <Select
                                                        value={formData.buttonLabel}
                                                        onChange={(e) => handleFieldChange('buttonLabel', e.target.value)}
                                                        aria-label="Link Label"
                                                    >
                                                        {LinkLabels.map((label) => (
                                                            <MenuItem key={label.id} value={label.value}>
                                                                {label.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box mt={2} display={'flex'} flexDirection={'column'}>
                                                <TextField
                                                    label="Add Link"
                                                    value={formData.linkUrl}
                                                    onChange={(e) => handleFieldChange('linkUrl', e.target.value)}
                                                    size="small"
                                                    fullWidth
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                {/* <Button
                                                    variant="text"
                                                    sx={{ color: '#1E1E1E', width: '138px', height: '33px' }}
                                                    onClick={handleResetClick(3)}
                                                >
                                                    Reset
                                                </Button> */}
                                                <Button type="submit" variant="outlined" size="small" sx={{ paddingX: 4 }}>
                                                    {spinner ? <CircularProgress size={16} /> : 'Update'}
                                                </Button>
                                            </Box>
                                        </form>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card sx={{ width: '100%', height: '100%' }}>
                            <Typography sx={{ padding: 3, paddingBottom: 1 }} variant="h4">
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
            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default UpdateEvent;

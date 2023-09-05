// material-ui
import { Add, ExpandMore } from '@mui/icons-material';

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
    MenuItem
} from '@mui/material';
import { Box } from '@mui/system';
import { IconUpload } from '@tabler/icons';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import events from '../../data/events'; //dummy data

// ==============================|| Add Events PAGE ||============================== //

const UpdateEvent = () => {
    const navigate = useNavigate();
    const [activeAccordion, setActiveAccordion] = useState(0);
    const { state } = useLocation();

    const event = events[0];
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: event.event_name,
        description: event.event_description,
        startDate: event.start_date,
        endDate: event.end_date,
        startTime: event.start_time,
        endTime: event.end_time,
        eventAddress: event.event_address,
        eventType: event.event_type,
        eventCategory: event.category,
        regularPrice: event.event_entrance_fee,
        phones: [event.contact_phone, event.contact_phone_2],
        linkUrl: event.redirectUrl,
        poster: event.event_image,
        buttonLabel: event.link_label
    });

    const [forAdapterJS, setForAdapterJS] = useState({
        startDate: dayjs(event.start_date),
        endDate: dayjs(event.end_date),
        startTime: dayjs(event.start_time),
        endTime: dayjs(event.end_time)
    });

    const [posterPreview, setPosterPreview] = useState(formData.poster);
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
            updatedFormData.phones = [];
            updatedFormData.linkUrl = '';
            updatedFormData.buttonLabel = '';
        }

        setFormData(updatedFormData);
    };

    const handlePosterUpload = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            ['poster']: file
        }));
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPosterPreview(reader.result);
            };
        }
    };

    const formatDate = (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    };

    const formatTime = (time) => {
        return dayjs(time).format('hh:mm:ss');
    };
    const handleFieldChange = (fieldName, value) => {
        if (fieldName === 'phones[0]') {
            setFormData((prevData) => ({
                ...prevData,
                phones: [value, prevData.phones[1]]
            }));
        } else if (fieldName === 'phones[1]') {
            setFormData((prevData) => ({
                ...prevData,
                phones: [prevData.phones[0], value]
            }));
        } else if (fieldName === 'startDate' || fieldName === 'endDate') {
            const formattedDate = formatDate(value);
            setForAdapterJS((prevData) => ({
                ...prevData,
                [fieldName]: value
            }));
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: formattedDate
            }));
        } else if (fieldName === 'startTime' || fieldName === 'endTime') {
            const formattedTime = formatTime(value);
            setForAdapterJS((prevData) => ({
                ...prevData,
                [fieldName]: value
            }));
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: formattedTime
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: value
            }));
        }
    };

    const handleBasicInfoChange = (e) => {
        e.preventDefault();
        // Update event with formData
        const updatedEvent = {
            ...event,
            title: formData.title,
            description: formData.description,
            poster: formData.poster
        };

        // Send the updated event to the backend
        console.log(updatedEvent);
    };

    const handleEventSessionChange = (e) => {
        e.preventDefault();
        // Update event with formData
        const updatedEvent = {
            ...event,
            startDate: formData.startDate,
            endDate: formData.endDate,
            startTime: formData.startTime,
            endTime: formData.endTime
            // ... Other properties
        };

        // Send the updated event to the backend
        console.log(updatedEvent);
    };

    const handleEventDetailChange = (e) => {
        e.preventDefault();
        // Update event with formData
        const updatedEvent = {
            ...event,
            eventAddress: formData.eventAddress,
            eventType: formData.eventType,
            eventCategory: formData.eventCategory,
            regularPrice: formData.regularPrice
            // ... Other properties
        };

        // Send the updated event to the backend
        console.log(updatedEvent);
    };

    const handleContactInfoChange = (e) => {
        e.preventDefault();
        // Update event with formData
        const updatedEvent = {
            ...event,
            linkUrl: formData.linkUrl,
            buttonLabel: formData.buttonLabel,
            phones: formData.phones
            // ... Other properties
        };

        // Send the updated event to the backend
        console.log(updatedEvent);
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setActiveAccordion(isExpanded ? panel : false);
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
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
                <Typography variant="h2">Update Events</Typography>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ width: '100px', bgcolor: '#D1E9FF', color: '#0065DB', '&:hover': { color: 'white' } }}
                    onClick={() => navigate('/event-detail')}
                >
                    Back
                </Button>
            </Grid>
            <Divider sx={{ width: '100%' }} bgcolor="#B6B6B6" />
            <Grid container m={{ md: 1, lg: 3, xl: 3 }} sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={12} sm={12} md={6} lg={5.5} xl={5.5} mb={{ xs: 2, sm: 2, md: 2, lg: 0 }}>
                        <Card sx={{ width: '100%', padding: 3 }}>
                            <Typography variant="h3">Add</Typography>
                            <Divider sx={{ width: '100%', mb: 3 }} bgcolor="#B6B6B6" />
                            <Box component="form" onSubmit={handleBasicInfoChange}>
                                <Accordion expanded={activeAccordion === 0} onChange={handleAccordionChange(0)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: '#F3F3F3', mb: 1, borderRadius: '5px', border: 'none' }}
                                    >
                                        <Typography>Basic information</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Box>
                                                <Box
                                                    sx={{
                                                        bgcolor: '#F3F3F3',
                                                        width: '100%',
                                                        padding: 2,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        borderRadius: '8px'
                                                    }}
                                                >
                                                    {posterPreview ? (
                                                        <img src={posterPreview} alt="Poster Preview" style={{ maxWidth: '30%' }} />
                                                    ) : (
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <IconButton aria-label="upload picture" onClick={handleIconClick}>
                                                                <input
                                                                    ref={fileInputRef}
                                                                    onChange={handlePosterUpload}
                                                                    hidden
                                                                    accept="image/*"
                                                                    type="file"
                                                                />
                                                                <IconUpload style={{ color: '#94C5FF' }} />
                                                            </IconButton>
                                                        </Stack>
                                                    )}
                                                    <Typography variant="h3" color={'#0065DB'}>
                                                        {formData.poster ? formData.poster.name : 'Upload Poster'}
                                                    </Typography>
                                                </Box>
                                                <Box display={'flex'} flexDirection={'column'}>
                                                    <Typography variant="h5" mt={2}>
                                                        Title
                                                    </Typography>
                                                    <TextField
                                                        style={{ marginTop: 2 }}
                                                        size="small"
                                                        fullWidth
                                                        required
                                                        value={formData.title}
                                                        onChange={(e) => handleFieldChange('title', e.target.value)}
                                                    />
                                                    <Typography variant="h5" mt={2}>
                                                        Description
                                                    </Typography>
                                                    <TextField
                                                        style={{ marginTop: 2 }}
                                                        fullWidth
                                                        multiline
                                                        maxRows={10}
                                                        required
                                                        value={formData.description}
                                                        onChange={(e) => handleFieldChange('description', e.target.value)}
                                                    />
                                                </Box>
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
                                                        type="submit"
                                                    >
                                                        Update
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Box component="form" onSubmit={handleEventSessionChange}>
                                <Accordion expanded={activeAccordion === 1} onChange={handleAccordionChange(1)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: '#F3F3F3', mb: 1, borderRadius: '5px', border: 'none' }}
                                    >
                                        <Typography>Event Session</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Box display={'flex'} gap={2}>
                                                <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
                                                    <Typography variant="h5">Start Date</Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                label="Start Date"
                                                                value={forAdapterJS.startDate}
                                                                onChange={(newDate) => handleFieldChange('startDate', newDate)}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>

                                                    <Typography variant="h5" mt={1}>
                                                        End Date
                                                    </Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                label="End Date"
                                                                value={forAdapterJS.endDate}
                                                                onChange={(newDate) => handleFieldChange('endDate', newDate)}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </Box>
                                                <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
                                                    <Typography variant="h5">Start Time</Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['TimePicker']}>
                                                            <TimePicker
                                                                label="Start Time"
                                                                value={forAdapterJS.startTime}
                                                                onChange={(newTime) => handleFieldChange('startTime', newTime)}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                    <Typography variant="h5" mt={1}>
                                                        End Time
                                                    </Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['TimePicker']}>
                                                            <TimePicker
                                                                label="End Time"
                                                                value={forAdapterJS.endTime}
                                                                onChange={(newTime) => handleFieldChange('endTime', newTime)}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
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
                                                    type="submit"
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Box component="form" onSubmit={handleEventDetailChange}>
                                <Accordion expanded={activeAccordion === 2} onChange={handleAccordionChange(2)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ bgcolor: '#F3F3F3', mb: 1, borderRadius: '5px', border: 'none' }}
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
                                                            required
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
                                                        required
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
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
                                                    type="submit"
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Box component="form" onSubmit={handleContactInfoChange}>
                                <Accordion expanded={activeAccordion === 3} onChange={handleAccordionChange(3)}>
                                    <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: '#F3F3F3' }}>
                                        <Typography>Contact information</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container display={'flex'} flexDirection={'column'}>
                                            <Box display={'flex'}>
                                                <Box display={'flex'} sx={{ width: '100%', gap: 2, mt: 2 }}>
                                                    <Box flex={1}>
                                                        <Typography variant="h5">Phone 1</Typography>
                                                        <TextField
                                                            value={formData.phones[0]}
                                                            onChange={(e) => handleFieldChange('phones[0]', e.target.value)}
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Box>
                                                    <Box flex={1}>
                                                        <Typography variant="h5">Phone 2</Typography>
                                                        <TextField
                                                            value={formData.phones[1]}
                                                            size="small"
                                                            onChange={(e) => handleFieldChange('phones[1]', e.target.value)}
                                                            fullWidth
                                                            required
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
                                                    required
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                                <Button variant="text" sx={{ color: '#1E1E1E' }} onClick={handleResetClick(3)}>
                                                    Reset
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ width: '61px', height: '25px' }}
                                                    type="submit"
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card sx={{ width: '100%', height: '100%' }}>
                            <Typography sx={{ padding: 3, paddingBottom: 1 }} variant="h3">
                                Preview
                            </Typography>
                            <Box sx={{ width: '100%' }}>
                                <Tabs style={{ color: 'black', height: '30px' }}>
                                    <Tab value="mobile" label="mobile">
                                        Mobile
                                    </Tab>
                                    <Tab value="web" label="web">
                                        Web
                                    </Tab>
                                </Tabs>
                            </Box>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h1" color={'#DEDEDE'}>
                                    To be designed and developed
                                </Typography>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UpdateEvent;

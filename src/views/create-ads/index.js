import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { Grid, Box, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Input, InputAdornment } from '@mui/material';
import { Button } from '@mui/material';
import { IconUpload, IconChevronDown } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, Select, MenuItem, IconButton, InputLabel } from '@mui/material';
import Connections from 'api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import { AdTypes } from 'data/adType';
import { AdsUrlLabel } from 'data/AdsUrlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CreateAds = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const initialFormData = {
        owner: 1,
        type: '',
        creative: null,
        heading: '',
        subheading: '',
        description: '',
        linkLabel: '',
        link: '',
        budget: '',
        frequency: '',
        startdate: '',
        enddate: '',
        status: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const [activeAccordion, setActiveAccordion] = useState(0);
    const [adType, setAdType] = useState();
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [creativePreview, setCreativePreview] = useState(null);
    const [linkLabel, setLinkLabel] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTypeSelection = (event) => {
        setAdType(event.target.value);
    };

    const handleCreativeUpload = (event) => {
        const file = event.target.files[0];

        setFormData({ ...formData, creative: file });
        setUploading(true);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setCreativePreview(reader.result);
            };
        }
        setTimeout(() => {
            if (!file || !file.type.startsWith('image/')) {
                setUploadError(true);
            } else {
                setUploading(false);
                setUploadSuccess(true);
            }
        }, 2000);
    };

    const handleLabelSelection = (event) => {
        setLinkLabel(event.target.value);
    };

    const handleStartDate = (event) => {
        setFormData({ ...formData, startdate: event.target.value });
    };

    const handleEndDate = (event) => {
        setFormData({ ...formData, enddate: event.target.value });
    };

    //---------------------Submit-----------------------
    const handleSubmit = () => {
        var APIUrl = Connections.api + Connections.createdAds;

        const data = new FormData();

        data.append('ad_type', adType);
        data.append('ad_creative', formData.creative);
        data.append('ad_heading', formData.heading);
        data.append('ad_sub_heading', formData.subheading);
        data.append('ad_description', formData.description);
        data.append('ad_button_label', linkLabel);
        data.append('ad_link_url', formData.link);

        data.append('ad_budget', formData.budget);
        data.append('ad_frequency', formData.frequency);
        data.append('ad_start_date', formData.startdate);
        data.append('ad_end_date', formData.enddate);
        data.append('ad_owner_id', 2);

        fetch(APIUrl, {
            method: 'POST',
            body: data
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.success) {
                    alert(response.message);
                    console.log(response.message);
                } else {
                    console.log(response.message);
                    alert('Unable to Add');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleReset = () => {
        setFormData({
            ...formData,
            creative: '',
            heading: '',
            subheading: '',
            description: '',
            linkLabel: '',
            link: ''
        });
    };
    const handleReset1 = () => {
        setFormData({
            ...formData,
            budget: '',
            enddate: '',
            startdate: '',
            frequency: ''
        });
    };

    const handleNext = () => {
        setActiveAccordion((prevAccordion) => prevAccordion + 1);
    };

    return (
        <div>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={() => navigate('/')}
                            color="secondary"
                            aria-label="back"
                            sx={{ background: theme.palette.background.default, color: theme.palette.grey[800] }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" style={{ marginTop: 24, marginBottom: 16, marginLeft: 20 }}>
                            Create Ads
                        </Typography>
                    </div>
                </Grid>

                <Grid item xl={4.5} lg={4.5} md={4.5} sm={12} xs={12} sx={{ marginTop: 3 }}>
                    <Box padding={2} sx={{ background: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Ad</Typography>

                            <FormControl variant="standard" fullWidth margin="dense" sx={{ width: '150px', borderRadius: 0 }} size="small">
                                <InputLabel id="dropdown-label">Ad's Type</InputLabel>
                                <Select
                                    labelId="dropdown-label"
                                    id="dropdown"
                                    value={adType}
                                    onChange={handleTypeSelection}
                                    label="Select Ad's Type"
                                >
                                    {AdTypes.map((type) => (
                                        <MenuItem value={type.name}>{type.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/*------------------- creatives ----------------------*/}
                        <Accordion defaultExpanded expanded={activeAccordion === 0} onChange={() => setActiveAccordion(0)}>
                            <AccordionSummary expandIcon={<IconChevronDown />} sx={{ backgroundColor: '#F3F3F3' }}>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        maxHeight: '10px',
                                        display: 'flex'
                                    }}
                                >
                                    <ListItem>
                                        <ListItemText primary="Creatives" />
                                    </ListItem>
                                </List>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Box>
                                            <form>
                                                <label htmlFor="image-upload">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#F3F3F3',
                                                            padding: 3,
                                                            paddingX: 2,
                                                            color: '#5296E4',
                                                            cursor: 'pointer',
                                                            marginBottom: 2
                                                        }}
                                                    >
                                                        <IconUpload />
                                                        <Typography sx={{ marginTop: 1 }}>Upload Poster</Typography>
                                                    </Box>
                                                </label>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    id="image-upload"
                                                    style={{ display: 'none' }}
                                                    onChange={handleCreativeUpload}
                                                />
                                            </form>
                                            {uploading && (
                                                <Box sx={{ marginBottom: 2 }}>
                                                    <LinearProgress />
                                                </Box>
                                            )}
                                            {uploadSuccess && !uploadError && (
                                                <Typography sx={{ color: 'green' }}>Image uploaded successfully!</Typography>
                                            )}
                                            {uploadError && (
                                                <Typography sx={{ color: 'red' }}>Upload unsuccessful. Please try again.</Typography>
                                            )}
                                        </Box>
                                        <Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    size="small"
                                                    label="Heading"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="heading"
                                                    onChange={handleInputChange}
                                                    value={formData.heading}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    size="small"
                                                    label="Sub heading"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="subheading"
                                                    onChange={handleInputChange}
                                                    value={formData.subheading}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    margin="dense"
                                                    label="Description"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    name="description"
                                                    onChange={handleInputChange}
                                                    value={formData.description}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Box display="flex" alignItems="center">
                                                    <FormControl
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="dense"
                                                        sx={{ width: '150px', borderRadius: 0 }}
                                                        size="small"
                                                    >
                                                        <InputLabel id="dropdown-label">Link Label</InputLabel>
                                                        <Select
                                                            labelId="dropdown-label"
                                                            id="dropdown"
                                                            value={linkLabel}
                                                            onChange={handleLabelSelection}
                                                            label="Select link label"
                                                        >
                                                            {AdsUrlLabel.map((label, index) => (
                                                                <MenuItem key={index} value={label.label}>
                                                                    {label.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <IconButton
                                                        color="primary"
                                                        sx={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginLeft: 2,
                                                            backgroundColor: '#EBF5FF',
                                                            '&:hover': {
                                                                backgroundColor: '#EBF5FF'
                                                            }
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                            </Grid>

                                            <Grid item>
                                                <TextField
                                                    size="small"
                                                    label="Link Url"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="link"
                                                    onChange={handleInputChange}
                                                    value={formData.link}
                                                />
                                            </Grid>

                                            <Grid item container justifyContent="flex-end" marginTop={3}>
                                                <Button sx={{ marginRight: 1, color: '#1E1E1E' }} onClick={handleReset}>
                                                    Reset
                                                </Button>
                                                <Button color="primary" variant="outlined" onClick={handleNext}>
                                                    Next
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        {/*------------------- Budget and Duration ----------------------*/}
                        <Accordion expanded={activeAccordion === 1} onChange={() => setActiveAccordion(1)}>
                            <AccordionSummary expandIcon={<IconChevronDown />} sx={{ backgroundColor: '#F3F3F3' }}>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        maxHeight: '10px',
                                        display: 'flex'
                                    }}
                                >
                                    <ListItem>
                                        <ListItemText primary="Budget and Duration" />
                                    </ListItem>
                                </List>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            label="Total budget"
                                            variant="outlined"
                                            fullWidth
                                            margin="dense"
                                            name="budget"
                                            type="number"
                                            onChange={handleInputChange}
                                            value={formData.budget}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">ETB</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            label="Frequency"
                                            variant="outlined"
                                            fullWidth
                                            margin="dense"
                                            name="frequency"
                                            type="number"
                                            onChange={handleInputChange}
                                            value={formData.frequency}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            label="Start Date"
                                            variant="outlined"
                                            fullWidth
                                            margin="dense"
                                            name="startDate"
                                            type="date"
                                            onChange={handleStartDate}
                                            value={formData.startdate}
                                            focused
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            label="End Date"
                                            variant="outlined"
                                            fullWidth
                                            margin="dense"
                                            name="endDate"
                                            type="date"
                                            onChange={handleEndDate}
                                            value={formData.enddate}
                                            focused
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container justifyContent="flex-end" marginTop={3}>
                                    <Button sx={{ marginRight: 1, color: '#1E1E1E' }} onClick={handleReset1}>
                                        Reset
                                    </Button>
                                    <Button color="primary" variant="outlined" onClick={() => handleSubmit()}>
                                        Save
                                    </Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>

                <Grid item xl={7.5} lg={7.5} md={7.5} sm={12} xs={12} sx={{ marginTop: 3 }}>
                    <Box padding={2} sx={{ background: 'white', marginLeft: 3, marginRight: 3 }}>
                        <PreviewEvent formData={formData} creativePreview={creativePreview} linkLabel={linkLabel} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};
//------------------ Preview --------------------
const PreviewEvent = ({ formData, creativePreview, linkLabel }) => {
    return (
        <Box
            sx={{
                borderRadius: 2,
                width: '100%'
            }}
        >
            <Card sx={{}}>
                <CardActionArea>
                    <CardMedia component="img" width="140" height="140" image={creativePreview} alt="green iguana" />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {formData.heading}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {formData.subheading}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formData.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {linkLabel}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};
export default CreateAds;

import React, { useState, forwardRef, useEffect } from 'react';
import { Grid, Button, Typography, Card, Avatar, TextField, CardMedia, IconButton, Menu, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { IconClick, IconCoins, IconEye, IconFilter } from '@tabler/icons';
import { Box } from '@mui/system';
import { AdsStatuses, DateFormater, formatNumber } from 'utils/functions';
import Connections from 'api';
import { AdContent } from './components/Ad-Content';
import { AdStatus } from 'data/ads';
import { MoreVert } from '@mui/icons-material';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdsDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [AdStat, setAdStat] = useState({
        impressions: 0,
        clicks: 0,
        conversions: 0
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [adStatus, setAdStatus] = useState(state.ad_status);
    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    const initialDate = new Date(state.ad_start_date);
    const today = new Date();

    var featuredImageUri = Connections.api + Connections.assets;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPopup({
            ...popup,
            status: false
        });
    };

    const handleSelectItem = (events) => {
        handleMenuClick(events);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (status, id) => {
        var Api = Connections.api + Connections.changeAdStatus + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            ad_status: status
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
                    setAdStatus(status);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                }
            })
            .catch((error) => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });
            });
    };

    const GetAddStat = () => {
        var Api = Connections.api + Connections.adstats + state.id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setAdStat(response.data);
                    setAdStat({
                        ...adStatus,
                        impressions: response.data.impressions,
                        clicks: response.data.clicks,
                        conversions: response.data.conversions
                    });
                }
            })
            .catch((error) => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });
            });
    };

    useEffect(() => {
        setTimeout(() => {
            GetAddStat();
        }, 1000);

        return () => {};
    }, []);
    return (
        <Grid p={1}>
            <Grid container sx={{ marginX: 1, paddingX: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 10, backgroundColor: AdsStatuses(adStatus), margin: 1 }} />
                    <Typography variant="h3">{state.ad_heading} </Typography>
                </Box>

                <Button variant="text" color="primary" sx={{ width: '100px' }} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Grid>

            <Box
                sx={{
                    position: 'relative',
                    padding: 1,
                    paddingX: 2,
                    marginTop: 2,
                    borderBottomWidth: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}
            >
                <TextField
                    type="date"
                    value={selectedDate ? selectedDate : state.ad_start_date}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    inputProps={{
                        min: state.ad_start_date,
                        max: today.toISOString().split('T')[0],
                        disabled: (date) => {
                            const currentDate = new Date(date);
                            return currentDate < initialDate || currentDate >= today;
                        }
                    }}
                />
            </Box>

            <Grid container sx={{ width: '100%', display: 'flex', gap: 5, padding: 2, paddingY: 2 }}>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h3">{formatNumber(state.ad_budget)}</Typography>
                        <Typography variant="h5">Cost</Typography>
                    </Grid>
                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.contrastText, color: theme.palette.dark.main }}>
                        <IconCoins size={24} color={theme.palette.primary.main} />
                    </Avatar>
                </Card>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h3">{formatNumber(AdStat.impressions)}</Typography>
                        <Typography variant="h5">Impressions</Typography>
                    </Grid>
                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.contrastText, color: theme.palette.dark.main }}>
                        <IconEye size={24} color={theme.palette.warning.dark} />
                    </Avatar>
                </Card>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h3">{formatNumber(AdStat.clicks)}</Typography>
                        <Typography variant="h5">Clicks</Typography>
                    </Grid>
                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.contrastText, color: theme.palette.dark.main }}>
                        <IconClick size={24} color={theme.palette.error.main} />
                    </Avatar>
                </Card>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h3">{formatNumber(AdStat.conversions)}</Typography>
                        <Typography variant="h5">Conversions</Typography>
                    </Grid>
                    <Avatar size={32} sx={{ bgcolor: theme.palette.primary.contrastText, color: theme.palette.dark.main }}>
                        <IconFilter size={24} color={theme.palette.success.dark} />
                    </Avatar>
                </Card>
            </Grid>

            <Grid container sx={{ width: '100%', display: 'flex', gap: 5, padding: 2, paddingY: 2 }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                    <Box>
                        <CardMedia
                            component="img"
                            image={featuredImageUri + state.ad_creative}
                            alt="Ad creative"
                            sx={{ width: '100%', height: '81%', aspectRatio: 1, resize: 'contain' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                    <AdContent label={''}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
                                {state.ad_type}
                                {' Ad '}
                            </Typography>

                            <Box>
                                <IconButton
                                    aria-controls="row-menu"
                                    aria-haspopup="true"
                                    onClick={(events) => handleSelectItem(events, state)}
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
                                    {AdStatus.filter((item) => item.value !== adStatus).map((item) => (
                                        <MenuItem key={item.id} onClick={() => handleStatusChange(item.value, state.id)}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Box>
                    </AdContent>
                    <Box sx={{ borderRadius: 3, padding: 1, backgroundColor: theme.palette.background.default }}>
                        <AdContent label={'Status'}>
                            <Typography sx={{ color: AdsStatuses(adStatus) }}>{adStatus}</Typography>
                        </AdContent>

                        <AdContent label={'Ad heading'}>
                            <Typography>{state.ad_heading}</Typography>
                        </AdContent>
                        <AdContent label={'Ad sub heading'}>
                            <Typography>{state.ad_sub_heading}</Typography>
                        </AdContent>
                        <AdContent label={'Ad description'}>
                            <Typography>{state.ad_description}</Typography>
                        </AdContent>
                        <AdContent label={'Ad link label'}>
                            <Typography>{state.ad_button_label}</Typography>
                        </AdContent>
                        <AdContent label={'Ad link url'}>
                            <Typography>{state.ad_link_url}</Typography>
                        </AdContent>
                        <AdContent label={'Ad Budget'}>
                            <Typography>{formatNumber(state.ad_budget)}</Typography>
                        </AdContent>
                        <AdContent label={'Ad Frequency'}>
                            <Typography>{state.ad_frequency}</Typography>
                        </AdContent>
                        <AdContent label={'Ad start date'}>
                            <Typography>{state.ad_start_date}</Typography>
                        </AdContent>

                        <AdContent label={'Ad end date'}>
                            <Typography>{state.ad_end_date}</Typography>
                        </AdContent>

                        <AdContent label={'Drafted at'}>
                            <Typography>{DateFormater(state.created_at)}</Typography>
                        </AdContent>
                    </Box>

                    <Button variant="text" sx={{ width: '103px' }} onClick={() => navigate('/update-ads', { state: { ...state } })}>
                        Update
                    </Button>
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

export default AdsDetail;

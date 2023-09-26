// material-ui
import { Typography, Grid, Paper, IconButton, InputBase, Divider, FormControl, Select, MenuItem, Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
// project imports
import events from 'data/events';
import LeftEventPanel from './LeftEventPanel';
import RightEventPanel from './RightEventPanel';
import { useNavigate } from 'react-router';
import Connections from 'api';

// ==============================|| EVENTS PAGE ||============================== //

const Events = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [organizer, setOrganizer] = useState('all'); // for filter options
    const [category, setCategory] = useState('all'); // for filter options
    const [eventtype, setEventType] = useState('all'); //for filter options

    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEventsData, setFilteredEventsData] = useState([]);
    const options = {
        organizers: [],
        eventtypes: ['free', 'paid'],
        category: []
    };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleOptionChange = (event, stateUpdater) => {
        stateUpdater(event.target.value);
        filterData();
    };

    const filterData = () => {
        const filteredData = events
            .filter((event) => event.event_name.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(
                (event) =>
                    (organizer === 'all' || event.event_organizer === organizer) &&
                    (category === 'all' || event.category === category) &&
                    (eventtype === 'all' || event.event_type === eventtype)
            );
        setFilteredEventsData(filteredData);
    };

    const GetEvents = () => {
        var Api = Connections.api + Connections.events;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, {
            method: 'get',
            headers: headers
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setFilteredEventsData(response.data.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        GetEvents();
        return () => {};
    }, []);

    return (
        <Grid container display={'flex'} flexDirection={'column'}>
            <Grid item m={1} display={'flex'} justifyContent="space-between">
                <Typography variant="h3">Events</Typography>
                <Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={() => navigate('/add-event')}>
                    Add Events
                </Button>
            </Grid>
            <Divider sx={{ marginBottom: '20px' }} />
            <Grid container mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', maxWidth: 400, height: '50px' }}>
                        <InputBase
                            sx={{ flex: 1, paddingLeft: '20px' }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <Divider sx={{ height: 25, m: 0.5 }} orientation="vertical" />
                        <IconButton aria-label="menu">
                            <Search />
                        </IconButton>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginLeft: { lg: 1 } }} display={'flex'}>
                    <FormControl sx={{ m: 1, maxWidth: 120, marginLeft: { sm: 0 } }}>
                        <Select id="organizer-option" value={organizer} onChange={(event) => handleOptionChange(event, setOrganizer)}>
                            <MenuItem value={'all'}>Organizer</MenuItem>

                            {Array.from(new Set(filteredEventsData.map((event) => event.event_organizer))).map((organizer) => (
                                <MenuItem key={organizer} value={organizer}>
                                    {organizer}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, maxWidth: 120 }}>
                        <Select id="organizer-option" value={category} onChange={(event) => handleOptionChange(event, setCategory)}>
                            <MenuItem value={'all'}>Category</MenuItem>

                            {Array.from(new Set(filteredEventsData.map((event) => event.category))).map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, maxWidth: 120 }}>
                        <Select id="organizer-option" value={eventtype} onChange={(event) => handleOptionChange(event, setEventType)}>
                            <MenuItem value={'all'}>Event Type</MenuItem>
                            {Array.from(new Set(filteredEventsData.map((event) => event.event_type))).map((eventtype) => (
                                <MenuItem key={eventtype} value={eventtype}>
                                    {eventtype}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container sx={{ display: 'flex' }}>
                <Grid item sx={{ flex: 5, marginRight: { lg: 3, xl: 3 }, marginBottom: { xs: 1, sm: 1 } }}>
                    <LeftEventPanel events={filteredEventsData} isLoading={loading} />
                </Grid>
                <Grid item sx={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                    <RightEventPanel events={filteredEventsData} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Events;

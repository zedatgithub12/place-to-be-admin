// material-ui
import {
    Typography,
    Grid,
    Paper,
    IconButton,
    InputBase,
    Divider,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Box,
    Badge
} from '@mui/material';
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    NativeSelect,
    TableFooter
} from '@mui/material';
import { Search, ArrowForward, MoreVert } from '@mui/icons-material';
import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import events from 'data/events';
import AllEvents from './allEvents';
import MyEvents from './myEvents';

// ==============================|| SAMPLE PAGE ||============================== //

const Events = () => {
    const theme = useTheme();
    const [organizer, setOrganizer] = useState('all'); // for filter options
    const [category, setCategory] = useState('all'); // for filter options
    const [eventtype, setEventType] = useState('all'); //for filter options

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEventsData, setFilteredEventsData] = useState(events);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search button click and apply filters
    const handleSearchButtonClick = () => {
        filterData();
    };

    // Function to handle filter option changes and apply filters
    const handleOptionChange = (event, stateUpdater) => {
        stateUpdater(event.target.value);
        filterData();
    };

    const filterData = () => {
        const filteredData = events
            .filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(
                (event) =>
                    (organizer === 'all' || event.organizer === organizer) &&
                    (category === 'all' || event.type === category) &&
                    (eventtype === 'all' || event.type === eventtype)
            );
        setFilteredEventsData(filteredData);
    };

    useEffect(() => {
        filterData();
    }, [searchQuery, organizer, category, eventtype]);

    return (
        <Grid container display={'flex'} flexDirection={'column'}>
            <Grid item m={1} display={'flex'}>
                <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <Search />
                    </IconButton>
                    <InputBase
                        size="small"
                        sx={{ flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <Divider sx={{ height: 25, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="forward" onClick={handleSearchButtonClick}>
                        <ArrowForward />
                    </IconButton>
                </Paper>
                {/* organizer option */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label">Organizer</InputLabel>
                    <Select id="organizer-option" value={organizer} onChange={(event) => handleOptionChange(event, setOrganizer)}>
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'ABC Events'}>ABC Events</MenuItem>
                    </Select>
                </FormControl>

                {/* category option */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select id="organizer-option" value={category} onChange={(event) => handleOptionChange(event, setCategory)}>
                        <MenuItem value={'all'}>All</MenuItem>
                    </Select>
                </FormControl>

                {/* event-type option */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label">Event Type</InputLabel>
                    <Select id="organizer-option" value={eventtype} onChange={(event) => handleOptionChange(event, setEventType)}>
                        <MenuItem value={'all'}>All</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sx={{ display: 'flex', height: '80vh' }}>
                <MainCard sx={{ flex: 5, marginRight: 3 }}>
                    <AllEvents events={filteredEventsData} />
                </MainCard>
                <MainCard sx={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                    <MyEvents events={filteredEventsData} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Events;

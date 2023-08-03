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
    Badge,
    Tabs,
    Tab,
    makeStyles,
    Card
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
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { MoreVert } from '@mui/icons-material';

import './eventStyle.css';

const LeftEventPanel = ({ events }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [page, setPage] = useState(0); //for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); //for pagination

    const [tabValue, setTabValue] = useState('one');
    const tabCounters = {
        featuring: 0,
        thisWeek: 0,
        upcoming: 0,
        happening: 0
    };

    const filterEvents = (tab) => {
        const today = new Date();
        const nextSunday = new Date(today);
        nextSunday.setDate(today.getDate() + (7 - today.getDay())); // Calculate next Sunday

        (tabCounters.featuring = events.filter((event) => event.priority === 1).length),
            (tabCounters.thisWeek = events.filter(
                (event) => new Date(event.start_date) > today && new Date(event.end_date) <= nextSunday
            ).length),
            (tabCounters.upcoming = events.filter((event) => new Date(event.start_date) > nextSunday).length),
            (tabCounters.happening = events.filter(
                (event) => new Date(event.start_date) <= today && new Date(event.end_date) >= today
            ).length);

        switch (tab) {
            case 'featuring':
                return events.filter((event) => event.priority === 1);
            case 'happening':
                return events.filter((event) => new Date(event.start_date) <= today && new Date(event.end_date) >= today);
            case 'thisWeek':
                return events.filter((event) => new Date(event.start_date) > today && new Date(event.end_date) <= nextSunday);
            case 'upcoming':
                return events.filter((event) => new Date(event.start_date) > nextSunday);
            default:
                return events;
        }
    };

    const filteredEvents = filterEvents(tabValue);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const getEventsByPage = (events, page, rowsPerPage) => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return events.slice(startIndex, endIndex);
    };

    const visibleRows = useMemo(() => {
        return getEventsByPage(filteredEvents, page, rowsPerPage);
    }, [filteredEvents, page, rowsPerPage]);

    return (
        <Card>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    variant="fullWidth"
                    sx={{ height: '50px', display: 'flex', alignItems: 'center' }}
                    value={tabValue}
                    className="custom-tabs"
                    indicatorColor="white"
                    onChange={handleTabChange}
                >
                    <Tab
                        value="featuring"
                        label="Featuring"
                        icon={
                            <Box
                                sx={{
                                    minWidth: '20px',
                                    height: '20px',
                                    backgroundColor: '#F2F2F2',
                                    color: 'black',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                className="counter"
                            >
                                {tabCounters.featuring}
                            </Box>
                        }
                        iconPosition="end"
                    />
                    <Tab
                        value="happening"
                        label="Happening"
                        icon={
                            <Box
                                sx={{
                                    minWidth: '20px',
                                    height: '20px',
                                    backgroundColor: '#F2F2F2',
                                    color: 'black',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                className="counter"
                            >
                                {tabCounters.happening}
                            </Box>
                        }
                        iconPosition="end"
                    />
                    <Tab
                        value="thisWeek"
                        label="This Week"
                        icon={
                            <Box
                                sx={{
                                    minWidth: '20px',
                                    height: '20px',
                                    backgroundColor: '#F2F2F2',
                                    color: 'black',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                className="counter"
                            >
                                {tabCounters.thisWeek}
                            </Box>
                        }
                        iconPosition="end"
                    />
                    <Tab
                        value="upcoming"
                        label="Upcoming"
                        icon={
                            <Box
                                sx={{
                                    minWidth: '20px',
                                    height: '20px',
                                    backgroundColor: '#F2F2F2',
                                    color: 'black',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                className="counter"
                            >
                                {tabCounters.upcoming}
                            </Box>
                        }
                        iconPosition="end"
                    />
                </Tabs>
            </Box>
            <Grid item display={'flex'} flexDirection={'column'} sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Table aria-label="events table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell align="right">Organizer</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((event) => (
                                <TableRow
                                    key={event.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    onClick={() => navigate('/event-detail', { state: { ...event } })}
                                >
                                    <TableCell component="th" scope="row">
                                        {event.event_name}
                                    </TableCell>
                                    <TableCell align="right">{event.event_organizer}</TableCell>
                                    <TableCell align="right">{event.event_type}</TableCell>
                                    <TableCell align="right">{event.start_date}</TableCell>
                                    <TableCell align="right">{event.end_date}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                        >
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredEvents.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Grid>
        </Card>
    );
};

export default LeftEventPanel;

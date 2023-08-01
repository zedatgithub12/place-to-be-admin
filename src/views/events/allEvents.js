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
    makeStyles
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
import { useTheme } from '@mui/material/styles';
import { MoreVert } from '@mui/icons-material';

import './eventStyle.css';

const AllEvents = ({ events }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0); //for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); //for pagination
    const [currentPage, setCurrentPage] = useState(1); //for pagination

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
                (event) => new Date(event.startDate) <= today && new Date(event.endDate) >= today
            ).length),
            (tabCounters.upcoming = events.filter((event) => new Date(event.startDate) > nextSunday).length),
            (tabCounters.happening = events.filter(
                (event) => new Date(event.startDate) <= today && new Date(event.endDate) >= today
            ).length);

        switch (tab) {
            case 'featuring':
                return events.filter((event) => event.priority === 1);
            case 'happening':
                return events.filter((event) => new Date(event.startDate) <= today && new Date(event.endDate) >= today);
            case 'thisWeek':
                return events.filter((event) => new Date(event.startDate) > today && new Date(event.endDate) <= nextSunday);
            case 'upcoming':
                return events.filter((event) => new Date(event.startDate) > nextSunday);
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
        setPage(0);
    };

    const getEventsByPage = (events, page, rowsPerPage) => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return events.slice(startIndex, endIndex);
    };

    const visibleRows = useMemo(() => {
        return getEventsByPage(filteredEvents, currentPage, rowsPerPage);
    }, [filteredEvents, currentPage, rowsPerPage]);

    return (
        <Grid container>
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
                                    backgroundColor: 'red',
                                    color: 'white',
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
                                    backgroundColor: 'red',
                                    color: 'white',
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
                                    backgroundColor: 'red',
                                    color: 'white',
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
                                    backgroundColor: 'red',
                                    color: 'white',
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
            <Grid item display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ width: '100%', height: '80%' }}>
                <TableContainer>
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
                            {filteredEvents.map((event) => (
                                <TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {event.name}
                                    </TableCell>
                                    <TableCell align="right">{event.organizer}</TableCell>
                                    <TableCell align="right">{event.type}</TableCell>
                                    <TableCell align="right">{event.startDate}</TableCell>
                                    <TableCell align="right">{event.endDate}</TableCell>
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
        </Grid>
    );
};

export default AllEvents;

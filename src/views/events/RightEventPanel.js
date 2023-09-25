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
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import './eventStyle.css';
import { DateFormater } from 'utils/functions';

const RightEventPanel = ({ events }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState('one');
    const [page, setPage] = useState(0); //for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); //for pagination
    const tabCounters = {
        featured: 0
    };

    const filterEvents = (tab) => {
        tabCounters.featured = events.filter((event) => event.event_status == 0).length;
        switch (tab) {
            case 'Pending':
                return events.filter((event) => event.event_status == 0);
            case 'Declined':
                return events.filter((event) => event.event_status == 2);
            default:
                return events.filter((event) => event.event_status == 0);
        }
    };

    const filteredEvents = filterEvents(tabValue);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
    };

    const getEventsByPage = (events, page, rowsPerPage) => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return events.slice(startIndex, endIndex);
    };

    const visibleRows = useMemo(() => {
        return getEventsByPage(filteredEvents, page, rowsPerPage);
    }, [filteredEvents, page, rowsPerPage]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Card>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    variant="fullWidth"
                    value={tabValue}
                    sx={{ height: '50px', display: 'flex', alignItems: 'center' }}
                    className="custom-tabs"
                    onChange={handleTabChange}
                >
                    <Tab
                        value="Pending"
                        label="Pending"
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
                                {tabCounters.featured}
                            </Box>
                        }
                        iconPosition="end"
                    />
                    <Tab value="Declined" label="Declined" />
                </Tabs>
            </Box>

            <Grid item display={'flex'} flexDirection={'column'} sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Table aria-label="events table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Organizer</TableCell>
                                <TableCell align="center">Added Date</TableCell>
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
                                    <TableCell component="th" scope="row">
                                        {event.event_organizer}
                                    </TableCell>
                                    <TableCell align="center">{DateFormater(event.addedDate)}</TableCell>
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

export default RightEventPanel;

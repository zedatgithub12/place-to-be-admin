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

const RightEventPanel = ({ events }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState('one');
    const [page, setPage] = useState(0); //for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); //for pagination
    const [currentPage, setCurrentPage] = useState(0); //for pagination
    const tabCounters = {
        featured: 0
    };

    const filterEvents = (tab) => {
        tabCounters.featured = events.filter((event) => event.event_status === 'featured').length;
        switch (tab) {
            case 'featured':
                return events.filter((event) => event.event_status === 'featured');
            case 'declined':
                return events.filter((event) => event.event_status === 'declined');
            default:
                return events;
        }
    };

    const filteredEvents = filterEvents(tabValue);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setCurrentPage(newPage + 1);
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
        return getEventsByPage(filteredEvents, currentPage, rowsPerPage);
    }, [filteredEvents, currentPage, rowsPerPage]);

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
                        value="featured"
                        label="Featured"
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
                                {tabCounters.featured}
                            </Box>
                        }
                        iconPosition="end"
                    />
                    <Tab value="declined" label="Declined" />
                </Tabs>
            </Box>

            <Grid item display={'flex'} flexDirection={'column'} sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Table aria-label="events table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell align="center">Added Date</TableCell>
                                <TableCell align="right">Action</TableCell>
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
                                    <TableCell align="center">{event.added_date}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ minWidth: 100 }}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel fontSize={theme.typography.button} sx={{ color: 'white' }}>
                                                    Preview
                                                </InputLabel>
                                                <Select className="custom-select" label="Age" variant="outlined">
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
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
                        page={currentPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Grid>
        </Card>
    );
};

export default RightEventPanel;

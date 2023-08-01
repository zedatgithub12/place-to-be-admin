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
    Tab
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

const AllEvents = ({ events }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0); //for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); //for pagination
    const [currentPage, setCurrentPage] = useState(1); //for pagination
    const filteredEvents = events;

    const [tabValue, setTabValue] = useState('one');

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
                <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
                    <Tab value="one" label="Featuring" />
                    <Tab value="two" label="Happening" />
                    <Tab value="three" label="This Week" />
                    <Tab value="four" label="Upcoming" />
                </Tabs>
            </Box>
            <Grid item display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ height: '80%' }}>
                <Grid item className="event-table">
                    <TableContainer component={Paper}>
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
                </Grid>
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

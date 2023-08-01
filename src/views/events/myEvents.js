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
import { useState } from 'react';
import { useTheme } from '@mui/material';
import './eventStyle.css';

const MyEvents = ({ events }) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState('one');
    const tabCounters = {
        featured: 0
    };

    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filterEvents = (tab) => {
        tabCounters.featured = events.filter((event) => event.status === 'featured').length;
        switch (tab) {
            case 'featured':
                return events.filter((event) => event.status === 'featured');
            case 'declined':
                return events.filter((event) => event.status === 'declined');
            default:
                return events;
        }
    };

    const filteredEvents = filterEvents(tabValue);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Grid container>
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

            <Grid item display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ width: '100%', height: '80%' }}>
                <Grid item className="event-table">
                    <TableContainer fullWidth component={Paper}>
                        <TableHead fullWidth>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell align="right">Added Date</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvents.map((event) => (
                                <TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {event.name}
                                    </TableCell>
                                    <TableCell align="right">{event.addedDate}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ minWidth: 100 }}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel fontSize={theme.typography.button}>Preview</InputLabel>
                                                <Select
                                                    sx={{ height: '32px', backgroundColor: '#0065DB' }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Age"
                                                >
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
                    </TableContainer>
                    <TableFooter>
                        <TablePagination
                            component="div"
                            count={100}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MyEvents;

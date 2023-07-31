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
import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, TablePagination, NativeSelect } from '@mui/material';
import { Search, ArrowForward, MoreVert } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import events from 'data/events';

// ==============================|| SAMPLE PAGE ||============================== //

const Events = () => {
    const theme = useTheme();
    const [organizer, setOrganizer] = useState('');
    const [category, setCategory] = useState('');
    const [eventtype, setEventType] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    function getEventsByPage(events, page, rowsPerPage) {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return events.slice(startIndex, endIndex);
    }

    const visibleRows = useMemo(() => {
        return getEventsByPage(events, currentPage, rowsPerPage);
    }, [events, currentPage, rowsPerPage]);

    const handleOptionChange = (event, stateUpdater) => {
        stateUpdater(event.target.value);
    };
    return (
        <Grid container display={'flex'} flexDirection={'column'}>
            <Grid item m={1} display={'flex'}>
                <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <Search />
                    </IconButton>
                    <InputBase sx={{ flex: 1 }} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
                    <Divider sx={{ height: 25, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="forward">
                        <ArrowForward />
                    </IconButton>
                </Paper>
                {/* organizer option */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label">Organizer</InputLabel>
                    <Select id="organizer-option" value={organizer} onChange={(event) => handleOptionChange(event, setOrganizer)}>
                        <MenuItem value={'all'}>All</MenuItem>
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
                    <Grid item className="options" sx={{ display: 'flex' }}>
                        <Box
                            p={1}
                            bgcolor={'rgba(255, 187, 0, 1)'}
                            flex={1}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{ cursor: 'pointer', borderRadius: '5px' }}
                        >
                            <Typography fontSize={theme.typography.h4}>Featured</Typography>
                            <Box
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#FF1D1D',
                                    minWidth: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    flexWrap: true
                                }}
                            >
                                4
                            </Box>
                        </Box>
                        <Box p={1} flex={1} display={'flex'} justifyContent={'center'} sx={{ cursor: 'pointer', borderRadius: '5px' }}>
                            <Typography>Happening</Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#FF1D1D',
                                    color: 'white',
                                    minWidth: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    flexWrap: true
                                }}
                            >
                                4
                            </Box>
                        </Box>
                        <Box p={1} flex={1} display={'flex'} justifyContent={'center'} sx={{ cursor: 'pointer', borderRadius: '5px' }}>
                            <Typography>This week</Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#FF1D1D',
                                    color: 'white',
                                    minWidth: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    flexWrap: true
                                }}
                            >
                                4
                            </Box>
                        </Box>
                        <Box p={1} flex={1} display={'flex'} justifyContent={'center'} sx={{ cursor: 'pointer', borderRadius: '5px' }}>
                            <Typography>Upcoming</Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#FF1D1D',
                                    color: 'white',
                                    minWidth: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    flexWrap: true
                                }}
                            >
                                46
                            </Box>
                        </Box>
                    </Grid>
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
                                        {visibleRows.map((event) => (
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
                        <Grid item>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={events.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
                <MainCard sx={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                    <Grid item className="options" sx={{ display: 'flex' }}>
                        <Box
                            p={1}
                            bgcolor={'rgba(255, 187, 0, 1)'}
                            flex={1}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{ cursor: 'pointer', borderRadius: '5px' }}
                        >
                            <Typography fontSize={theme.typography.h4}>Featured</Typography>
                            <Box
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#FF1D1D',
                                    minWidth: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    flexWrap: true
                                }}
                            >
                                4
                            </Box>
                        </Box>
                        <Box p={1} flex={1} display={'flex'} justifyContent={'center'} sx={{ cursor: 'pointer', borderRadius: '5px' }}>
                            <Typography>Happening</Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#FF1D1D',
                                    color: 'white',
                                    minWidth: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    flexWrap: true
                                }}
                            >
                                4
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ height: '80%' }}>
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
                                    {visibleRows.map((event) => (
                                        <TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {event.name}
                                            </TableCell>
                                            <TableCell align="right">{event.createdDate}</TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ minWidth: 100 }}>
                                                    <FormControl fullWidth sx={{}} variant="outlined" size="small">
                                                        <InputLabel id="demo-simple-select-label">Preview</InputLabel>
                                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
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
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Events;

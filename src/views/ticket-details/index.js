import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    Tabs,
    Tab,
    Typography,
    useTheme,
    IconButton,
    Paper,
    InputBase,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    CardHeader,
    CardContent,
    Menu
} from '@mui/material';

import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, TableFooter } from '@mui/material';
import { MoreVert, Search } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { useLocation, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';

//dummy datas
import Events from 'data/events';
import Organizers from 'data/organizers';
import Tickets from 'data/ticket';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import TicketCard from './ticket-card';

const EventDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quantity, setQuantity] = useState('all');
    const [gateway, setGateway] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTicketsData, setFilteredTicketsData] = useState(Tickets);
    const [selectedTicket, setSelectedTicket] = useState(filteredTicketsData[0]); // make this the selected item using state

    const event = Events[1]; // event fetched from the dummy data object assgign this value to state once the api is integrated
    const ticket = Tickets[0];

    const organizer = Organizers.find((organizer) => organizer.organizer_name === event.event_organizer);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (option) => () => {
        setSelectedOption(option);
        setAnchorEl(null);
    };

    const handleOptionChange = (event, stateUpdater) => {
        stateUpdater(event.target.value);
        filterData();
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search button click and apply filters
    const handleSearchButtonClick = () => {
        filterData();
    };

    const filterData = () => {
        const filteredData = Tickets.filter((ticket) => ticket.username.toLowerCase().includes(searchQuery.toLowerCase())).filter(
            (ticket) => (quantity === 'all' || ticket.quantity === quantity) && (gateway === 'all' || ticket.p_gateway === gateway)
        );
        setFilteredTicketsData(filteredData);
    };

    useEffect(() => {
        filterData();
    }, [searchQuery, quantity, gateway]);

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                m={1}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Typography variant="h2">Ticket Detail</Typography>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ width: '100px', bgcolor: '#D1E9FF', color: '#0065DB', '&:hover': { color: 'white' } }}
                    onClick={() => navigate('/tickets')}
                >
                    Back
                </Button>
            </Grid>
            <Divider sx={{ width: '100%', marginBottom: 3 }} bgcolor="#B6B6B6" />
            <Grid container sx={{ width: '100%', display: 'flex', gap: 5 }}>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h1">50k</Typography>
                        <Typography variant="h5">Total Revenue</Typography>
                    </Grid>
                    <Box sx={{ width: '40px', height: '40px', bgcolor: '#D1E9FF', borderRadius: '50%' }}></Box>
                </Card>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h1">870</Typography>
                        <Typography variant="h5">Sold Ticket</Typography>
                    </Grid>
                    <Box sx={{ width: '40px', height: '40px', bgcolor: '#EDEDED', borderRadius: '50%' }}></Box>
                </Card>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h1">130</Typography>
                        <Typography variant="h5">Left Ticket</Typography>
                    </Grid>
                    <Box sx={{ width: '40px', height: '40px', bgcolor: '#FFF2D1', borderRadius: '50%' }}></Box>
                </Card>
                <Card sx={{ display: 'flex', padding: 3, flex: 1, justifyContent: 'space-between' }}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h1">1k</Typography>
                        <Typography variant="h5">Added Amount</Typography>
                    </Grid>
                    <Box sx={{ width: '40px', height: '40px', bgcolor: '#BFFFC6', borderRadius: '50%' }}></Box>
                </Card>
            </Grid>
            <Grid container m={{ md: 1, lg: 3, xl: 3 }} sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }} mb={5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card sx={{ width: '100%' }}>
                            <CardMedia component="img" image={event.event_image} alt="event image"></CardMedia>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5.5} xl={5.5}>
                        <Card sx={{ width: '100%', padding: 3, marginBottom: 1, position: 'relative' }}>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                style={{ position: 'absolute', top: 3, right: 5 }}
                            >
                                <MoreVert />
                            </IconButton>
                            <Grid item display={'flex'} gap={4}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#FFBB00', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.event_name}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Event Name</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#FFBB00', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.tickettype}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Ticket type</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#FFBB00', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.price}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Price</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#FFBB00', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.created_at}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Added Date</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#FFBB00', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.date}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Expire Date</Typography>
                                </Grid>
                            </Grid>
                            <Grid item display={'flex'} gap={4} mt={2}>
                                <Box sx={{ width: '30px', height: '30px', bgcolor: '#FFBB00', borderRadius: '50%' }}></Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.status}</Typography>
                                    <Typography fontSize={theme.typography.caption}>Status</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card sx={{ width: '100%', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Grid display={'flex'} gap={2}>
                                <Box sx={{ maxWidth: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden' }}>
                                    <img src={organizer.organizer_image} alt="event organizer" />
                                </Box>
                                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontSize={theme.typography.h4}>{organizer.organizer_name}</Typography>
                                    <Typography fontWeight={theme.typography.fontWeightMedium}>{organizer.category}</Typography>
                                    <Typography>
                                        <Typography display={'inline'} fontWeight={theme.typography.fontWeightBold}>
                                            {organizer.events}
                                        </Typography>{' '}
                                        events
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid display={'flex'}>
                                <Typography variant="h3">{organizer.rating}</Typography>
                                <StarIcon sx={{ width: '12px', height: '12px', color: '#FFBB00', marginTop: 0.5 }} />
                            </Grid>
                        </Card>
                        <Grid item mt={2} display={'flex'}>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleMenuClick}
                                    sx={{ boxShadow: 'none' }}
                                    endIcon={<ArrowDropDownIcon />}
                                >
                                    {selectedOption || 'Preview'}
                                </Button>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                                    <MenuItem>Preview</MenuItem>
                                    <MenuItem>Update</MenuItem>
                                </Menu>
                            </div>
                            <Button
                                variant="text"
                                sx={{ width: '103px' }}
                                onClick={() => navigate('/update-event', { state: { ...event } })}
                            >
                                Edit
                            </Button>
                            <Button variant="text" sx={{ color: '#FF1D1D' }}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container m={{ md: 1, lg: 3, xl: 3 }} sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }} mb={5}>
                    <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
                        <Card>
                            <Box
                                item
                                sx={{ bgcolor: '#FFBB00', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}
                            >
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

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="select-label">Quantity</InputLabel>
                                    <Select
                                        id="quantity-option"
                                        value={quantity}
                                        onChange={(event) => handleOptionChange(event, setQuantity)}
                                        defaultValue="all"
                                    >
                                        <MenuItem value="all">All</MenuItem>

                                        {Array.from(new Set(filteredTicketsData.map((ticket) => ticket.quantity))).map((quantity) => (
                                            <MenuItem key={quantity} value={quantity}>
                                                {quantity}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="select-label">P-Gateway</InputLabel>
                                    <Select
                                        id="organizer-option"
                                        value={gateway}
                                        onChange={(event) => handleOptionChange(event, setGateway)}
                                        defaultValue="all"
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        {Array.from(new Set(filteredTicketsData.map((ticket) => ticket.p_gateway))).map((gateway) => (
                                            <MenuItem key={gateway} value={gateway}>
                                                {gateway}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <TableContainer component={Paper} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Table aria-label="events table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Phone</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">P-Gateway</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredTicketsData.map((ticket) => (
                                            <TableRow
                                                key={ticket.ticketid}
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => setSelectedTicket(ticket)}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {ticket.id}
                                                </TableCell>
                                                <TableCell align="right">{ticket.username}</TableCell>
                                                <TableCell align="right">{ticket.phone}</TableCell>
                                                <TableCell align="right">{ticket.quantity}</TableCell>
                                                <TableCell align="right">{ticket.p_gateway}</TableCell>
                                                <TableCell align="right">
                                                    <Box
                                                        sx={{
                                                            bgcolor: '#F3F3F3',
                                                            borderRadius: '5px',
                                                            textAlign: 'center',
                                                            color: '#0065DB'
                                                        }}
                                                    >
                                                        {ticket.status}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4.5} xl={4.5}>
                        <TicketCard ticket={selectedTicket} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EventDetail;

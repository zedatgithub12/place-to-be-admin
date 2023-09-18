import React, { useState, forwardRef, useEffect } from 'react';
import {
    Grid,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Typography,
    Divider,
    useTheme,
    Card,
    CardMedia,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    Select,
    TextField,
    CircularProgress
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MoreVert } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import DetailCard from './components/detailCard';
import {
    IconCalendarDue,
    IconCalendarTime,
    IconCircleCheck,
    IconCoins,
    IconId,
    IconMoneybag,
    IconReportAnalytics,
    IconSquaresFilled,
    IconTicket,
    IconX
} from '@tabler/icons';
import Connections from 'api';
import { DateFormater, TicketStatus } from 'utils/functions';
import { TicketStatuses, TicketType } from 'data/ticket';
import { SoldTickets } from 'tables/columns/soldTickets';
import { DataGrid } from '@mui/x-data-grid';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TicketDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [statusOfTicket, setStatusOfTicket] = useState(state.status);
    const [spinner, setSpinner] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [soldLoader, setSoldLoader] = useState(false);
    const [ticketSold, setTicketSold] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [rowCountState, setRowCountState] = useState(lastPage);

    const [updating, setUpdating] = useState(false);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
        pageCount: 10,
        pageStartIndex: 0,
        pageEndIndex: 0
    });
    const [ticketData, setTicketData] = useState({
        event_id: '',
        event_image: '',
        event_name: state.event_name,
        tickettype: state.tickettype,
        price: state.currentprice,
        qauntity: state.currentamount,
        expiredate: state.expiredate
    });
    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPopup({
            ...popup,
            status: false
        });
    };

    var featuredImageUri = Connections.api + Connections.assets;

    const GoBack = () => {
        navigate(-1);
    };

    const CalculateRevenue = () => {
        let total = (state.origionalamount - state.currentamount) * state.currentprice;
        return total;
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelectItem = (events) => {
        handleMenuClick(events);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (status, id) => {
        var Api = Connections.api + Connections.changeTicketStatus + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            ticket_status: status
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });
                    setAnchorEl(null);
                    setStatusOfTicket(status);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error updating ticket status!'
                });
            });
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    //update tickets codes

    const handleTicketTypeChange = (event) => {
        setTicketData({ ...ticketData, tickettype: event.target.value });
    };

    const handleUpdateTicket = async (e) => {
        e.preventDefault();

        if (!ticketData.tickettype || ticketData.tickettype === 'Ticket Type') {
            setPopup({
                ...popup,
                status: true,
                severity: 'error',
                message: 'Please select ticket type'
            });
        } else {
            setUpdating(true);
            const data = {
                type: ticketData.tickettype,
                price: ticketData.price,
                amount: ticketData.qauntity,
                expiredate: ticketData.expiredate
            };

            var Api = Connections.api + Connections.UpdateTicket + state.id;

            fetch(Api, {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setPopup({
                            ...popup,
                            status: true,
                            severity: 'success',
                            message: response.message
                        });
                        handleDialogClose();
                        setUpdating(false);
                    } else {
                        setPopup({
                            ...popup,
                            status: true,
                            severity: 'error',
                            message: response.message
                        });
                        setUpdating(false);
                    }
                })
                .catch((error) => {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: error.message
                    });
                    setUpdating(false);
                });
        }
    };

    useEffect(() => {
        const GetSoldTickets = () => {
            var Api = Connections.api + Connections.soldTickets + state.id;
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
                        setTicketSold(response.data);
                        setSoldLoader(false);
                    }
                })
                .catch((error) => {
                    setSoldLoader(false);
                });
        };

        setTimeout(() => {
            GetSoldTickets();
        }, 3000);

        return () => {};
    }, []);

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
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 2.4 }}
            >
                <Typography variant="h3">Ticket Detail</Typography>
                <Button variant="text" size="small" sx={{ width: '100px' }} onClick={() => GoBack()}>
                    Back
                </Button>
            </Grid>
            <Divider sx={{ width: '100%' }} bgcolor="#B6B6B6" />

            <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <DetailCard count={CalculateRevenue()} caption={'Total Revenue (ETB)'} background={theme.palette.success.light}>
                        <IconMoneybag size={24} color={theme.palette.success.dark} />
                    </DetailCard>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <DetailCard
                        count={state.origionalamount - state.currentamount}
                        caption={'Ticket Sold'}
                        background={theme.palette.primary.light}
                    >
                        <IconReportAnalytics size={24} color={theme.palette.primary.dark} />
                    </DetailCard>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <DetailCard count={state.currentamount} caption={'Ticket Left'} background={theme.palette.secondary.light}>
                        <IconTicket size={24} color={theme.palette.secondary.dark} />
                    </DetailCard>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <DetailCard count={state.origionalamount} caption={'Total ticket quantity'} background={theme.palette.warning.light}>
                        <IconSquaresFilled size={24} color={theme.palette.warning.dark} />
                    </DetailCard>
                </Grid>
            </Grid>

            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.background.main,
                            margin: 2
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={featuredImageUri + state.event_image}
                            alt="event poster"
                            sx={{ width: '100%', height: 520 }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            marginY: 2,
                            marginRight: 2,
                            paddingBottom: 2,
                            borderRadius: 3
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 2, paddingY: 2 }}>
                            <Typography variant="h4">{state.event_name}</Typography>

                            <IconButton aria-controls="row-menu" aria-haspopup="true" onClick={(events) => handleSelectItem(events, state)}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="row-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                className="shadow-sm"
                            >
                                {TicketStatuses.filter((item) => item.value !== statusOfTicket).map((item) => (
                                    <MenuItem key={item.id} onClick={() => handleStatusChange(item.value, state.id)}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Divider sx={{ marginBottom: 1 }} />

                        <Grid item display={'flex'} gap={4} sx={{ padding: 1, marginLeft: 1 }}>
                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                <IconId />
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography fontWeight={theme.typography.fontWeightBold}>{state.id}</Typography>
                                <Typography fontSize={theme.typography.caption}>ID</Typography>
                            </Box>
                        </Grid>

                        <Grid item display={'flex'} gap={4} sx={{ padding: 1, marginLeft: 1 }}>
                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                <IconCircleCheck />
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    mt={1}
                                    fontWeight={theme.typography.fontWeightBold}
                                    sx={{ color: TicketStatus(statusOfTicket).statusColor }}
                                >
                                    {TicketStatus(statusOfTicket).literalStatus}
                                </Typography>
                                <Typography fontSize={theme.typography.caption}>Status</Typography>
                            </Box>
                        </Grid>

                        <Grid item display={'flex'} gap={4} sx={{ padding: 1, marginLeft: 1 }}>
                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                <IconTicket />
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography mt={1} fontWeight={theme.typography.fontWeightBold} sx={{ textTransform: 'capitalize' }}>
                                    {state.tickettype}
                                </Typography>
                                <Typography fontSize={theme.typography.caption}>Ticket Type</Typography>
                            </Box>
                        </Grid>

                        <Grid item display={'flex'} gap={4} sx={{ padding: 1, marginLeft: 1 }}>
                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                <IconCoins />
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography mt={1} fontWeight={theme.typography.fontWeightBold} sx={{ textTransform: 'capitalize' }}>
                                    {state.currentprice} ETB
                                </Typography>
                                <Typography fontSize={theme.typography.caption}>Ticket Price</Typography>
                            </Box>
                        </Grid>

                        <Grid item display={'flex'} gap={4} sx={{ padding: 1, marginLeft: 1 }}>
                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                <IconCalendarDue />
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                    {DateFormater(state.created_at)}
                                </Typography>
                                <Typography fontSize={theme.typography.caption}>Added On</Typography>
                            </Box>
                        </Grid>
                        <Grid item display={'flex'} gap={4} sx={{ padding: 1, marginLeft: 1 }}>
                            <Avatar size={32} sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.dark.main }}>
                                <IconCalendarTime />
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography mt={1} fontWeight={theme.typography.fontWeightBold}>
                                    {DateFormater(state.expiredate)}
                                </Typography>
                                <Typography fontSize={theme.typography.caption}>Expire Date</Typography>
                            </Box>
                        </Grid>
                        <Grid item mt={2}>
                            <Button variant="text" sx={{ width: '103px', marginLeft: 1 }} onClick={() => handleDialogOpen()}>
                                Update
                            </Button>

                            {/* <Button variant="text" sx={{ color: '#808080' }} onClick={() => handleDialogOpen()}>
                            Delete
                        </Button> */}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.default,
                    padding: 2,
                    margin: 1,
                    borderRadius: 3
                }}
            >
                <Box
                    sx={{
                        marginY: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingX: 1
                    }}
                >
                    <Typography variant="h4">Sold Tickets</Typography>
                    <Typography variant="h5">{ticketSold.length} Tickets</Typography>
                </Box>

                <DataGrid
                    autoHeight
                    columns={SoldTickets}
                    rows={ticketSold}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: paginationModel.pageSize,
                                page: 1,
                                pageCount: lastPage,
                                pageStartIndex: paginationModel.page * paginationModel.pageSize,
                                pageEndIndex: lastPage
                            }
                        }
                    }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pagination={true}
                    rowCount={rowCountState}
                    pageSizeOptions={[10, 25, 50, 100]}
                    onPageChange={(newPage) => {
                        setPaginationModel({
                            ...paginationModel,
                            page: newPage
                        });
                    }}
                    onPageSizeChange={(newPageSize) => {
                        setPaginationModel({
                            ...paginationModel,
                            pageSize: newPageSize
                        });
                    }}
                    paginationMode="server"
                    density="comfortable"
                    hideFooterSelectedRowCount={true}
                    sx={{ padding: 1, marginTop: 1.6 }}
                />
            </Grid>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <Box sx={{ minWidth: 600 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 0.2,
                            backgroundColor: theme.palette.warning.dark
                        }}
                    >
                        <DialogTitle variant="subtitle1">Update Ticket</DialogTitle>

                        <IconButton onClick={handleDialogClose} sx={{ marginRight: 1 }}>
                            <IconX size={18} />
                        </IconButton>
                    </Box>

                    <form onSubmit={handleUpdateTicket}>
                        <DialogContent>
                            <Box paddingLeft={2}>
                                <Typography variant="body2"> Event Name - {state.event_name}</Typography>
                            </Box>

                            <Grid item sx={{ paddingY: 5, display: 'flex', justifyContent: 'center' }}>
                                <FormControl required sx={{ minWidth: 250 }}>
                                    <Select value={ticketData.tickettype} onChange={handleTicketTypeChange}>
                                        <MenuItem value={ticketData.tickettype} sx={{ textTransform: 'capitalize' }}>
                                            {ticketData.tickettype}
                                        </MenuItem>
                                        {TicketType.map((ticket) => (
                                            <MenuItem key={ticket.id} value={ticket.name}>
                                                {ticket.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    placeholder="Ticket price"
                                    label="Price"
                                    required
                                    value={ticketData.price}
                                    onChange={(event) => setTicketData({ ...ticketData, price: event.target.value })}
                                    sx={{ marginLeft: 4, minWidth: 250 }}
                                />
                            </Grid>

                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <TextField
                                    required
                                    label="Quantity"
                                    placeholder="Quantity"
                                    value={ticketData.qauntity}
                                    onChange={(event) => setTicketData({ ...ticketData, qauntity: event.target.value })}
                                    sx={{ minWidth: 250 }}
                                />

                                <TextField
                                    required
                                    label="Expire date"
                                    type="date"
                                    placeholder="Expire Date"
                                    value={ticketData.expiredate}
                                    onChange={(event) => setTicketData({ ...ticketData, expiredate: event.target.value })}
                                    sx={{ marginLeft: 4, minWidth: 250 }}
                                />
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ paddingRight: 4, paddingY: 3 }}>
                            <Button variant="text" color="dark" onClick={handleDialogClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="warning" type="submit">
                                {updating ? <CircularProgress size={18} sx={{ color: theme.palette.dark.main }} /> : 'Submit '}
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>

            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default TicketDetail;

import React, { useState, useEffect, forwardRef } from 'react';
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    CircularProgress,
    useTheme,
    IconButton,
    Autocomplete,
    TextField,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import Connections from 'api';
import { TicketColumns } from 'tables/columns/tickets';
import { DataGrid } from '@mui/x-data-grid';
import SplitButton from './components/Dropdown';
import { IconX } from '@tabler/icons';
import { TicketType } from 'data/ticket';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Tickets = () => {
    const theme = useTheme();

    const [data, setData] = useState([]);
    const [events, setEvents] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [rowCountState, setRowCountState] = useState(lastPage);
    const [spinner, setSpinner] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [ttype, setTtype] = useState('Ticket Type');

    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

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
        event_name: '',
        tickettype: '',
        price: '',
        qauntity: '',
        expiredate: ''
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

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
        GetUpcomingEvents();
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleTicketTypeChange = (event) => {
        setTtype(event.target.value);
    };

    const GetTickets = () => {
        var Api = Connections.api + Connections.Tickets;
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
                    setData(response.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const GetUpcomingEvents = () => {
        var Api = Connections.api + Connections.UpcomingEvents;
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
                    setEvents(response.data);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        GetTickets();
        return () => {};
    }, []);

    return (
        <Grid container p={1}>
            <Grid container sx={{ marginX: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3"> Tickets </Typography>
                <Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={() => handleDialogOpen()}>
                    Add Ticket
                </Button>
            </Grid>

            {/* the body component goes here */}

            <Grid
                container
                sx={{
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'flex-start',
                    bgcolor: theme.palette.background.default,
                    borderRadius: 4,
                    marginTop: 2,
                    padding: 2
                }}
            >
                <SplitButton />
                <DataGrid
                    autoHeight
                    autoWidth
                    columns={TicketColumns}
                    rows={data}
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
                        <DialogTitle variant="h4">Add Ticket</DialogTitle>

                        <IconButton onClick={handleDialogClose} sx={{ marginRight: 1 }}>
                            <IconX size={22} />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ textAlign: 'center' }}>
                        <Grid item xs={12} sx={{ marginTop: 1 }}>
                            <Autocomplete
                                freeSolo
                                options={events}
                                getOptionLabel={(option) => option.event_name}
                                onChange={(event, value) => {
                                    if (value) {
                                        setTicketData({
                                            event_id: value.id,
                                            event_image: value.event_image,
                                            event_name: value.event_name
                                        });
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} required label="Event" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item sx={{ paddingY: 2, display: 'flex', justifyContent: 'center' }}>
                            <FormControl required sx={{ minWidth: 250 }}>
                                <Select value={ttype} onChange={handleTicketTypeChange}>
                                    <MenuItem value="Ticket Type">Ticket Type</MenuItem>
                                    {TicketType.map((ticket) => (
                                        <MenuItem key={ticket.id} value={ticket.name}>
                                            {ticket.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                placeholder="Ticket Price"
                                value={ticketData.price}
                                onChange={(event) => setTicketData({ ...ticketData, price: event.target.value })}
                                sx={{ marginLeft: 4, minWidth: 250 }}
                            />
                        </Grid>

                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                required
                                placeholder="Quantity"
                                value={ticketData.qauntity}
                                onChange={(event) => setTicketData({ ...ticketData, qauntity: event.target.value })}
                                sx={{ minWidth: 250 }}
                            />

                            <TextField
                                required
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
                        <Button variant="contained" color="warning" onClick={() => Delete(event.id)}>
                            {spinner ? <CircularProgress size={18} /> : 'Add '}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default Tickets;

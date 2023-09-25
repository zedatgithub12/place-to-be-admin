import React, { useState, forwardRef, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, Paper, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconChevronDown, IconCircleCheck } from '@tabler/icons';
import Connections from 'api';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomerModal = ({ selectedRow, onClose }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [statusOfQuery, setStatusOfQuery] = useState();
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

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const Status = (numericStatus) => {
        var LiteralStatuses;

        switch (numericStatus) {
            case 1:
                LiteralStatuses = 'Answered';
                break;
            default:
                LiteralStatuses = 'New';
                break;
        }
        return LiteralStatuses;
    };

    const handleStatusChange = (status, id) => {
        var Api = Connections.api + Connections.changeQueryStatus + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            query_status: status
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
                console.log(response);
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });
                    setAnchorEl(null);
                    setStatusOfQuery(status);
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
                    message: error.message
                });
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setStatusOfQuery(selectedRow ? selectedRow.status : 0);
        }, 500);
    }, [selectedRow]);
    return (
        <Paper open={selectedRow} onClose={onClose} sx={{ marginTop: 1 }}>
            <Box>
                {selectedRow && (
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                background: theme.palette.warning.main,
                                borderTopLeftRadius: 6,
                                borderTopRightRadius: 6,
                                padding: 1.2,
                                paddingX: 2
                            }}
                        >
                            <Box>
                                <AccountCircleIcon size={32} />
                            </Box>

                            <Grid item sx={{ paddingX: 2 }}>
                                <Typography variant="h5">{selectedRow.name}</Typography>
                                <Typography variant="subtitle2">{selectedRow.email}</Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: 140,
                                    textAlign: 'center',
                                    position: 'absolute',
                                    right: 6,
                                    top: 0,
                                    backgroundColor: theme.palette.background.default,
                                    paddingX: 2,
                                    paddingY: 0.4,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: statusOfQuery === 1 ? theme.palette.success.dark : theme.palette.error.dark }}
                                >
                                    {Status(statusOfQuery)}
                                </Typography>
                                {statusOfQuery === 0 && (
                                    <Box>
                                        <IconButton
                                            aria-controls="row-menu"
                                            aria-haspopup="true"
                                            onClick={(event) => handleMenuClick(event)}
                                        >
                                            <IconChevronDown size={16} />
                                        </IconButton>
                                        <Menu
                                            id="row-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            className="shadow-sm"
                                        >
                                            <MenuItem onClick={() => handleStatusChange(1, selectedRow.id)}>
                                                Answered
                                                <IconCircleCheck size={16} color="#33bb34" />
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>

                        <Grid item md={12} p={2}>
                            <Typography variant="subtitle1"> Question </Typography>
                            <Typography variant="body2" sx={{ paddingY: 2, paddingRight: 2, lineHeight: 1.8 }}>
                                {selectedRow.comment}
                            </Typography>
                            <Typography variant="subtitle1"> Replay </Typography>

                            <TextField
                                label="Subject"
                                placeholder="Replay subject"
                                size="small"
                                sx={{ marginTop: 3, width: '100%' }}
                            ></TextField>

                            <TextField
                                label="Message"
                                multiline
                                rows={4}
                                placeholder="Replied message"
                                sx={{ marginTop: 3, width: '100%' }}
                            />
                        </Grid>
                        <Grid item p={2} container justifyContent="flex-end" alignItems="center">
                            <Button size="medium" sx={{ width: '100px' }} variant="contained" color="warning">
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>
            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default CustomerModal;

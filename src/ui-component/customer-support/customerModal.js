import React from 'react';
import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CustomerModal = ({ selectedRow, onClose }) => {
    return (
        <Paper open={!!selectedRow} onClose={onClose} sx={{ marginTop: '112px' }}>
            <Box>
                {selectedRow && (
                    <>
                        <Grid container>
                            <Grid item container md={12} m={0} sx={{ background: '#FDBA16' }}>
                                <Grid item md={2} p={2} pl={3} pr={3}>
                                    <AccountCircleIcon />
                                </Grid>
                                <Grid item pt={1.5} md={5}>
                                    <Typography variant="h5">{selectedRow.name}</Typography>
                                    <Typography variant="subtitle2">{selectedRow.date}</Typography>
                                </Grid>
                                <Grid item pt={2} pl={6}>
                                    <Typography variant="subtitle1">{selectedRow.status}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item md={12} p={2}>
                                <Typography variant="h4"> Question </Typography>
                                <Typography variant="subtitle2" p={1}>
                                    {' '}
                                    {selectedRow.message}{' '}
                                </Typography>
                                <Typography variant="h4"> Response </Typography>
                                <Typography variant="subtitle1" p={1}>
                                    {' '}
                                    Subject{' '}
                                </Typography>
                                <TextField placeholder="Response Subject" size="small" sx={{ width: '100%' }}></TextField>
                                <Typography variant="subtitle1" p={1}>
                                    {' '}
                                    Message
                                </Typography>
                                <TextField multiline rows={4} placeholder="Response Message" sx={{ width: '100%' }} />
                            </Grid>
                            <Grid item p={2} container justifyContent="flex-start" alignItems="center">
                                <Button
                                    size="medium"
                                    sx={{ background: '#FDBA16', fontWeight: 'bold', width: '100px' }}
                                    variant="contained"
                                >
                                    {' '}
                                    replay{' '}
                                </Button>
                                <Button sx={{ color: 'red', marginLeft: '11px', fontWeight: 'bold', width: '100px' }} size="medium">
                                    {' '}
                                    close{' '}
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default CustomerModal;

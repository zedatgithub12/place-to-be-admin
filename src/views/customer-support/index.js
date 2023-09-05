// CustomerPage.js
import React, { useState } from 'react';
import CustomerTable from '../../ui-component/customer-support/customerTable';
import customersdata from 'data/customer';
import { Grid, Paper, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomerModal from 'ui-component/customer-support/customerModal';

const columns = [
    { id: 'id', label: 'Id', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    {
        id: 'email',
        label: 'Email',
        align: 'left'
    },
    {
        id: 'message',
        label: 'Message',
        align: 'left'
    },
    {
        id: 'date',
        label: 'Date',
        align: 'left'
    },
    {
        id: 'status',
        label: 'status',
        align: 'center'
    }
];

const CustomerPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = customersdata;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const countNewStatus = rows.filter((row) => row.status === 'new').length;
    const countAnsweredStatus = rows.filter((row) => row.status === 'answered').length;

    const [selectedRow, setSelectedRow] = useState(null);
    return (
        <Grid container>
            <Grid item md={8}>
                <div>
                    <Typography variant="h2" m={4} mt={2} ml={0}>
                        {' '}
                        Customer Support
                    </Typography>
                    <CustomerTable
                        columns={columns}
                        rows={rows}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        setSelectedRow={setSelectedRow}
                    />
                </div>
            </Grid>
            <Grid item md={4} mt={7} p={3}>
                <Grid>
                    <Paper
                        sx={{
                            width: '100%',
                            height: '50px',
                            marginBottom: '5px',
                            background: 'white',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: '15px',
                            paddingRight: '10px'
                        }}
                    >
                        <FormatQuoteIcon
                            sx={{
                                fontSize: 35,
                                color: '#FD4016',
                                borderRadius: '50%',
                                padding: '5px',
                                background: '#FFE4E4',
                                transform: 'rotate(180deg)'
                            }}
                        />
                        <Typography variant="h4"> New Queries </Typography>
                        <Typography variant="h4" pl={5}>
                            {' '}
                            {countNewStatus}{' '}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ height: '15px', color: 'gray' }} />
                    </Paper>
                    <Paper
                        sx={{
                            width: '100%',
                            height: '50px',
                            background: 'white',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: '15px',
                            paddingRight: '10px'
                        }}
                    >
                        <FormatQuoteIcon
                            sx={{
                                fontSize: 35,
                                color: '#009C10',
                                borderRadius: '50%',
                                padding: '5px',
                                background: '#BFFFC6',
                                transform: 'rotate(180deg)'
                            }}
                        />
                        <Typography variant="h4"> Answered </Typography>
                        <Typography variant="h4" pl={7}>
                            {' '}
                            {countAnsweredStatus}{' '}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ height: '15px', color: 'gray' }} />
                    </Paper>
                    <CustomerModal selectedRow={selectedRow} onClose={() => setSelectedRow(null)} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerPage;

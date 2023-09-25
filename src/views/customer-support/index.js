// CustomerPage.js
import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { SupportColumns } from 'tables/columns/customer_support';
import Connections from 'api';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CustomerModal from 'ui-component/customer-support/customerModal';

const CustomerPage = () => {
    const theme = useTheme();

    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [rowCountState, setRowCountState] = useState(lastPage);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
        pageCount: 10,
        pageStartIndex: 0,
        pageEndIndex: 0
    });

    const countNewStatus = data.filter((row) => row.status === 0).length;
    const countAnsweredStatus = data.filter((row) => row.status === 1).length;

    const [selectedRow, setSelectedRow] = useState(null);

    const GetQueries = () => {
        var Api = Connections.api + Connections.queries + `?page=${paginationModel.page}&limit=${paginationModel.pageSize}`;
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
                    setData(response.data.data);
                    setLastPage(response.data.last_page);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        GetQueries();
        return () => {};
    }, []);

    return (
        <Grid container>
            <Grid item md={8}>
                <Typography variant="h3" m={4} mt={2} ml={0}>
                    {' '}
                    Customer Support
                </Typography>

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
                    <Grid item>
                        <DataGrid
                            autoHeight
                            autoWidth
                            columns={SupportColumns}
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
                            onRowClick={(params) => setSelectedRow({ ...params.row })}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4} mt={7} p={3} pt={2}>
                <Grid>
                    <Paper
                        sx={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: 1,
                            background: theme.palette.background.default,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: 2,
                            paddingRight: 3,
                            paddingY: 2
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormatQuoteIcon
                                sx={{
                                    fontSize: 35,
                                    color: theme.palette.error.dark,
                                    borderRadius: '50%',
                                    padding: '5px',
                                    background: '#FFE4E4',
                                    transform: 'rotate(180deg)',
                                    marginRight: 2
                                }}
                            />
                            <Typography variant="subtitle1"> New Queries </Typography>
                        </Box>

                        <Typography variant="h5" pl={5}>
                            {countNewStatus}
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: 1,
                            background: theme.palette.background.default,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: 2,
                            paddingRight: 3,
                            paddingY: 2
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormatQuoteIcon
                                sx={{
                                    fontSize: 35,
                                    color: '#009C10',
                                    borderRadius: '50%',
                                    padding: '5px',
                                    background: '#BFFFC6',
                                    transform: 'rotate(180deg)',
                                    marginRight: 2
                                }}
                            />
                            <Typography variant="subtitle1"> Answered </Typography>
                        </Box>
                        <Typography variant="h5" pl={7}>
                            {countAnsweredStatus}
                        </Typography>
                    </Paper>
                    <CustomerModal selectedRow={selectedRow} onClose={() => setSelectedRow(null)} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerPage;

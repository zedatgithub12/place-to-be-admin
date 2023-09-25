import { Grid, Typography, useTheme, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from 'tables/columns/users';
import Connections from 'api';
import { useNavigate } from 'react-router';

const Audience = () => {
    const theme = useTheme();
    const navigate = useNavigate();

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

    const GoBack = () => {
        navigate(-1);
    };

    const GetUsers = () => {
        var Api = Connections.api + Connections.users + `?page=${paginationModel.page}&limit=${paginationModel.pageSize}`;
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
        GetUsers();
        return () => {};
    }, [paginationModel]);

    useEffect(() => {
        setRowCountState((prevRowCountState) =>
            paginationModel.pageSize !== undefined ? paginationModel.pageSize * lastPage : prevRowCountState
        );
    }, [paginationModel.pageSize, setRowCountState]);

    return (
        <>
            <Grid container style={{ paddingTop: '1 rem' }}>
                <Grid container>
                    <Grid style={{ paddingLeft: '0.5rem', paddingBottom: '0.5rem' }} item xs={6}>
                        <Typography variant="h3">Event Audience</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                        <Button variant="text" onClick={() => GoBack()}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
                {/* Data grid component */}

                <Grid container sx={{ bgcolor: theme.palette.background.default, borderRadius: 4 }}>
                    <DataGrid
                        autoHeight
                        rows={data}
                        columns={columns}
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
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Audience;

import { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Connections from 'api';
import { useNavigate } from 'react-router';
import { Adcolumns } from 'tables/columns/ads';

const AdsPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [lastPage] = useState(1);
    const [rowCountState] = useState(lastPage);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
        pageCount: 10,
        pageStartIndex: 0,
        pageEndIndex: 0
    });

    useEffect(() => {
        const handelFetchAds = () => {
            var APIUrl = Connections.api + Connections.ads;
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(APIUrl, {
                method: 'GET',
                headers: headers
            })
                .then((Response) => Response.json())
                .then((Response) => {
                    if (Response.success) {
                        setRows(Response.data);
                    } else {
                        console.log(Response.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        handelFetchAds();
        return () => {};
    }, []);

    return (
        <Grid p={1}>
            <Grid container sx={{ marginX: 1, paddingX: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3"> Ads Management </Typography>
                <Link to="/create-ads" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="warning">
                        <AddIcon />
                        Create Ads
                    </Button>
                </Link>
            </Grid>

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
                <DataGrid
                    autoHeight
                    autoWidth
                    columns={Adcolumns}
                    rows={rows}
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
                    onRowClick={(params) => navigate('/ads-detail', { state: { ...params.row } })}
                />
            </Grid>
        </Grid>
    );
};

export default AdsPage;

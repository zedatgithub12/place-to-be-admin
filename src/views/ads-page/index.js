import React from 'react';
import { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { IconSearch } from '@tabler/icons';
import EastIcon from '@mui/icons-material/Start';
import { OutlinedInput, InputAdornment, ButtonBase, Button, Typography, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from 'data/datatable';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Connections from 'api';

const AdsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [filterActive, setFilterActive] = useState('Status');
    const [filterFormat, setFilterFormat] = useState('Format');
    const [filterOwner, setFilterOwner] = useState('Owner');

    const [rows, setRows] = useState([]);

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleFilterActiveChange = (event) => {
        setFilterActive(event.target.value);
    };
    const handleFilterFormatChange = (event) => {
        setFilterFormat(event.target.value);
    };
    const handleFilterOwnerChange = (event) => {
        setFilterOwner(event.target.value);
    };
    const pageSize = rows.length;
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        Ads Management
                    </Typography>
                    <KeyboardArrowRightIcon style={{ fontSize: 20, marginLeft: '10px', marginRight: '10px' }} />
                    <Typography variant="body1">Campaigns</Typography>
                </div>
                <div>
                    <Link to="/create-ads" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            <AddIcon />
                            Create Ads
                        </Button>
                    </Link>
                </div>
            </div>
            <div style={{ marginTop: 30 }}>
                <OutlinedInput
                    id="input-search-header"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    placeholder="Search"
                    style={{ width: '300px', height: '45px' }}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{}}>
                                <EastIcon stroke={1.5} size="1rem" />
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                        style: {
                            backgroundColor: 'transparent',
                            height: '100%',
                            padding: '0'
                        }
                    }}
                />
                <Select
                    value={filterActive}
                    onChange={handleFilterActiveChange}
                    variant="outlined"
                    style={{ marginLeft: 10, fontSize: 14, height: 50, backgroundColor: 'transparent', borderRadius: 0 }}
                >
                    <MenuItem value="Status" disabled>
                        Status
                    </MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Expired">Expired</MenuItem>
                </Select>

                <Select
                    value={filterFormat}
                    onChange={handleFilterFormatChange}
                    variant="outlined"
                    style={{ marginLeft: 10, fontSize: 14, height: 50, backgroundColor: 'transparent', borderRadius: 0 }}
                >
                    <MenuItem value="Format" disabled>
                        Format
                    </MenuItem>
                    <MenuItem value="Pop-Up">Pop-Up</MenuItem>
                    <MenuItem value="Inline">Inline</MenuItem>
                    <MenuItem value="Notification">Notification</MenuItem>
                    <MenuItem value="Drop-Up">Drop-Up</MenuItem>
                </Select>

                <Select
                    value={filterOwner}
                    onChange={handleFilterOwnerChange}
                    variant="outlined"
                    style={{ marginLeft: 10, fontSize: 14, height: 50, backgroundColor: 'transparent', borderRadius: 0 }}
                >
                    <MenuItem value="Owner" disabled>
                        Owner
                    </MenuItem>
                    <MenuItem value="BGI">BGI</MenuItem>
                    <MenuItem value="Heniken">Heniken</MenuItem>
                </Select>
            </div>

            <Grid container direction="row" spacing={4}>
                <Grid item xs={12} md={12} sm={12} lg={12} style={{ display: 'flex' }}>
                    <div style={{ marginTop: 35, background: 'white', cursor: 'pointer', overflow: 'auto' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            autoHeight
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 }
                                }
                            }}
                            pageSizeOptions={[5, 10, 15]}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default AdsPage;

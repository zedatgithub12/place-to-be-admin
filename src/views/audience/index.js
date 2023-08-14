import {
    Grid,
    Typography,
    Select,
    InputLabel,
    FormControl,
    Divider,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    IconButton,
    TableContainer
} from '@mui/material';

import { Stack, minWidth } from '@mui/system';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AudienceData from 'data/eventAudience';
import AudienceDetail from './audienceDetail';
import { useEffect, useState } from 'react';
const Audience = () => {
    const tableHead = ['Id', 'Name', 'Email', 'Age', 'Address', 'Action'];
    const addressData = ['22, Bole, Addis Abeba', '22, Jemo, Addis Abeba'];
    const ageData = ['25', '30', '20'];
    const [anchorEl, setAnchorEl] = useState(null);
    const [detail, setDetail] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [ageQuery, setAgeQuery] = useState('age');
    const [addressQuery, setAddressQuery] = useState('address');
    const [fileId, setFileId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(AudienceData);
    const [filtered, setFiltered] = useState(AudienceData);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const nextPage = () => {
        if (currentPage < pageCount) {
            setCurrentPage((prevPage) => currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => currentPage - 1);
        }
    };
    const handleDetails = (id) => {
        setFileId(id);
        setDetail(true);
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if (searchQuery == '') {
            setFiltered(AudienceData);
        }
    }, [searchQuery]);

    const filData = AudienceData.filter((item) => {
        let isMatch = true;
        if (searchQuery.toLocaleLowerCase()) {
            const searchRegex = new RegExp(searchQuery, 'i');
            isMatch = isMatch && searchRegex.test(item.name);
        }
        if (ageQuery !== 'age') {
            isMatch = isMatch && item.age == ageQuery;
        }
        if (addressQuery !== 'address') {
            isMatch = isMatch && item.address == addressQuery;
        }
        return isMatch;
    });

    return (
        <>
            <Grid container style={{ paddingTop: '1 rem' }}>
                <Grid container>
                    <Grid style={{ paddingLeft: '0.5rem', paddingBottom: '0.5rem' }} item xs={6}>
                        {detail == false ? (
                            <Typography variant="h2">Event Audience</Typography>
                        ) : (
                            <Typography variant="h2">User Detail</Typography>
                        )}
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                        {detail == false ? (
                            <button
                                style={{
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    color: '#fff',
                                    background: '#0075FF',
                                    border: 'none',
                                    borderRadius: '4px',
                                    width: '8.3rem',
                                    height: '2.4rem',
                                    textSize: '14px',
                                    fontWeight: '600',
                                    lineHeight: '16.41px'
                                }}
                            >
                                <AddIcon style={{ marginBottom: '-0.3rem' }} /> Add User
                            </button>
                        ) : (
                            <button
                                onClick={() => setDetail(false)}
                                style={{
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    color: '#0075FF',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Back
                            </button>
                        )}
                    </Grid>
                </Grid>
                {!detail && (
                    <Grid item xs={12} style={{ marginTop: '2rem', overflowX: 'hidden', borderRadius: '8px' }}>
                        <Grid
                            container
                            spacing={{ xs: 2, sm: 1 }}
                            style={{ background: '#ffbb00' }}
                            pt={{ xs: 5, lg: 3 }}
                            pb={{ xs: 0, sm: 1.5 }}
                            pl={{ xs: 3, sm: 2 }}
                            pr={{ xs: 3, sm: 0 }}
                            sx={{ alignItems: 'center' }}
                        >
                            <Grid item xs={12} sm={7} lg={3.5}>
                                <TextField
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none' // Remove the outline or border
                                            },
                                            borderRadius: '40px'
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <ArrowForwardIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} lg={1} mt={{ xs: 0.5, sm: 0 }}>
                                <select
                                    onChange={(e) => setAgeQuery(e.target.value)}
                                    style={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        width: '100%',
                                        height: '2.7rem',
                                        padding: '0.5rem',
                                        appearance: 'none',
                                        paddingRight: '2rem',
                                        paddingLeft: '1rem',
                                        backgroundPosition: 'right 1rem center', // Adjust the value to add space between the caret and right border
                                        backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"%3E%3Cpath d="M7 10l5 5 5-5z" /%3E%3C/svg%3E')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '18px'
                                    }}
                                >
                                    <option value="age">Age</option>
                                    {ageData.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={1.5} mt={{ xs: 0.5, sm: 0 }}>
                                <select
                                    onChange={(e) => setAddressQuery(e.target.value)}
                                    style={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        width: '100%',
                                        height: '2.7rem',
                                        padding: '0.5rem',
                                        appearance: 'none',
                                        paddingRight: '2rem',
                                        paddingLeft: '1rem',
                                        backgroundPosition: 'right 1rem center', // Adjust the value to add space between the caret and right border
                                        backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"%3E%3Cpath d="M7 10l5 5 5-5z" /%3E%3C/svg%3E')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '18px'
                                    }}
                                >
                                    <option value="address">Address</option>
                                    {addressData.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Grid>

                            <Grid item xs={12} lg={6} style={{ textAlign: 'right', paddingRight: '1rem' }}>
                                <p style={{ fontWeight: '600', fontSize: '18px' }}>{AudienceData.length} users</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} pl={{ xs: 0, sm: '2rem' }} style={{ background: 'white' }}>
                            <TableContainer>
                                <table
                                    border="0"
                                    style={{
                                        width: '100%',
                                        borderRadius: '0',
                                        border: '0',
                                        borderCollapse: 'collapse',
                                        minWidth: '650px'
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            {tableHead.map((item) => {
                                                return (
                                                    <th
                                                        key={item}
                                                        style={{
                                                            textAlign: 'left',

                                                            borderBottom: '2px solid silver'
                                                        }}
                                                    >
                                                        <p style={{ fontWeight: '500', fontSize: '1rem' }}>{item}</p>
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>

                                    {filData.map((data) => (
                                        <tr
                                            key={data.id}
                                            style={{ cursor: 'pointer', height: '2rem', borderBottom: '1px solid silver' }}
                                            /* onClick={() => handleDetails(data.id)} */
                                        >
                                            <td>
                                                <p style={{ fontWeight: '400', fontSize: '14px' }}>{data.id}</p>
                                            </td>
                                            <td>
                                                <p style={{ fontWeight: '500', fontSize: '14px' }}>{data.name}</p>
                                            </td>
                                            <td>
                                                <p style={{ fontWeight: '500', fontSize: '14px' }}>{data.email}</p>
                                            </td>
                                            <td>
                                                <p style={{ fontWeight: '500', fontSize: '16px' }}>{data.age}</p>
                                            </td>
                                            <td>
                                                <p style={{ fontWeight: '500', fontSize: '1rem' }}>{data.address}</p>
                                            </td>
                                            <td>
                                                <div>
                                                    <IconButton aria-controls="dropdown-menu" aria-haspopup="true" onClick={handleMenuOpen}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="dropdown-menu"
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                        PaperProps={{
                                                            elevation: 1 // Remove box shadow
                                                            /* component: Paper // Use Paper component for styling */
                                                        }}
                                                        style={{ border: '1px solid #ffbb00' }}
                                                    >
                                                        <MenuItem
                                                            onClick={() => {
                                                                handleDetails(data.id);
                                                                handleMenuClose();
                                                            }}
                                                        >
                                                            View
                                                        </MenuItem>
                                                        <MenuItem onClick={handleMenuClose}>Update</MenuItem>
                                                        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                                                        <MenuItem onClick={handleMenuClose}>Suspend</MenuItem>
                                                    </Menu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tbody>
                                        <tr>
                                            <td colSpan={6} style={{ justifyContent: 'right' }}>
                                                <Stack spacing={2} style={{ justifyContent: 'right' }} pr={1} direction="row">
                                                    <p>Rows Per Page</p>
                                                    <select
                                                        value={itemsPerPage}
                                                        onChange={(e) => setItemsPerPage(e.target.value)}
                                                        style={{ cursor: 'pointer', border: 'none' }}
                                                    >
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                    <p></p>
                                                    <Stack direction="row" pt={2} spacing={1}>
                                                        <Typography>1 - {pageCount}</Typography>
                                                        <ArrowBackIosIcon
                                                            onClick={() => prevPage()}
                                                            sx={{ fontSize: '1rem' }}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <ArrowForwardIosIcon
                                                            onClick={() => nextPage()}
                                                            sx={{ fontSize: '1rem' }}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>{' '}
                            </TableContainer>
                        </Grid>
                    </Grid>
                )}
            </Grid>

            {detail && <AudienceDetail id={fileId} />}
        </>
    );
};

export default Audience;

import React, { useState } from 'react';
import { Grid, Typography, Button, Divider, FormControl, InputLabel, MenuItem, Select, IconButton, InputBase, Paper } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import TabsComponent from 'ui-component/tickets/tabscomponent';
import TabsComponent2 from 'ui-component/tickets/tabsComponent2';
import tabData from 'data/ticket';

const Tickets = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState('');
    const [filteredData, setFilteredData] = useState(tabData);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterData(event.target.value, type);
    };

    const handleChanges = (event) => {
        setType(event.target.value);
        filterData(searchQuery, event.target.value);
    };

    const filterData = (search, selectedType) => {
        if (selectedType === 'All') setFilteredData(tabData);
        else {
            const filtered = tabData.filter((item) => {
                const matchesSearch = item.event_name.toLowerCase().includes(search.toLowerCase());
                const matchesType = selectedType === '' || item.tickettype.toLowerCase() === selectedType.toLowerCase();
                return matchesSearch && matchesType;
            });
            setFilteredData(filtered);
        }
    };

    return (
        <Grid container p={1}>
            <Grid item md={12} container justifyContent="space-between" alignItems="center">
                <Typography variant="h2"> Tickets </Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    {' '}
                    Add Ticket
                </Button>
            </Grid>
            <Grid md={12} p={1}>
                <Divider />
            </Grid>

            <Grid item container md={12} p={3} pl={0} pb={3}>
                <Grid item md={5}>
                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'inherit' }}>
                        <IconButton sx={{ p: '10px' }} aria-label="search">
                            <IconSearch />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search.."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="black" sx={{ p: '10px' }} aria-label="search">
                            <ArrowForwardIcon />
                        </IconButton>
                    </Paper>
                </Grid>

                <Grid md={1.5} item pl={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={handleChanges}
                            sx={{ background: 'white' }}
                        >
                            <MenuItem value="All"> All</MenuItem>
                            <MenuItem value="regular">Regular</MenuItem>
                            <MenuItem value="vip">VIP</MenuItem>
                            <MenuItem value="vipp">VIP+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item md={7.3}>
                    <TabsComponent data={filteredData} searchQuery={searchQuery} />
                </Grid>
                <Grid item md={4.5}>
                    <TabsComponent2 data={filteredData} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Tickets;

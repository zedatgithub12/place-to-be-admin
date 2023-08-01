// material-ui
import {
    Typography,
    Grid,
    Paper,
    IconButton,
    InputBase,
    Divider,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Box,
    Badge,
    Tabs,
    Tab
} from '@mui/material';
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    NativeSelect,
    TableFooter
} from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material';

const MyEvents = ({ events }) => {
    const theme = useTheme();
    const filteredEvents = events;
    const [tabValue, setTabValue] = useState('one');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Grid container>
            <Box sx={{ width: '100%' }}>
                <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
                    <Tab value="one" label="Featured" />
                    <Tab value="two" label="Declined" />
                </Tabs>
            </Box>

            <Grid item display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ height: '80%' }}>
                <Grid item className="event-table">
                    <TableContainer fullWidth component={Paper}>
                        <TableHead fullWidth>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell align="right">Added Date</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvents.map((event) => (
                                <TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {event.name}
                                    </TableCell>
                                    <TableCell align="right">{event.createdDate}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ minWidth: 100 }}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel fontSize={theme.typography.button}>Preview</InputLabel>
                                                <Select
                                                    sx={{ height: '32px', backgroundColor: '#0065DB' }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Age"
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MyEvents;

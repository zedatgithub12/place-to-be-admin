import { useEffect, useState } from 'react';

// material-ui
import { Grid, Box, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { P2bCard } from 'ui-component/cards/P2bCard';
import { AdsInfo, EventsInfo, TicketInfo, supportInfo } from 'data/dashboard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h3">Admin Dashboard</Typography>

                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 4 }}>
                    <Grid item xs={12} sm={5.8} md={3.9} lg={2.9} xl={2.9} mt={1}>
                        <P2bCard title="Events">
                            {EventsInfo.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingY: 1.6
                                    }}
                                >
                                    <Typography>{item.name}</Typography>
                                    <Typography>{item.value}</Typography>
                                </Box>
                            ))}
                        </P2bCard>
                    </Grid>

                    <Grid item xs={12} sm={5.8} md={3.9} lg={2.9} xl={2.9} mt={1}>
                        <P2bCard title="Tickets">
                            {TicketInfo.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingY: 1.6
                                    }}
                                >
                                    <Typography>{item.name}</Typography>
                                    <Typography>{item.value}</Typography>
                                </Box>
                            ))}
                        </P2bCard>
                    </Grid>

                    <Grid item xs={12} sm={5.8} md={3.9} lg={2.9} xl={2.9} mt={1}>
                        <P2bCard title="Ads">
                            {AdsInfo.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingY: 1.6
                                    }}
                                >
                                    <Typography>{item.name}</Typography>
                                    <Typography>{item.value}</Typography>
                                </Box>
                            ))}
                        </P2bCard>
                    </Grid>

                    <Grid item xs={12} sm={5.8} md={3.9} lg={2.9} xl={2.9} mt={1}>
                        <P2bCard title="Customer Support">
                            {supportInfo.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingY: 1.6
                                    }}
                                >
                                    <Typography>{item.name}</Typography>
                                    <Typography>{item.value}</Typography>
                                </Box>
                            ))}
                        </P2bCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;

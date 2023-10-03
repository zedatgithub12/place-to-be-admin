import { useEffect, useState } from 'react';

import { Grid, Box, Typography } from '@mui/material';
import Connections from 'api';
import { P2bCard } from 'ui-component/cards/P2bCard';
import { useNavigate } from 'react-router';

const DashboardDefault = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [data, setData] = useState({
        event: [],
        ticket: [],
        ad: [],
        support: []
    });

    useEffect(() => {
        const handleGettingData = () => {
            var Api = Connections.api + Connections.admincards;
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, {
                method: 'GET',
                headers: headers
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setData({
                            ...data,
                            event: response.event,
                            ticket: response.ticket,
                            ad: response.ad,
                            support: response.support
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        };
        handleGettingData();
        return () => {};
    }, []);
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h3">Dashboard</Typography>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-between', paddingY: 3 }}>
                <Grid item xs={12} sm={7.9} md={5.9} lg={2.9} xl={2.9} marginTop={1}>
                    <P2bCard title="Events" color="#b56700" onPress={() => navigate('/events')}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Featured</Typography>
                            <Typography>{data.event.featured}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Happening</Typography>
                            <Typography>{data.event.happening}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>This Week</Typography>
                            <Typography>{data.event.thisweek}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Upcoming</Typography>
                            <Typography>{data.event.upcoming}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Pending</Typography>
                            <Typography>{data.event.pending}</Typography>
                        </Box>
                    </P2bCard>
                </Grid>

                <Grid item xs={12} sm={7.9} md={5.9} lg={2.9} xl={2.9} marginTop={1}>
                    <P2bCard title="Tickets" color="#7b00ed" onPress={() => navigate('/tickets')}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Active</Typography>
                            <Typography>{data.ticket.active}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Pending</Typography>
                            <Typography>{data.ticket.pending}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Soldout</Typography>
                            <Typography>{data.ticket.soldout}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Cancelled</Typography>
                            <Typography>{data.ticket.cancelled}</Typography>
                        </Box>
                    </P2bCard>
                </Grid>

                <Grid item xs={12} sm={7.9} md={5.9} lg={2.9} xl={2.9} marginTop={1}>
                    <P2bCard title="Ads" color="#00a2ff" onPress={() => navigate('/ads')}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Active</Typography>
                            <Typography>{data.ad.active}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Paused</Typography>
                            <Typography>{data.ad.paused}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Pending</Typography>
                            <Typography>{data.ad.pending}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Drafted</Typography>
                            <Typography>{data.ad.drafted}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Cancelled</Typography>
                            <Typography>{data.ad.cancelled}</Typography>
                        </Box>
                    </P2bCard>
                </Grid>

                <Grid item xs={12} sm={7.9} md={5.9} lg={2.9} xl={2.9} marginTop={1}>
                    <P2bCard title="Events" color="#00b530" onPress={() => navigate('/customer-support')}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>New</Typography>
                            <Typography>{data.support.new}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1.4 }}>
                            <Typography>Answered</Typography>
                            <Typography>{data.support.answered}</Typography>
                        </Box>
                    </P2bCard>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;

import { Grid, Card, CardHeader, CardContent, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material';

const TicketCard = ({ ticket }) => {
    const theme = useTheme();
    return (
        <>
            <Card sx={{ marginBottom: 1 }}>
                <CardHeader sx={{ padding: 2 }} title={<Typography variant="h4">Buyer Detail</Typography>} />
                <Divider sx={{ width: '100%' }} />
                <CardContent>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Full name</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.username}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Phone</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.phone}</Typography>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    sx={{ padding: 2 }}
                    title={
                        <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4">Ticket Detail</Typography>
                            <Grid display={'flex'}>
                                <Typography>Status </Typography>
                                <Typography sx={{ ml: 2, color: '#0075FF' }}>{ticket.status}</Typography>
                            </Grid>
                        </Grid>
                    }
                />
                <Divider sx={{ width: '100%' }} />
                <CardContent>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Event name</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.event_name}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Ticket Type</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.tickettype}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Quantity</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.quantity}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Date</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.date}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Time</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.time}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Paymeny Gateway</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.p_gateway}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Transaction ID</Typography>
                        <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.transactionId}</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default TicketCard;

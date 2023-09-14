import { Grid, Typography, Card } from '@mui/material';
import { Stack } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import profileImage from 'assets/images/profile.svg';
import AudienceData from 'data/eventAudience';

const AudienceDetail = (props) => {
    const foundData = AudienceData.find((item) => item.id === props.id);
    return (
        <Grid container pl={{ xs: 0, sm: 5 }} style={{ paddingTop: '3rem' }}>
            <Grid xs={12} lg={8}>
                <Stack direction="row" style={{ background: 'white', marginBottom: '0.5rem', borderRadius: '8px', height: '100px' }}>
                    <img src={profileImage} alt="profile" style={{ width: '100px', height: '100px' }} />
                    <Grid item xs={10}>
                        <Stack spacing={1} style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}>
                            <Typography>user{foundData.id}</Typography>
                            <Typography variant="h2">{foundData.name}</Typography>
                            <Stack direction="row">
                                <EmailOutlinedIcon />
                                <p style={{ marginTop: '0.2rem', marginLeft: '0.5rem' }}>{foundData.email}</p>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Stack style={{ textAlign: 'right', height: '100px', paddingRight: '2rem', paddingTop: '0.5rem' }}>
                            <MoreVertIcon style={{ marginLeft: '90%' }} />
                            <Typography pt={{ xs: 2, sm: 1 }} style={{ marginTop: '45%' }}>
                                <DoneIcon
                                    sx={{
                                        fontSize: '1rem',
                                        background: 'green',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '0.1rem',
                                        marginBottom: '-0.2rem',
                                        marginRight: '0.3rem'
                                    }}
                                />
                                Active
                            </Typography>
                        </Stack>
                    </Grid>
                </Stack>
                <Card style={{ minHeight: '20rem', padding: '1rem' }}>hey</Card>
                <Grid container style={{ marginTop: '0.5rem' }}>
                    <Grid container style={{ background: 'white', paddingBottom: '1rem ', borderRadius: '8px' }}>
                        <Grid item xs={6}>
                            <p style={{ paddingLeft: '1rem' }}>Categories</p>
                        </Grid>
                        <Grid container style={{ padding: '0 8%' }} spacing={2}>
                            <Grid item xs={4} sm={3} mr={{ xs: 2 }}>
                                <button
                                    style={{
                                        background: '#ffbb00',
                                        padding: '0.5rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Entertainment
                                </button>
                            </Grid>
                            <Grid item xs={4} sm={3} mr={{ xs: 2 }}>
                                <button
                                    style={{
                                        background: '#ffbb00',
                                        padding: '0.5rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Entertainment
                                </button>
                            </Grid>
                            <Grid item xs={4} sm={3} mr={{ xs: 2 }}>
                                <button
                                    style={{
                                        background: '#ffbb00',
                                        padding: '0.5rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Entertainment
                                </button>
                            </Grid>
                            <Grid item xs={4} sm={3} mr={{ xs: 2 }}>
                                <button
                                    style={{
                                        background: '#ffbb00',
                                        padding: '0.5rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Entertainment
                                </button>
                            </Grid>
                            <Grid item xs={3}>
                                <button
                                    style={{
                                        background: '#ffbb00',
                                        padding: '0.5rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Entertainment
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} lg={4} mt={{ xs: 2, lg: 0 }}>
                <Grid item xs={12} lg={10} style={{ paddingTop: '1rem' }}>
                    <Stack pl={{ xs: 2, lg: 4 }}>
                        <Grid
                            container
                            style={{
                                background: 'white',
                                padding: '1rem 0rem 0.3rem 1rem',
                                marginBottom: '1.5rem',
                                borderRadius: '8px'
                            }}
                            spacing={2}
                        >
                            <Grid xs={1} lg={2}>
                                <ConfirmationNumberOutlinedIcon
                                    sx={{
                                        background: '#FFF7E2',
                                        color: '#FDB910',
                                        width: '2rem',
                                        height: '2rem',
                                        padding: '0.4rem',
                                        borderRadius: '50%'
                                    }}
                                />
                            </Grid>
                            <Grid xs={9} sm={10} lg={8}>
                                <Typography pl={{ xs: 1, sm: 0 }} style={{ marginTop: '0.4rem' }}>
                                    Bought Tickets
                                </Typography>
                            </Grid>
                            <Grid xs={1} lg={2}>
                                <Stack direction="row" style={{ textAlign: 'right' }}>
                                    <p style={{ marginTop: '0.2rem' }}>12</p>
                                    <ChevronRightOutlinedIcon />
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            style={{
                                background: 'white',
                                padding: '1rem 0rem 0.3rem 1rem',
                                marginBottom: '1.5rem',
                                borderRadius: '8px'
                            }}
                            spacing={2}
                        >
                            <Grid xs={1} lg={2}>
                                <FavoriteIcon
                                    sx={{
                                        background: '#FFE0E0',
                                        color: '#FF0000',
                                        width: '2rem',
                                        height: '2rem',
                                        padding: '0.4rem',
                                        borderRadius: '50%'
                                    }}
                                />
                            </Grid>
                            <Grid xs={9} sm={10} lg={8}>
                                <Typography pl={{ xs: 1, sm: 0 }} style={{ marginTop: '0.4rem' }}>
                                    Events Interested In
                                </Typography>
                            </Grid>
                            <Grid xs={1} lg={2}>
                                <Stack direction="row" style={{ textAlign: 'right' }}>
                                    <p style={{ marginTop: '0.2rem' }}>37</p>
                                    <ChevronRightOutlinedIcon />
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            style={{
                                background: 'white',
                                padding: '1rem 0rem 0.3rem 1rem',
                                marginBottom: '1.5rem',
                                borderRadius: '8px'
                            }}
                            spacing={2}
                        >
                            <Grid xs={1} lg={2}>
                                <DoneAllIcon
                                    sx={{
                                        background: '#D1FFD6',
                                        color: '#009C10',
                                        width: '2rem',
                                        height: '2rem',
                                        padding: '0.4rem',
                                        borderRadius: '50%'
                                    }}
                                />
                            </Grid>
                            <Grid xs={9} sm={10} lg={8}>
                                <Typography pl={{ xs: 1, sm: 0 }} style={{ marginTop: '0.4rem' }}>
                                    Following
                                </Typography>
                            </Grid>
                            <Grid xs={1} lg={2}>
                                <Stack direction="row" style={{ textAlign: 'right' }}>
                                    <p style={{ marginTop: '0.2rem' }}>98</p>
                                    <ChevronRightOutlinedIcon />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default AudienceDetail;

// material-ui
import { useEffect, useState } from 'react';
import {
    Grid,
    Box,
    Button,
    Typography,
    useTheme,
    IconButton,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import { IconBellRinging2, IconSend, IconX } from '@tabler/icons';
import Avatar from '@mui/material/Avatar';
import Connections from 'api';
import { NotificationList } from './components/List';
import { MoreVert } from '@mui/icons-material';
import { DateFormater } from 'utils/functions';
import { NotificationImportance, NotificationTypes } from 'data/notifications';

// ==============================|| NOTIFICATION PAGE ||============================== //

const Notifications = () => {
    const theme = useTheme();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeRecord, setActiveRecord] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [createNotification, setCreateNotification] = useState({
        type: 'alert',
        importance: 'medium',
        image: null,
        title: '',
        content: ''
    });

    var featuredImageUri = Connections.api + Connections.assets;

    const handleNotificaitonClick = (item) => {
        setActiveRecord(item);
    };

    const GetNotifications = () => {
        var Api = Connections.api + Connections.notification;
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
                    setData(response.data);
                    setActiveRecord(response.data[0]);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handlePushNotification = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        GetNotifications();
        return () => {};
    }, []);

    return (
        <Grid p={1}>
            <Grid container sx={{ marginX: 1, paddingX: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3"> Notifications </Typography>

                <Button variant="contained" color="warning" onClick={() => handleDialogOpen()}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            padding: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 16
                        }}
                    >
                        <IconSend size={16} />
                    </Box>
                    Send Notifications
                </Button>
            </Grid>

            <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginY: 3 }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={5}
                    lg={5}
                    xl={5}
                    sx={{ backgroundColor: theme.palette.background.default, borderRadius: 4, padding: 2, marginTop: 1 }}
                >
                    {data.map((notification) => (
                        <NotificationList
                            key={notification.id}
                            title={notification.notification_title}
                            content={notification.notification_content}
                            type={notification.notification_content_type}
                            date={notification.created_at}
                            handleClick={() => handleNotificaitonClick(notification)}
                            active={notification.id == activeRecord.id ? true : false}
                        >
                            {/* <IconButton>
                                <MoreVert fontSize="10" />
                            </IconButton> */}
                        </NotificationList>
                    ))}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6.8}
                    lg={6.8}
                    xl={6.8}
                    sx={{ backgroundColor: theme.palette.background.default, borderRadius: 4, padding: 2, marginTop: 1 }}
                >
                    {activeRecord && (
                        <Box paddingRight={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h4">{activeRecord.notification_title}</Typography>
                                <Box>
                                    <Typography variant="subtitle1" textTransform={'capitalize'}>
                                        {activeRecord.notification_content_type}
                                    </Typography>
                                    <Typography variant="subtitle2">{DateFormater(activeRecord.created_at)}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', marginTop: 2 }}>
                                <Box sx={{ width: 300, height: 300 }}>
                                    <CardMedia
                                        component="img"
                                        image={featuredImageUri + activeRecord.notification_image}
                                        alt="Notification Image"
                                        sx={{ width: 300, height: 300, aspectRatio: 1, resize: 'contain' }}
                                    />
                                </Box>

                                <Box sx={{ paddingLeft: 4 }}>
                                    <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.8 }}>
                                        {activeRecord.notification_content}
                                    </Typography>
                                    <Typography>{activeRecord.notification_importance}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <Box sx={{ minWidth: 600 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 0.2,
                            backgroundColor: theme.palette.primary.light
                        }}
                    >
                        <DialogTitle variant="h4">Create Notification</DialogTitle>

                        <IconButton onClick={handleDialogClose} sx={{ marginRight: 1 }}>
                            <IconX size={22} />
                        </IconButton>
                    </Box>

                    <form onSubmit={handlePushNotification}>
                        <DialogContent>
                            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                                    <FormControl sx={{ m: 1, marginLeft: { sm: 0 } }} fullWidth>
                                        <Select
                                            id="notification-types"
                                            value={createNotification.type}
                                            onChange={(event) => setCreateNotification({ ...createNotification, type: event.target.value })}
                                        >
                                            <MenuItem value={'alert'}>Alert</MenuItem>

                                            {/* {NotificationTypes.map((event) =>(
                                            <MenuItem key={organizer} value={organizer}>
                                                {organizer}
                                            </MenuItem>
                                        ))} */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <FormControl sx={{ m: 1, marginLeft: { sm: 0 } }} fullWidth>
                                        <Select
                                            id="notification importance"
                                            aria-label="Importance"
                                            value={createNotification.importance}
                                            onChange={(event) =>
                                                setCreateNotification({ ...createNotification, importance: event.target.value })
                                            }
                                        >
                                            {NotificationImportance.map((importance) => (
                                                <MenuItem key={importance.id} value={importance.value}>
                                                    {importance.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions sx={{ paddingRight: 4, paddingY: 2 }}>
                            <Button variant="text" color="dark" onClick={handleDialogClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                {spinner ? (
                                    <CircularProgress size={18} />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <IconSend size={16} /> <Typography sx={{ marginLeft: 2 }}>Send </Typography>
                                    </Box>
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </Grid>
    );
};

export default Notifications;

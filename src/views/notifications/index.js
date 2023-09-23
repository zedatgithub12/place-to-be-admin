// material-ui
import { useEffect, useState, forwardRef } from 'react';
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
    MenuItem,
    TextField,
    CircularProgress,
    Pagination
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IconPhotoUp, IconSend, IconX } from '@tabler/icons';
import Connections from 'api';
import { NotificationList } from './components/List';
import { DateFormater } from 'utils/functions';
import { NotificationImportance } from 'data/notifications';

// ==============================|| NOTIFICATION PAGE ||============================== //

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notifications = () => {
    const theme = useTheme();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeRecord, setActiveRecord] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [createNotification, setCreateNotification] = useState({
        type: 'alert',
        importance: 'medium',
        image: null,
        title: '',
        content: ''
    });

    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    var featuredImageUri = Connections.api + Connections.assets;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPopup({
            ...popup,
            status: false
        });
    };

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
                    setNumPages(Math.ceil(response.data.length / 10));
                    setActiveRecord(response.data[0]);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setCreateNotification({ ...createNotification, image: file });
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handlePushNotification = (event) => {
        event.preventDefault();
        setSpinner(true);

        var userInfo = sessionStorage.getItem('user');
        var user = JSON.parse(userInfo);

        var Api = Connections.api + Connections.sendAlert;

        const Data = new FormData();

        Data.append('senderid', user.id);
        Data.append('notification_content_type', createNotification.type);
        Data.append('notification_importance', createNotification.importance);
        Data.append('notification_image', createNotification.image);
        Data.append('notification_title', createNotification.title);
        Data.append('notification_content', createNotification.content);

        fetch(Api, {
            method: 'POST',
            body: Data
        })
            .then((repsonse) => repsonse.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });
                    setSpinner(false);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                    setSpinner(false);
                }
            })
            .catch((error) => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: error.message
                });
                setSpinner(false);
            });
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
                    {data.slice((page - 1) * 10, page * 10).map((notification) => (
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

                    <Box paddingX={2} marginRight={3} sx={{ display: 'flex', marginTop: 3 }}>
                        <Pagination count={numPages} page={page} onChange={handleChangePage} />
                    </Box>
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

                            <Grid container>
                                <Grid item xs={12} sm={12}>
                                    <Box
                                        sx={{
                                            padding: 2,
                                            cursor: 'pointer'
                                        }}
                                        component="label"
                                    >
                                        {selectedImage ? (
                                            <Box
                                                sx={{
                                                    width: 300,
                                                    borderWidth: 1,
                                                    borderRadius: 2,
                                                    padding: 1,
                                                    marginLeft: 1.6
                                                }}
                                                bgcolor={theme.palette.background.default}
                                                boxShadow={1}
                                                borderColor={theme.palette.primary.main}
                                            >
                                                <img src={selectedImage} alt="Preview" className="preview-image" />
                                                <Typography variant="body2" color="textSecondary">
                                                    Image uploaded
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: '96%',
                                                    borderWidth: 1,
                                                    borderRadius: 2,
                                                    padding: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginLeft: 1.6
                                                }}
                                                bgcolor={theme.palette.background.default}
                                                boxShadow={1}
                                                borderColor={theme.palette.primary.main}
                                            >
                                                <IconPhotoUp color={theme.palette.primary.main} size={26} />
                                                <Typography variant="h5" color="textSecondary" sx={{ marginTop: 2 }}>
                                                    Upload image
                                                </Typography>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    Drag and drop or click to browse files
                                                </Typography>
                                            </Box>
                                        )}
                                        <input
                                            type="file"
                                            id="image-upload"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12} sm={12} sx={{ marginX: 1 }}>
                                    <TextField
                                        fullWidth
                                        aria-label="Title"
                                        label="Title"
                                        required
                                        value={createNotification.title}
                                        onChange={(event) => setCreateNotification({ ...createNotification, title: event.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Content"
                                        required
                                        multiline
                                        rows={6}
                                        sx={{ marginTop: 2 }}
                                        value={createNotification.content}
                                        onChange={(event) => setCreateNotification({ ...createNotification, content: event.target.value })}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions sx={{ paddingRight: 4, paddingY: 2 }}>
                            <Button variant="text" color="dark" onClick={handleDialogClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ paddingX: 3, paddingY: 1 }}
                                disabled={spinner ? true : false}
                            >
                                {spinner ? (
                                    <CircularProgress size={18} color="inherit" />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-around'
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

            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default Notifications;

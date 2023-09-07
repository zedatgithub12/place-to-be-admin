import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default MiniPopUp = (status, severity, message) => {
    const [popup, setPopup] = useState({
        status: status ? true : false,
        severity: severity ? severity : 'info',
        message: message ? message : ''
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPopup({
            ...popup,
            status: false
        });
    };
    return (
        <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                {popup.message}
            </Alert>
        </Snackbar>
    );
};

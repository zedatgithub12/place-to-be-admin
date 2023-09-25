import { Grid, Typography, InputAdornment, TextField, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
const ChangePassword = () => {
    const password = '12345678';
    const [visibleOld, setVisibleOld] = useState(false);
    const [visibleNew, setVisibleNew] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMesage] = useState('');
    const handlePassword = (e) => {
        e.preventDefault();

        if (oldPassword == '') {
            setErrorMesage('Please Enter Old Password');
        } else if (newPassword == '') {
            setErrorMesage('Please Enter New Password');
        } else if (confirmPassword == '') {
            setErrorMesage('Please Confirm New Password');
        } else if (newPassword !== confirmPassword) {
            setErrorMesage('Password does not match');
        } else if (oldPassword !== password) {
            setErrorMesage('Old password incorrect');
        } else {
            setErrorMesage('Password Changed successfully');
        }
    };
    return (
        <>
            <Grid container pt={{ xs: 10 }} style={{ justifyContent: 'center' }}>
                <Grid
                    item
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    pt={5}
                    pb={5}
                    style={{ borderRadius: '20px', boxShadow: '0px 0px 20px 1px rgba(0,0,0,0.05)', background: '#fff', paddingLeft: '10%' }}
                >
                    <Typography pl={5} pb={5} variant="h1">
                        Change Password
                    </Typography>
                    <form onSubmit={handlePassword}>
                        <Stack spacing={2}>
                            <Typography pl={1}>Old Password</Typography>
                            <TextField
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="old password..."
                                type={visibleOld == true ? 'text' : 'password'}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none' // Remove the outline or border
                                        },
                                        borderRadius: '12',
                                        border:
                                            errorMessage == 'Please Enter Old Password' || errorMessage == 'Old password incorrect'
                                                ? '1px solid red'
                                                : '1px solid #ddd'
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                {visibleOld == true ? (
                                                    <VisibilityIcon sx={{ fontSize: '1.2rem' }} onClick={() => setVisibleOld(false)} />
                                                ) : (
                                                    <VisibilityOffIcon sx={{ fontSize: '1.2rem' }} onClick={() => setVisibleOld(true)} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                style={{ width: '80%', background: 'white' }}
                            />
                            <Typography pl={1}>New Password</Typography>

                            <TextField
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password..."
                                type={visibleNew == true ? 'text' : 'password'}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none' // Remove the outline or border
                                        },
                                        borderRadius: '12',
                                        border:
                                            errorMessage == 'Please Enter New Password' || errorMessage == 'Password does not match'
                                                ? '1px solid red'
                                                : '1px solid #ddd'
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                {visibleNew == true ? (
                                                    <VisibilityIcon sx={{ fontSize: '1.2rem' }} onClick={() => setVisibleNew(false)} />
                                                ) : (
                                                    <VisibilityOffIcon sx={{ fontSize: '1.2rem' }} onClick={() => setVisibleNew(true)} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                style={{ width: '80%' }}
                            />
                            <Typography pl={1}>Confirm Password</Typography>

                            <TextField
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password..."
                                type={visibleNew == true ? 'text' : 'password'}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none'
                                            // Remove the outline or border
                                        },
                                        borderRadius: '12',
                                        border:
                                            errorMessage == 'Please Confirm New Password' || errorMessage == 'Password does not match'
                                                ? '1px solid red'
                                                : '1px solid #ddd'
                                    }
                                }}
                                style={{ width: '80%' }}
                            />
                            {errorMessage && (
                                <Typography style={{ color: errorMessage == 'Password Changed successfully' ? 'green' : 'red' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <button
                                type="submit"
                                style={{
                                    width: '80%',
                                    marginTop: '3rem',
                                    background: '#ffbb00',
                                    borderRadius: '30px',
                                    border: 'none',
                                    padding: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Change Password
                            </button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default ChangePassword;

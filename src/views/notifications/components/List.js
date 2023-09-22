import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { IconBellRinging2 } from '@tabler/icons';
import React, { useState } from 'react';
import { DateFormater } from 'utils/functions';

export const NotificationList = ({ title, type, date, handleClick, children, active }) => {
    const theme = useTheme();

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginY: 2,
                backgroundColor: active ? theme.palette.warning.light : 'white',
                padding: '10px',
                borderRadius: 8,
                cursor: 'pointer',
                paddingRight: 3
            }}
        >
            <Avatar sx={{ backgroundColor: theme.palette.grey[100], marginRight: 3 }}>
                <IconBellRinging2 color={theme.palette.grey[600]} size={18} />
            </Avatar>
            <Box width="90%" sx={{ borderColor: theme.palette.grey[100] }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" style={{ lineHeight: '1.2rem', maxHeight: '2.4rem', overflow: 'hidden' }}>
                        {title}
                    </Typography>

                    <Box>{children}</Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" textTransform={'capitalize'}>
                        {type}
                    </Typography>
                    <Typography variant="subtitle2">{DateFormater(date)}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

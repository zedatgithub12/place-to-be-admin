import React from 'react';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { formatNumber } from 'utils/functions';

function DetailCard({ count, caption, children, background }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                margin: 2
            }}
        >
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4">{formatNumber(count)}</Typography>
                <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
                    {caption}
                </Typography>
            </Box>
            <Avatar size={80} sx={{ backgroundColor: background }}>
                {children}
            </Avatar>
        </Box>
    );
}

export default DetailCard;

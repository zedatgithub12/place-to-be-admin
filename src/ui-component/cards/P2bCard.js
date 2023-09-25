import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';

export const P2bCard = ({ title, children }) => {
    const theme = useTheme();
    return (
        <Box sx={{ backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 0.5 }}>
            <Typography sx={{ padding: 2 }} variant="h5">
                {title}
            </Typography>
            <Divider />

            <Box sx={{ padding: 2 }}>{children}</Box>
        </Box>
    );
};

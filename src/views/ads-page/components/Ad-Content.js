import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export const AdContent = ({ label, children }) => {
    const theme = useTheme();
    return (
        <Box sx={{ padding: 1 }}>
            <Typography variant="subtitle2">{label}</Typography>
            {children}
        </Box>
    );
};

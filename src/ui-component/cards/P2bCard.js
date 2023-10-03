import { Box, Divider, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

export const P2bCard = ({ title, color, onPress, children }) => {
    const theme = useTheme();
    var cardcolor = color ? color : '#d6f1ff';
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: isHovered ? '0px 0px 5px 2px rgba(8, 8, 8, 0.1)' : 'none',
                transition: 'box-shadow 0.3s ease'
            }}
            onClick={onPress}
        >
            <Box sx={{ backgroundColor: cardcolor, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
                <Typography sx={{ padding: 1.4, color: theme.palette.background.default }} variant="subtitle1">
                    {title}
                </Typography>
            </Box>

            <Box sx={{ padding: 2 }}>{children}</Box>
        </Box>
    );
};

import React from 'react';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';

export const DotMenu = ({ DotClick, anchorEl, handleMenuClose, children }) => {
    return (
        <Box>
            <IconButton aria-controls="row-menu" aria-haspopup="true" onClick={DotClick}>
                <MoreVert />
            </IconButton>
            <Menu id="row-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose} className="shadow-sm">
                {children}
            </Menu>
        </Box>
    );
};

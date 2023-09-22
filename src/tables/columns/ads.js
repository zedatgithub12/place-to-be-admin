import React from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdsStatuses } from 'utils/functions';

export const Adcolumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100
    },
    { field: 'ad_heading', headerName: 'Name', width: 200 },
    { field: 'ad_type', headerName: 'Type', width: 150 },
    { field: 'ad_budget', headerName: 'Budget', width: 150 },
    { field: 'ad_button_label', headerName: 'Link label', width: 150 },
    { field: 'ad_frequency', headerName: 'Frequency', width: 100 },
    { field: 'ad_start_date', headerName: 'Start date', width: 150 },
    { field: 'ad_end_date', headerName: 'End date', width: 200 },
    {
        field: 'ad_status',
        headerName: 'Status',
        renderCell: (params) => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: 10, backgroundColor: AdsStatuses(params.value), margin: 1 }} />

                <Typography>{params.value}</Typography>
            </Box>
        ),
        width: 160
    }
];

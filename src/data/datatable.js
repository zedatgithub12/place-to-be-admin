import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
        renderCell: (params) =>
            params.value === 'active' ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: 'green',
                            marginRight: 5
                        }}
                    />

                    {params.value}
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            marginRight: 5
                        }}
                    />
                    {params.value}
                </div>
            )
    },
    { field: 'ad_heading', headerName: 'Name', width: 200 },
    { field: 'ad_type', headerName: 'Type', width: 150 },
    { field: 'ad_budget', headerName: 'Budget', width: 150 },
    { field: 'ad_button_label', headerName: 'Link label', width: 150 },
    { field: 'ad_frequency', headerName: 'Frequency', width: 100 },
    { field: 'ad_start_date', headerName: 'Start date', width: 150 },
    { field: 'ad_end_date', headerName: 'End date', width: 200 },
    { field: 'Action', headerName: 'Action', renderCell: () => <ActionMenu /> }
];

const ActionMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <MoreVertIcon onClick={handleClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>View</MenuItem>
                <MenuItem onClick={handleClose}>Pause</MenuItem>
                <MenuItem onClick={handleClose}>Activate</MenuItem>
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
            </Menu>
        </>
    );
};
export const data = [
    { label: 'Addis Abeba', value: 100, color: '#FFBB00' },
    { label: 'Bahr dar', value: 200, color: '#997000' },
    { label: 'Adama', value: 200, color: '#659500' },
    { label: 'Other', value: 300, color: '#DEDEDE' }
];
export const data2 = [
    { label: '20-35', value: 400, color: '#FFBB00' },
    { label: '35-50', value: 200, color: '#997000' },
    { label: '50+', value: 200, color: '#DEDEDE' }
];
export const data3 = [
    { label: 'Male', value: 50, color: '#FFBB00' },
    { label: 'Female', value: 200, color: '#997000' },
    { label: 'Unidentified', value: 200, color: '#DEDEDE' }
];

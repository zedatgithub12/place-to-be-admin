import React, { useState, useEffect } from 'react';
import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';

const DateSelector = ({ initialDate, onSelectDate }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [rightArrow, setRightArrow] = useState(false);

    useEffect(() => {
        setSelectedDate(initialDate);
    }, [initialDate]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate);
        onSelectDate(selectedDate);
    };

    const generateDates = () => {
        const today = new Date();
        const dates = [];
        for (let date = new Date(initialDate); date <= today; date.setDate(date.getDate() + 1)) {
            const formattedDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
            dates.push(formattedDate);
        }
        return dates;
    };

    return (
        <Box
            sx={{
                position: 'relative',
                padding: 1,
                paddingX: 2,
                marginTop: 2,
                borderBottomWidth: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingY: 3,
                    padding: 1,
                    paddingLeft: 2,

                    width: 160,
                    height: 34,
                    borderRadius: 2,
                    backgroundColor: '#fff'
                }}
            >
                <Typography>{selectedDate} </Typography>{' '}
                {rightArrow ? (
                    <IconButton onClick={() => setRightArrow(!rightArrow)}>
                        <KeyboardArrowDownOutlined size={18} color="#808080" />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setRightArrow(!rightArrow)}>
                        <KeyboardArrowUpOutlined size={18} color="#808080" />
                    </IconButton>
                )}
            </Box>
            {rightArrow && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 45,
                        boxShadow: 1,

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingY: 3,
                        padding: 2,
                        width: 160,
                        height: 34,
                        maxHeight: 600,
                        overflow: 'auto',
                        borderRadius: 2,
                        backgroundColor: '#fff'
                    }}
                >
                    {generateDates().map((date) => (
                        <MenuItem key={date} value={date}>
                            {date}
                        </MenuItem>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default DateSelector;

// ReadMoreTypography.js

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const ReadMore = ({ text, maxLetters }) => {
    const [isTruncated, setIsTruncated] = useState(true);
    const [truncatedText, setTruncatedText] = useState('');

    useEffect(() => {
        if (isTruncated) {
            truncateText();
        } else {
            setTruncatedText(text);
        }
    }, [isTruncated, text]);

    const truncateText = () => {
        if (text.length > maxLetters) {
            let truncated = text.slice(0, maxLetters);
            const lastSpaceIndex = truncated.lastIndexOf(' ');
            truncated = truncated.slice(0, lastSpaceIndex) + '...';
            setTruncatedText(truncated);
        } else {
            setTruncatedText(text);
        }
    };

    const handleReadMoreToggle = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <>
            <Typography variant="body1" display={'inline'}>
                {truncatedText}
            </Typography>
            {text.length > maxLetters && (
                <Typography display={'inline'} variant="body1" style={{ cursor: 'pointer' }} onClick={handleReadMoreToggle}>
                    {isTruncated ? 'Read more' : ' Read less'}
                </Typography>
            )}
        </>
    );
};

export default ReadMore;

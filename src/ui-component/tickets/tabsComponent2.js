import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import TableComponent2 from './tableComponent2';

const TabsComponent2 = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    background: 'white',
                    color: 'black',
                    '&:focus': {
                        color: 'black',
                        borderBottom: 'none'
                    }
                }}
                TabIndicatorProps={{
                    style: {
                        background: 'white',
                        color: activeTab === 0 ? 'black' : 'black',
                        ...((activeTab === 0 || activeTab === 1) && {
                            backgroundColor: '#FFBB00',
                            borderRadius: '0px',
                            textColor: 'black',
                            borderBottom: 'none'
                        })
                    }
                }}
                variant="scrollable" // Set the variant to scrollable for smaller tabs
                scrollButtons="auto" // Show scroll buttons when needed
            >
                <Tab
                    sx={{
                        color: activeTab === 0 ? 'black' : 'black',
                        // Adjust font size for smaller tabs
                        ...(activeTab === 0 && {
                            backgroundColor: '#FFBB00'
                        })
                    }}
                    label="Pending"
                />
                <Tab
                    sx={{
                        color: activeTab === 1 ? 'black' : 'grey',
                        // Adjust font size for smaller tabs
                        ...(activeTab === 1 && {
                            backgroundColor: '#FFBB00'
                        })
                    }}
                    label="Declined"
                />
            </Tabs>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableComponent2 data={data} status={getStatusByTabIndex(activeTab)} />
                </Grid>
            </Grid>
        </div>
    );
};

const getStatusByTabIndex = (tabIndex) => {
    switch (tabIndex) {
        case 0:
            return 'pending';
        case 1:
            return 'declined';

        default:
            return 'pending';
    }
};

export default TabsComponent2;

import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TableComponent from './tableComponent';

const TabsComponent = ({ data, searchQuery }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                TabIndicatorProps={{
                    style: {
                        background: 'white',
                        color: activeTab === 0 ? 'black' : 'black',
                        ...((activeTab === 0 || activeTab === 1 || activeTab === 2) && {
                            backgroundColor: '#FFBB00',

                            textColor: 'black',
                            borderBottom: 'none'
                        })
                    }
                }}
                sx={{ background: 'white' }}
            >
                <Tab
                    label="Active"
                    sx={{
                        ...(activeTab === 0 && {
                            backgroundColor: '#FFBB00'
                        })
                    }}
                />
                <Tab
                    label="Sold Out"
                    sx={{
                        ...(activeTab === 1 && {
                            backgroundColor: '#FFBB00'
                        })
                    }}
                />
                <Tab
                    label="Cancelled"
                    sx={{
                        ...(activeTab === 2 && {
                            backgroundColor: '#FFBB00'
                        })
                    }}
                />
            </Tabs>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableComponent data={data} status={getStatusByTabIndex(activeTab)} searchQuery={searchQuery} />
                </Grid>
            </Grid>
        </div>
    );
};

const getStatusByTabIndex = (tabIndex) => {
    switch (tabIndex) {
        case 0:
            return 'active';
        case 1:
            return 'sold out';
        case 2:
            return 'cancelled';
        default:
            return 'active';
    }
};

export default TabsComponent;

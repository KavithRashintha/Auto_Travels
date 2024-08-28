import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import VehicleInformation from "../../pages/vehicleInformation";
import RentedInformation from "../../pages/rentedInformation";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function NavigationTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', paddingTop: '8px', paddingBottom: '16px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '26px', color: '#22a6b3', fontWeight: 550, marginLeft: '24px', paddingTop: '14px' }}>
                        Auto Travels
                    </span>
                </Box>
                <Box sx={{ flex: 2, textAlign: 'right' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: '10px',  // Set font size
                            },
                            '& .MuiTabs-flexContainer': {
                                justifyContent: 'flex-end', // Align tabs to the right
                            },
                        }}
                    >
                        <Tab label="Car Dashboard" {...a11yProps(0)} />
                        <Tab label="Rented Information" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <VehicleInformation />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <RentedInformation />
            </CustomTabPanel>
        </Box>
    );
}

export default NavigationTabs;

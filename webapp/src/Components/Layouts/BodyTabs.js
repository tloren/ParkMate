import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ForecasterBody, FinderBody } from "../Content"

const style = {
  background: 'linear-gradient(45deg, #6d6d6d 30%, #6d6d6d 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export default function BodyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" style={style}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Find" />
          <Tab label="Forecast" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FinderBody />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ForecasterBody />
      </TabPanel>
    </div>
  );
}
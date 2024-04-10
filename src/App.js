
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import ArchivesList from './components/archivesList';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RoleList from './components/RoleList';
//import { Archive } from '@mui/icons-material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


function App() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div>
        <Box sx={{ width: '100%' }}>
      <Tabs
        scrollButtons="auto"
        aria-label="disabled tabs example"
      >
        <Tab label="Add employee" href="/employeeForm" />
        <Tab label="Employee list" href="/employeeList" />
        <Tab label="Role management" href="/roles" />
        <Tab label="Restored employees" href="/archives" />
      </Tabs>
    </Box>
    <Routes>
          <Route path="/employeeForm" element={<EmployeeForm />} />
          <Route path="" element={<EmployeeList />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/archives" element={<ArchivesList />} />
        </Routes> 
        
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArchivesRow from './archivesRow';
import '../style/EmployeeList.css';

const ArchivesList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('https://localhost:7237/api/Employee/arcive')
      .then(response => setEmployees(response.data));
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const searchTermLower = searchText.toLowerCase();
    return employee.firstName.toLowerCase().includes(searchTermLower) ||
           employee.lastName.toLowerCase().includes(searchTermLower) 
  });

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const onRestore = id => {
    axios.delete(`https://localhost:7237/api/Employee/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.error('Error deleting employee:', error));
      console.log(employees)
  };

  return (
    <div className="employee-list-container">
      <h1 className="employee-list-header">Archives List</h1>
      <div className="employee-list-search">
        <input
          id="employee-search"
          placeholder="Search Employees"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <table className="employee-list-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID</th>
            <th>Start Work Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <ArchivesRow
              key={employee.id}
              employee={employee}
              onRestore={onRestore}
            />
          ))}
        </tbody>
      </table>
      <div className="employee-list-buttons">
      </div></div>
   
  );
};

export default ArchivesList;

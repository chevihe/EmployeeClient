import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeRow from './EmployeeRow';
import '../style/EmployeeList.css'; 
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [employeeEdit, setEmployeeEdit] = useState();

  useEffect(() => {
    axios.get('https://localhost:7237/api/Employee')
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

  const handleExportCSV = () => {
    const emploreList = [];
    emploreList.push('שם ,משפחה,תעודת זהות,תאריך תחילת העבודה');
    for (const employee of employees) {
      const row = [
        employee.firstName,
        employee.lastName,
        employee.tz,
        employee.startWorkDate
      ];
      emploreList.push(row.join(",")); 
    }
    const csvData = emploreList.join("\n"); 
    const filename = "employees.csv";
    const blob = new Blob([csvData], { type: "text/csv;charset=windows-1255" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href); 
  };
  
  const handleDelete = id => {
    axios.delete(`https://localhost:7237/api/Employee/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.error('Error deleting employee:', error));
      console.log(employees)
  };

  const handleUpdate = (employee) => {
    setEmployeeEdit({employee});
  };
  const Update = () => {
    setEmployeeEdit();
  };

  return (
    <div className="employee-list-container">
      {employeeEdit&&
      <EmployeeForm employeeEdit1={employeeEdit} Update={Update}></EmployeeForm>}
      {!employeeEdit&&<div>
      <h1 className="employee-list-header">Employee Management System</h1>
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
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
      <div className="employee-list-buttons">
        <button onClick={handleExportCSV}>Download  The List to Excel</button>
      </div></div>}
    </div>
  );
};

export default EmployeeList;

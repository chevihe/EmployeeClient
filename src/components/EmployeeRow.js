import React from 'react';
import '../style/EmployeeRow.css';

function EmployeeRow({ employee, onDelete, onUpdate }) {
  const handleDelete = () => {
    onDelete(employee.id);
    console.log("-----------------------------");
    console.log(employee);

  };

  const handleUpdate = () => {
    onUpdate(employee);
  };

  return (
    <tr key={employee.id}>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.tz}</td>
      <td>{employee.startWorkDate}</td>
      <td className="employee-row-buttons">
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        <button className="update-button" onClick={handleUpdate}>Update</button>
      </td>
    </tr>
  );
}

export default EmployeeRow;


import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { Restore } from '@mui/icons-material';

function ArchivesRow({ employee, onRestore }) {
  const handleRestore = () => {
    onRestore(employee.id);
  };

  return (
    <TableRow key={employee.id}>
      <TableCell>{employee.firstName}</TableCell>
      <TableCell>{employee.lastName}</TableCell>
      <TableCell>{employee.tz}</TableCell>
      <TableCell>{employee.startWorkDate}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleRestore}
          startIcon={<Restore />}
        >
          Restore
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ArchivesRow;

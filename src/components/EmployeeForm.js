import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import '../style/EmployeeForm.css';
import {onUpdate,onAdd} from'./service.js'

const schema = yup.object({
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
  Identity: yup.string().required(),
  StartJobDate: yup.date().required(),
  Gender: yup.number().notRequired(),
  BirthDate: yup.date().required(),
});

function EmployeeForm({employeeEdit1,Update}) {
  const [rolesA, setRoles] = useState([]);
  const navigate = useNavigate();
  const [employeeRoles, setEmployeeRoles] = useState([{ RoleId: 0, IsAdministrative: '', StartDate: Date.now }]); // New state for roles
  const { setValue } = useForm();
  const [ref, setRef] = useState();
  let gender=0;

  useEffect(() => {
    axios.get("https://localhost:7237/api/Role").then((response) =>
      setRoles(response.data)
    );
  }, []);

  useEffect(() => {
      if(employeeEdit1){
      setEmployeeRoles(employeeEdit1.employee.roles.map((role) => ({
        roleID: role.roleID,
        isManager: role.isManagement,
        startRoleDate: role.startRoleDate,
      })));
      
    }
    
  }, [employeeEdit1]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      EmployeeRoles: [], // Updated default values
    },
  });
  const handleChange = (dataGender) => {
    gender=dataGender;
  };

  const handleAddRole = () => {
    setEmployeeRoles([...employeeRoles, { roleID: 0, isManager: false, startRoleDate: "" }]);
  };
  const onSubmit = async (data, event) => {
   data.Gender=gender;
   if (employeeEdit1) {
    try {
      await onUpdate(employeeEdit1.employee.id, data, employeeRoles);
      Update(); 
    } catch (error) {
      console.error("Error updating employee:", error);
    }}

    else{
      try {
        await onAdd(data,employeeRoles,event);
     navigate(-1);
      }catch (error) {
        console.error("Error updating employee:", error);
      }
      }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <TextField {...register("FirstName")} defaultValue={employeeEdit1?employeeEdit1.employee.firstName:''} label="First Name" variant="outlined" fullWidth margin="normal" error={!!errors.FirstName} helperText={errors.FirstName?.message}  />
      <TextField {...register("LastName")} defaultValue={employeeEdit1?employeeEdit1.employee.lastName:''} label="Last Name" variant="outlined" fullWidth margin="normal" error={!!errors.LastName} helperText={errors.LastName?.message} />
      <TextField {...register("Identity")} defaultValue={employeeEdit1?employeeEdit1.employee.tz:''} label="Identity" variant="outlined" fullWidth margin="normal" error={!!errors.Identity} helperText={errors.Identity?.message} />
      <TextField {...register("StartJobDate")} defaultValue={dayjs(employeeEdit1?employeeEdit1.employee.startWorkDate:"").format('YYYY-MM-DD')} label="Start Job Date" type="date" variant="outlined" fullWidth margin="normal" error={!!errors.StartJobDate} helperText={errors.StartJobDate?.message} />
      <FormControl  margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup>
          <FormControlLabel value={1} onChange={handleChange(1)} control={<Radio />} label="Male" />
          <FormControlLabel value={2} onChange={handleChange(2)} control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <TextField {...register("BirthDate")} defaultValue={dayjs(employeeEdit1?employeeEdit1.employee.birthDate:"").format('YYYY-MM-DD')} label="Birth Date" type="date" variant="outlined" fullWidth margin="normal" error={!!errors.BirthDate} helperText={errors.BirthDate?.message} />

      <h2>Roles</h2>
      {employeeRoles.map((role, index) => (
        <div className="role-container" key={index}>
          <Select
           id="outlined-required"
            {...register(`EmployeeRoles[${index}].roleID`)}
            defaultValue={role.roleID ? role.roleID : 1} // Set default value for each role
            variant="outlined"
            fullWidth
            required
            label="Role"
          >
            {rolesA.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Is Manager</FormLabel>
            <RadioGroup  defaultValue={role.isManager?role.isManager:false} {...register(`EmployeeRoles[${index}].isManager`)}>
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <TextField {...register(`EmployeeRoles[${index}].startRoleDate`)} defaultValue={dayjs(role.startRoleDate).format('YYYY-MM-DD')} label="Start Date" type="date" variant="outlined" />
          <Button type="button" onClick={() => setEmployeeRoles(employeeRoles.filter((_, i) => i !== index))} variant="contained" color="error">
            Remove Role
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddRole} variant="contained" color="primary">
        Add Role
      </Button>

      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
}

export default EmployeeForm;
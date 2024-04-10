import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [editRole, setEditRole] = useState({ id: 0, name: "" });
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const response = await axios.get("https://localhost:7237/api/Role");
    setRoles(response.data);
  };

  const handleDeleteRole = async (roleId) => {
    await axios.delete(`https://localhost:7237/api/Role/${roleId}`);
    getRoles();
  };

  const handleEditRole = (role) => {
    setEditRole({ id: role.roleID, name: role.name });
  };

  const handleUpdateRole = async () => {
    await axios.put(`https://localhost:7237/api/Role/${editRole.id}`, { name: editRole.name });
    getRoles();
    setEditRole({ id: 0, name: "" });
  };

  const handleAddRole = async () => {
    await axios.post("https://localhost:7237/api/Role", { name: newRole });
    getRoles();
    setNewRole("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5">Manage Roles</Typography>
          <TextField
            label="New Role Name"
            variant="outlined"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{ margin: "10px 0" }}
          />
          <Button variant="contained" color="primary" onClick={handleAddRole} style={{ marginBottom: "10px" }}>
            Add Role
          </Button>
          <List>
            {roles.map((role) => (
              <ListItem key={role.roleID}>
                <ListItemText primary={role.name} />
                {editRole.id === role.roleID ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      label="Updated Role Name"
                      variant="outlined"
                      value={editRole.name}
                      onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                      style={{ marginRight: "10px" }}
                    />
                    <Button variant="outlined" onClick={handleUpdateRole} style={{ marginRight: "10px" }}>
                      Update
                    </Button>
                  </div>
                ) : (
                  <Button variant="outlined" onClick={() => handleEditRole(role)} style={{ marginRight: "10px" }}>
                    <Edit />
                  </Button>
                )}
                <Button variant="outlined" color="error" onClick={() => handleDeleteRole(role.roleID)}>
                  <DeleteOutline />
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RoleList;

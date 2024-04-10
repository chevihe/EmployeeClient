import axios from "axios";
const onAdd= async (data, employeeRoles,event) => {
try {
    const response = await axios.post("https://localhost:7237/api/Employee", {
      firstName: data.FirstName,
      lastName: data.LastName,
      tz: data.Identity,
      birthDay: data.BirthDate,
      startWorkDate: data.StartJobDate,
      gender: data.Gender,
      // Map roles to the desired format
      roles: employeeRoles.map((role) => ({
        roleID: role.roleID,
        isManagement: role.isManager,
        startRoleDate: role.startRoleDate,
      })),
    });

  } catch (error) {
    console.error("Error creating employee:", error);
  }
}

const onUpdate= async (id,data,employeeRoles,event,handleUpdat) => {
    try {
        const response = await axios.put(`https://localhost:7237/api/Employee/${id}`, {
          firstName: data.FirstName,
          lastName: data.LastName,
          tz: data.Identity,
          birthDay: data.BirthDate,
          startWorkDate: data.StartJobDate,
          gender: data.Gender,
          // Map roles to the desired format
          roles: employeeRoles.map((role) => ({
            roleID: role.roleID,
            isManagement: role.isManager,
            startRoleDate: role.startRoleDate,
          })),
        });
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    }

    export {onAdd,onUpdate};
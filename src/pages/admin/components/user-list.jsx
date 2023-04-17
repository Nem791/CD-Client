import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

// Xem list User (GET): http://localhost:3000/api/v1/admin/users
// Promote User lên Admin (PATCH): http://localhost:3000/api/v1/admin/users/promote-user/6411dea7be5aad470acee95a
// Upgrade User lên Premium: http://localhost:3000/api/v1/admin/users/upgrade-user/6411dea7be5aad470acee95a
// Admin Set API
// Approve (PATCH): http://localhost:3000/api/v1/sets/approve/641df266947729d86f55c5fa
// Get List Set (GET): http://localhost:3000/api/v1/sets/get-all-sets
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];

const UserList = () => {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/admin/users"
    );
    const userList = data.data.data;
    setUsers(userList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  return (
    <div className="px-6 w-full">
      <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
        All Users
      </h4>
      <div className=" p-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex gap-2">
                      <div>{row.name}</div>
                      <div>
                        <img
                          src={row.avatarUrl}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="right">
                    <div>{row.role}</div>
                  </TableCell>
                  <TableCell align="right">{row.typeAccount}</TableCell>
                  <TableCell align="right">
                    {row.role !== "admin" && (
                      <div className="flex justify-end">
                        <Button>Approve</Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserList;

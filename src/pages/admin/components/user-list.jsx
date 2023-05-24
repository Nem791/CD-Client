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
import { Box, Button, Modal, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import LoadingButton from "@mui/lab/LoadingButton";
// Xem list User (GET): https://word-up.fly.dev/api/v1/admin/users
// Promote User lên Admin (PATCH): https://word-up.fly.dev/api/v1/admin/users/promote-user/6411dea7be5aad470acee95a
// Upgrade User lên Premium: https://word-up.fly.dev/api/v1/admin/users/upgrade-user/6411dea7be5aad470acee95a
// Admin Set API
// Approve (PATCH): https://word-up.fly.dev/api/v1/sets/approve/641df266947729d86f55c5fa
// Get List Set (GET): https://word-up.fly.dev/api/v1/sets/get-all-sets
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};
const UserList = () => {
  const [users, setUsers] = useState();
  const [modalInfo, setModalInfo] = useState({
    isOpening: false,
    userId: "",
  });
  const getUsers = async () => {
    const { data } = await axios.get(
      "https://word-up.fly.dev/api/v1/admin/users"
    );
    const userList = data.data.data;
    setUsers(userList);
  };
  const promoteUser = async (userId) => {
    const { data } = await axios.patch(
      `https://word-up.fly.dev/api/v1/admin/users/promote-user/${userId}`
    );
    return data;
  };
  const upgradeUser = async (userId) => {
    const { data } = await axios.patch(
      `https://word-up.fly.dev/api/v1/admin/users/upgrade-user/${userId}`
    );
    return data;
  };
  const {
    data: promoteData,
    isLoading,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: promoteUser,
    onSuccess: () => {
      setModalInfo({
        isOpening: false,
        userId: "",
        type: "admin",
      });
    },
  });

  const {
    data: upgradeData,
    isLoading: isUpgrading,
    isSuccess: upgradeSuccess,
    mutate: update,
  } = useMutation({
    mutationFn: upgradeUser,
    onSuccess: () => {
      setModalInfo({
        isOpening: false,
        userId: "",
        type: "premium",
      });
    },
  });

  const handleConfirm = () => {
    if (modalInfo.type === "admin") {
      mutate(modalInfo.userId);
    }
    if (modalInfo.type === "premium") {
      update(modalInfo.userId);
    }
  };
  const handleCancel = () => {
    setModalInfo({
      isOpening: false,
      userId: "",
      type: "admin",
    });
  };

  useEffect(() => {
    getUsers();
  }, [isSuccess, upgradeSuccess]);

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
                      <div>
                        <img
                          src={row.avatarUrl}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                      </div>
                      <div>{row.name}</div>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="right">
                    <div>{row.role}</div>
                  </TableCell>
                  <TableCell align="right">{row.typeAccount}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-end gap-2">
                      <LoadingButton
                        size="small"
                        variant="outlined"
                        color="success"
                        disabled={row.role === "admin"}
                        onClick={() =>
                          setModalInfo({
                            isOpening: true,
                            userId: row._id,
                            type: "admin",
                          })
                        }
                        isLoading={isLoading}
                        endIcon={
                          <>
                            <CheckCircleIcon className="text-green-500" />
                          </>
                        }
                      >
                        Promote Admin
                      </LoadingButton>
                      <LoadingButton
                        size="small"
                        variant="outlined"
                        color="warning"
                        isLoading={isUpgrading}
                        disabled={row.paidAmount > 0}
                        onClick={() =>
                          setModalInfo({
                            isOpening: true,
                            userId: row._id,
                            type: "premium",
                          })
                        }
                      >
                        Update Premium
                      </LoadingButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal open={modalInfo.isOpening}>
        <Box sx={style}>
          <div className="text-lg font-medium leading-tight">Confirm</div>
          <div className="font-medium leading-tight p-4 text-red-300">
            Are you sure want to do this
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              onClick={handleConfirm}
              isLoading={isUpgrading || isLoading}
            >
              Confirm
            </Button>
            <Button color="error" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserList;

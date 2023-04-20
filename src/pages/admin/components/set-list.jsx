import {
  Box,
  Button,
  Card,
  CardActions,
  Modal,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
// Xem list User (GET): http://localhost:3000/api/v1/admin/users
// Promote User lên Admin (PATCH): http://localhost:3000/api/v1/admin/users/promote-user/6411dea7be5aad470acee95a
// Upgrade User lên Premium: http://localhost:3000/api/v1/admin/users/upgrade-user/6411dea7be5aad470acee95a
// Admin Set API
// Approve (PATCH): http://localhost:3000/api/v1/sets/approve/641df266947729d86f55c5fa
// Get List Set (GET): http://localhost:3000/api/v1/sets/get-all-sets
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};
const Setlist = () => {
  const [modalInfo, setModalInfo] = useState({
    isOpening: false,
    setId: "",
  });
  const getSet = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/sets/get-all-sets`
    );
    return data.data.sets;
  };
  const approveSet = async (setId) => {
    const { data } = await axios.patch(
      `http://localhost:3000/api/v1/sets/approve/${setId}`
    );
    return data;
  };
  const deleteSet = async (setId) => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/sets/${setId}`
    );
    return data;
  };

  const handleConfirm = () => {
    if (modalInfo.type === "approve") {
      mutate(modalInfo.setId);
    }
    if (modalInfo.type === "delete") {
      removeSet(modalInfo.setId);
    }
  };
  const handleCancel = () => {
    setModalInfo({
      isOpening: false,
      setId: "",
      type: "approve",
    });
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: approveSet,
    onSuccess: () => {
      setModalInfo({
        isOpening: false,
        setId: "",
      });
    },
  });

  const { mutate: removeSet, isSuccess: isDeleteSucesss } = useMutation({
    mutationFn: deleteSet,
    onSuccess: () => {
      setModalInfo({
        isOpening: false,
        setId: "",
      });
    },
  });

  const { data } = useQuery({
    queryKey: ["sets", isSuccess, isDeleteSucesss],
    queryFn: getSet,
  });

  console.log(data);
  return (
    <div>
      <h4 className="mt-0 mb-2 pb-4 text-2xl font-medium leading-tight text-primary text-center py-4">
        All Sets
      </h4>
      <div className=" mx-auto py-6 px-2 grid grid-cols-3 gap-6">
        {data?.map((item) => {
          return (
            <div key={item._id}>
              <Card>
                <div className="flex justify-between ">
                  <div className="font-medium leading-tight text-primary p-2">
                    <div>
                      Name : <span className="text-gray-500">{item.name}</span>
                    </div>
                    <div>
                      Owner :{" "}
                      <span className="text-gray-500">
                        {item?.createdBy?.name}
                      </span>
                    </div>
                    <div>
                      Created time :{" "}
                      <span className="text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      Description :
                      <span className="text-gray-500">{item.description}</span>
                    </div>
                  </div>
                  <div className="">
                    <img
                      src={item?.image}
                      alt=""
                      className="w-[100px] h-[100px] max-w-xs  object-cover"
                    />
                  </div>
                </div>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                      setModalInfo({
                        isOpening: true,
                        setId: item._id,
                        type: "approve",
                      });
                    }}
                    disabled={item?.approved}
                  >
                    {!item?.approved ? "Approve" : "Approved"}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={() => {
                      setModalInfo({
                        isOpening: true,
                        setId: item._id,
                        type: "delete",
                      });
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      <Modal open={modalInfo.isOpening}>
        <Box sx={style}>
          <div className="text-lg font-medium leading-tight">Confirm</div>
          <div className="font-medium leading-tight p-4 text-red-300">
            Are you sure want to do this
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={handleConfirm}>
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

export default Setlist;

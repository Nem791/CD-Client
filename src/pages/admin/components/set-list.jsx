import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
// Xem list User (GET): http://localhost:3000/api/v1/admin/users
// Promote User lên Admin (PATCH): http://localhost:3000/api/v1/admin/users/promote-user/6411dea7be5aad470acee95a
// Upgrade User lên Premium: http://localhost:3000/api/v1/admin/users/upgrade-user/6411dea7be5aad470acee95a
// Admin Set API
// Approve (PATCH): http://localhost:3000/api/v1/sets/approve/641df266947729d86f55c5fa
// Get List Set (GET): http://localhost:3000/api/v1/sets/get-all-sets
const Setlist = () => {
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
    return data
  }
  const { data } = useQuery({
    queryKey: ["sets"],
    queryFn: getSet,
  });
  const {mutate} = useMutation({
    mutationFn : approveSet
  }) 
  
  console.log(data);
  return (
    <div>
      <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
        All Sets
      </h4>
      <div className="w-[75%] mx-auto">
        {/* <Grid container spacing={4}>
          {data?.map((item) => {
              return (
                <Grid xs={4} key={item._id}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <div className="flex justify-between items-center mb-3">
                        <Typography
                          sx={{ fontSize: 15 }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.title}
                        </Typography>
                        {item.tags.map((tag) => (
                          <Chip label={tag} key={tag} color="warning" />
                        ))}
                      </div>
                      <div className="flex items-center">
                        
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        <div className="font-medium leading-tight text-primary">
                          Description
                        </div>
                        <div className="quiz-describle">{item.description}</div>
                      </Typography>
                      <div className="">
                        <img src={item.img} alt='' className="w-[100px] h-[100px] max-w-xs  object-cover"/>
                      </div>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        size="medium"
                        onClick={() => {}}
                      >
                        Do quizz!
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid> */}
      </div>
    </div>
  );
};

export default Setlist;

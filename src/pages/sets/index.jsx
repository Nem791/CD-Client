import {
  Button,
  Card,
  CardActions,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import "./quizzes.scss";
const SetsPage = () => {
  const navigate = useNavigate();

  const [catergori, setCategori] = useState();
  const [loading, setLoading] = useState(false);
  const getLeaderBoardData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/sets/get-all-approved-sets"
      );
      setCategori(res.data.data.sets);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLeaderBoardData();
  }, []);

  if (loading || !catergori) return <LinearProgress />;

  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <h4 class="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center">
          Sets Approved By Admin
        </h4>
        <div className="w-[75%] mx-auto">
          <Grid container spacing={4}>
            {catergori?.map((item) => {
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
                          {item.name}
                        </Typography>
                        {/* {item.tags.map((tag) => (
                        ))} */}
                        <Chip
                          label={item.numCards + " cards"}
                          // key={tag}
                          color="warning"
                        />
                      </div>
                      <div className="flex items-center">
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                        >
                          <div className="font-medium leading-tight text-primary">
                            Description
                          </div>
                          <div className="quiz-describle">
                            {item.description}
                          </div>
                        </Typography>
                        <div className="">
                          <img
                            src={item.image}
                            alt=""
                            className="w-[100px] h-[100px] max-w-xs  object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        size="medium"
                        onClick={() => navigate(`/set/${item._id}`)}
                      >
                        Access set
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SetsPage;

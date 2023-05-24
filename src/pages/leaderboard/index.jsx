import { Button, Card, CardActions, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import "./index.scss";
const LeaderBoardPage = () => {
  const navigate = useNavigate();

  const [catergori, setCategori] = useState();
  const [loading, setLoading] = useState(false);
  const getLeaderBoardData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://word-up.fly.dev/api/v1/quiz");
      setCategori(res.data.data.quizzes);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getLeaderBoardData();
  }, []);
  console.log(catergori);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
          Leader Board
        </h4>
        <div className="w-[80%] mx-auto">
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
                          {item.title}
                        </Typography>
                        {/* {item.tags.map((tag) => (
                        <Chip label={tag} key={tag} color="warning" />
                      ))} */}
                      </div>
                      <div className="flex items-center justify-between">
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
                            src={item.img}
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
                        onClick={() => navigate(`/quiz/${item._id}`)}
                      >
                        More Detail!
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

export default LeaderBoardPage;

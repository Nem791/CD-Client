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
      const res = await axios.get("http://localhost:3000/api/v1/quiz");
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
                <Grid xs={3} key={item._id}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <div className="font-mono  text-gray-800 font-semibold min-h-[48px]">
                        {item.title}
                      </div>
                      <div className="ld-description-container">
                        <span className="font-semibold text-gray-300 text-sm">
                          Description :
                        </span>
                        <span>{item.description}</span>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        size="small"
                        onClick={() => navigate(`/leaderboard/${item._id}`)}
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

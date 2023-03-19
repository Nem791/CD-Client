import { Button, Card, CardActions, Chip, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import "./quizzes.scss";
const QuizzesPage = () => {
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

  if (loading || !catergori) return <LinearProgress />;

  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <h4 class="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center">
          Quiz Time!
        </h4>
        <Grid container spacing={4}>
          {catergori?.map((item) => {
            return (
              <Grid xs={3} key={item._id}>
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
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      <div className="font-medium leading-tight text-primary">Description</div>
                      <div className="quiz-describle">{item.description}</div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      size="medium"
                      onClick={() => navigate(`/quiz/${item._id}`)}
                    >
                      Do quizz!
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default QuizzesPage;

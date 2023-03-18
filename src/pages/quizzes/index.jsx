import { Button, Card, CardActions, Chip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";

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
  console.log(catergori);

  if (loading ||!catergori) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <div>Quizz Title</div>
        <Grid container spacing={4}>
          {catergori?.map((item) => {
            return (
              <Grid xs={3} key={item._id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                    {item.tags.map((tag) => (
                      <Chip label={tag} key={tag} />
                    ))}
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.description}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/quiz/${item._id}`)}
                    >
                      Do quizz
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

import { ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const DetalLeaderBoard = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [leaderboardData, setLeaderboardDatae] = useState();
  const getLeaderBoardData = async (leaderboardId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/leaderboard/${leaderboardId}`
      );
      setLeaderboardDatae(res.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!params.quizId) return;
    getLeaderBoardData(params.quizId);
  }, [params.quizId]);

  console.log(leaderboardData);

  if (loading) return <>Loading...</>;

  return (
    <div>
      <Header />
      <div className="pt-[64px]">
        <div>LeaderBoard Title</div>
        {/* table container */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className="flex">
                    <ShieldCheckIcon className="w-5 h-5" /> <div>Rank</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <ShieldCheckIcon className="w-5 h-5" /> <div>Score</div>
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div className="flex">
                    <UserIcon className="w-5 h-5" /> <div>Name</div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DetalLeaderBoard;

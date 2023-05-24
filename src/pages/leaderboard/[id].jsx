import {
  ShieldCheckIcon,
  UserIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
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

const DetalLeaderBoard = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [leaderboardData, setLeaderboardDatae] = useState();
  const getLeaderBoardData = async (leaderboardId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://word-up.fly.dev/api/v1/leaderboard/${leaderboardId}`
      );
      setLeaderboardDatae(res.data.data.leaderboard);
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

  if (loading || !leaderboardData) return <>Loading...</>;

  return (
    <div>
      <Header />
      <div className="pt-[64px]">
        <h4 class="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
          Leader Board Table
        </h4>
        {/* table container */}
        <div className="w-[75%] mx-auto">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <div className="flex justify-center p-2">
                      <ChevronDoubleUpIcon className="w-5 h-5 mr-2" />{" "}
                      <div>Rank</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <UserIcon className="w-5 h-5 mr-2" /> <div>Name</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <ShieldCheckIcon className="w-5 h-5 mr-2" />{" "}
                      <div>Score</div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboardData.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className={`${
                          index === 0 && "text-xl text-yellow-600 font-bold"
                        } ${
                          index === 1 && "text-lg text-gray-400 font-semibold"
                        } ${index === 2 && " text-red-300 font-semibold"}`}
                      >
                        {row.user.name}
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.maxScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default DetalLeaderBoard;

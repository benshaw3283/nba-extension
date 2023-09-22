import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import TopPlayers from "./PlayerStatsByGame";
import BoxScore from "./BoxScore";
import TeamRecord from "./TeamRecord";

interface Team {
  logo: string;
  nickname: string;
}

interface Game {
  teams: {
    home: Team;
    visitors: Team;
  };
  scores: {
    home: { points: number };
    visitors: { points: number };
  };
  status?: {
    halftime?: boolean;
    long?: string;
    clock?: string;
  };
  periods?: {
    current?: number;
  };
}

const key = process.env.NBA_API_KEY;
const todaysDate = new Date().toISOString().slice(0, 10);
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "efd4542df6msh04ed18037300093p17f43ejsnd4fbc1b9f248",
  },
};

const fetchGames = async (): Promise<{ response: Game[] }> => {
  const response = await fetch(
    `https://api-nba-v1.p.rapidapi.com/games?date=2023-01-03`,
    options
  );
  const result = await response.json();

  return result;
};

const shortenNames = (name: string): string => {
  if (name === "Cavaliers") name = "Cavs";
  if (name === "Timberwolves") name = "Wolves";
  if (name === "Trail Blazers") name = "Portland";
  return name;
};

const Games: React.FC = () => {
  const [box, setBox] = useState(-1);

  const handleBox = (index: number) => {
    setBox(index);
    if (box === index) setBox(-1);
  };

  const { isLoading, error, data } = useQuery<{ response: Game[] }>({
    queryKey: ["gamesData"],
    queryFn: fetchGames,
  });

  return (
    <div className="">
      {data ? (
        data.response.map((game: any, index: number) => (
          <div key={index} className="relative">
            <div className=" w-[500px] ">
              <div className="flex flex-col py-1  pr-2 ">
                <div className="flex flex-row justify-between order-1  rounded-lg p-2 h-40 bg-white overflow-y-clip">
                  <div className="flex flex-row order-1">
                    <div className="flex order-1 pt-2 pl-4 flex-col items-center ">
                      <div className="order-1">
                        <Image
                          src={
                            game.teams.home.nickname === "Pistons"
                              ? "/pistons.png"
                              : game.teams.home.logo
                          }
                          width={50}
                          height={50}
                          alt="home_logo"
                        />
                      </div>
                      <div className="order-2 pt-2">
                        <h1 className="text-lg">
                          {shortenNames(game.teams.home.nickname)}
                        </h1>
                      </div>
                      <div className="order-3">
                        <TeamRecord teamID={game.teams.home.id} />
                      </div>
                    </div>
                    <p className=" order-2 pl-8 pt-4 text-3xl font-bold ">
                      {game.scores.home.points}
                    </p>
                  </div>

                  <div className="order-2 flex flex-col items-center font-semibold ">
                    <div className="order-1">
                      <h2>
                        {game.status?.halftime ? "Halftime" : game.status?.long}
                      </h2>
                      <p className="text-base">
                        Q{game.periods?.current} - {game.status?.clock}
                      </p>
                    </div>

                    <div className=" absolute top-24  flex-col">
                      <div className="flex order-1  border-slate-400">
                        <TopPlayers
                          gameID={game.id}
                          homeTeamID={game.teams.home.id}
                          visitorsTeamID={game.teams.visitors.id}
                        />
                      </div>
                    </div>
                    <div className="relative top-32 right-52 ">
                      <p
                        className="text-xs font-mono font-extralight cursor-pointer text-gray-500"
                        onClick={() => handleBox(index)}
                      >
                        Box Score
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row order-3">
                    <div className="flex order-2 pt-2 pr-4 flex-col items-center">
                      <div className="order-1">
                        <Image
                          src={
                            game.teams.visitors.nickname === "Pistons"
                              ? "/pistons.png"
                              : game.teams.visitors.logo
                          }
                          width={50}
                          height={50}
                          alt="visitors_logo"
                        />
                      </div>
                      <div className="order-2 pt-2 ">
                        <h1 className="text-lg ">
                          {shortenNames(game.teams.visitors.nickname)}
                        </h1>
                      </div>
                      <div className="order-3">
                        <TeamRecord teamID={game.teams.visitors.id} />
                      </div>
                    </div>
                    <p className=" order-1 pr-8 pt-4 text-3xl font-bold ">
                      {game.scores.visitors.points}
                    </p>
                  </div>
                </div>
                <div className="order-4">
                  <BoxScore
                    state={box}
                    gameIndex={index}
                    homeTeamID={game.teams.home.id}
                    visitorsTeamID={game.teams.visitors.id}
                    homeTeamName={game.teams.home.name}
                    visitorsTeamName={game.teams.visitors.name}
                    gameID={game.id}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span></span>
      )}

      <div className="flex justify-center">
        {isLoading ? (
          <div className="flex flex-col py-1 pr-2 w-[500px]">
            <div className="rounded-lg p-2 h-40 bg-white overflow-y-clip">
              {" "}
            </div>
            <div className="rounded-lg p-2 mt-2 h-40 bg-white overflow-y-clip">
              {" "}
            </div>
            <div className="rounded-lg p-2 mt-2 h-40 bg-white overflow-y-clip">
              {" "}
            </div>
            <div className="rounded-lg p-2 mt-2 h-40 bg-white overflow-y-clip">
              {" "}
            </div>
            <div className="rounded-lg p-2 mt-2 h-40 bg-white overflow-y-clip">
              {" "}
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
      <div>{error ? <span>Error...</span> : <div> </div>}</div>
    </div>
  );
};

export default Games;

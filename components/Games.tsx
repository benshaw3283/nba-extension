import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import PlayerStats from "./PlayerStatsByGame";
import TopPlayers from "./PlayerStatsByGame";
import { gamesArray } from "./arrays";

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

{
  /*
const fetchGames = async (): Promise<{ response: Game[] }> => {
  const response = await fetch(
    `https://api-nba-v1.p.rapidapi.com/games?date=2023-03-02`,
    options
  );
  const result = await response.json();
  console.log(result)
  return result;
};
*/
}

const shortenNames = (name: string): string => {
  if (name === "Cavaliers") name = "Cavs";
  if (name === "Timberwolves") name = "Wolves";
  if (name === "Trail Blazers") name = "Portland";
  return name;
};

const Games: React.FC = () => {
  {
    /*  const { isLoading, error, data } = useQuery<{ response: Game[] }>({
    queryKey: ["gamesData"],
    queryFn: fetchGames,
  });
  */
  }
  const data = true;

  {
    /*  data.response.map */
  }
  return (
    <div className="">
      {data ? (
        gamesArray.map((game: any, index: number) => (
          <div key={index}>
            <div className=" w-[500px] ">
              <div className="flex flex-col py-2 pr-2">
                <div className="flex flex-row justify-between order-1 bg-blue-500 rounded-lg p-2 h-36 ">
                  <div className="flex flex-row order-1">
                    <div className="flex order-1 pt-2 pl-4 flex-col items-center ">
                      <div className="order-1">
                        <Image
                          src={game.teams.home.logo}
                          width={50}
                          height={50}
                          alt="home_logo"
                        />
                      </div>
                      <div className="order-2 pt-2">
                        <h1 className=" ">
                          {shortenNames(game.teams.home.nickname)}
                        </h1>
                      </div>
                      <div className="order-3">
                        <p className="text-xs">32-37</p>
                      </div>
                    </div>
                    <p className=" order-2 pl-8 pt-4 text-2xl font-bold ">
                      {game.scores.home.points}
                    </p>
                  </div>

                  <div className="order-2 flex flex-col items-center font-semibold ">
                    <div className="order-1">
                      <h2>
                        {game.status?.halftime ? "Halftime" : game.status?.long}
                      </h2>
                      <p>
                        Q{game.periods?.current} - {game.status?.clock}
                      </p>
                    </div>

                    <div className="order-3 flex pt-6  flex-col">
                      <div className="order-1 flex justify-center">
                        <h3 className="flex text-sm">Top Players</h3>
                      </div>
                      <div className="flex order-2 ">
                        <TopPlayers gameID={game.id} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row order-3">
                    <div className="flex order-2 pt-2 pr-4 flex-col items-center">
                      <div className="order-1">
                        <Image
                          src={game.teams.visitors.logo}
                          width={50}
                          height={50}
                          alt="visitors_logo"
                        />
                      </div>
                      <div className="order-2 pt-2 ">
                        <h1 className=" ">
                          {shortenNames(game.teams.visitors.nickname)}
                        </h1>
                      </div>
                      <div className="order-3">
                        <p className="text-xs">32-37</p>
                      </div>
                    </div>
                    <p className=" order-1 pr-8 pt-4 text-2xl font-bold ">
                      {game.scores.visitors.points}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span>No games on today!</span>
      )}

      {/*
      <div>{isLoading ? <span>Loading...</span> : <div> </div>}</div>
      <div>{error ? <span>Error...</span> : <div> </div>}</div>
      */}
    </div>
  );
};

export default Games;

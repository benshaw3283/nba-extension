import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import React, { useEffect } from "react";

const key = process.env.NBA_API_KEY;
let todaysDate = new Date().toISOString().slice(0, 10);
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "efd4542df6msh04ed18037300093p17f43ejsnd4fbc1b9f248",
  },
};

//${todaysDate}

const fetchGames = async () => {
  const response = await fetch(
    `https://api-nba-v1.p.rapidapi.com/games?date=2023-03-05`,
    options
  );
  const result = await response.json();

  return result;
};

const Games = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gamesData"],
    queryFn: () => fetchGames(),
  });

  useEffect(() => {}, [data]);

  return (
    <div>
      {data ? (
        data.response.map((game: any, index: number) => (
          <div key={index}>
            <div className=" w-[500px]">
              <div className="flex flex-col p-2 ">
                <div className="flex flex-row justify-between order-1 bg-blue-500 rounded-lg p-2 h-36">
                  <div className="order-1 flex flex-col place-items-center justify-center">
                    <Image
                      src={game.teams.home.logo}
                      width={50}
                      height={50}
                      alt="home_logo"
                    />
                    <h1 className="order-1 ">{game.teams.home.nickname}</h1>
                  </div>
                  <div className="order-2 flex flex-col items-center font-semibold">
                    <div className="order-1">
                      <h2>
                        {game.status?.halftime ? "Halftime" : game.status?.long}
                      </h2>
                      <p>
                        Q{game.periods?.current} - {game.status?.clock}
                      </p>
                    </div>
                    <div className="order-2 flex flex-row items-center py-4 font-bold text-2xl">
                      <p className="mx-14">{game.scores.home.points}</p>

                      <p className="mx-14">{game.scores.visitors.points}</p>
                    </div>
                  </div>
                  <div className="order-3 flex flex-col place-items-center justify-center">
                    <Image
                      src={game.teams.visitors.logo}
                      width={50}
                      height={50}
                      alt="visitors_logo"
                    />
                    <h1 className="order-1">{game.teams.visitors.nickname}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span>No games on today!</span>
      )}

      <div>{isLoading ? <span>Loading...</span> : <div> </div>}</div>
    </div>
  );
};

export default Games;

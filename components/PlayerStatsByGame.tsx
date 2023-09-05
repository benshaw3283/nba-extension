import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
//import pic from "../images/brown.png";
import { statsArray } from "./arrays";

interface Player {
  player: {
    id: number;
    firstname: string;
    lastname: string;
  };

  team: {
    id: number;
    nickname: string;
  };

  points: number;
  totReb: number;
  pos: string;
  min: string;
  fgm: number;
  fga: number;
  fgp: string;
  ftm: number;
  fta: number;
  ftp: string;
  tpm: number;
  tpa: number;
  tpp: string;

  assists: number;
  pFouls: number;
  steals: number;
  turnovers: number;
  blocks: number;
  plusMinus: string;
  prasb?: number | any;
}

interface Game {
  game: string;
}

const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "efd4542df6msh04ed18037300093p17f43ejsnd4fbc1b9f248",
  },
};

const TopPlayers = (props: any) => {
  const url = `https://api-nba-v1.p.rapidapi.com/players/statistics?game=${props.gameID}`;

  const fetchAllPlayers = async () => {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.response;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["playerStats", props.gameID],
    queryFn: fetchAllPlayers,
  });

  let topPlayers: Player[] = [];

  if (data) {
    topPlayers = [...data];
    topPlayers.forEach((player) => {
      player.prasb =
        player.points +
        player.totReb +
        player.assists +
        player.steals +
        player.blocks;
    });

    // Sort the topPlayers array by prasb in descending order
    topPlayers.sort((a, b) => b.prasb - a.prasb);
  }

  let topTwoPlayers: Player[] = [];

  if (topPlayers.length >= 2) {
    // Add the top 2 players to the topTwoPlayers array
    topTwoPlayers = topPlayers.slice(0, 2);

    // Check if the top 2 players are from the same team
    if (topTwoPlayers[0].team.id === topTwoPlayers[1].team.id) {
      // Find the next highest player from a different team
      for (let i = 2; i < topPlayers.length; i++) {
        if (topPlayers[i].team.id !== topTwoPlayers[0].team.id) {
          topTwoPlayers[1] = topPlayers[i];
          break;
        }
      }
    }
  }

  return (
    <div>
      {data ? (
        topTwoPlayers.length >= 2 ? (
          <div className="flex flex-row">
            <div className="flex order-1 pl-4 pt-2">
              <div
                className={
                  topTwoPlayers[0].player.firstname.length +
                    topTwoPlayers[0].player.lastname.length >
                  14
                    ? "  pr-4"
                    : ""
                }
              >
                <Image
                  src={`/${topTwoPlayers[0].player.firstname}_${topTwoPlayers[0].player.lastname}.png`}
                  alt="g"
                  width={60}
                  height={35}
                  className="rounded-full"
                />
              </div>
              {topTwoPlayers[0].player.firstname.length +
                topTwoPlayers[0].player.lastname.length >
              13 ? (
                <div className="flex flex-col relative -top-5 -left-4">
                  <div className="order-1 flex w-32">
                    <p className="text-sm pr-4">
                      {topTwoPlayers[0].player.firstname}{" "}
                      {topTwoPlayers[0].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex">
                    <div className="flex flex-row ">
                      <p className="order-1 text-xs pl-1">pts</p>
                      <p className="order-2 text-xs pl-2">reb</p>
                      <p className="order-3 text-xs pl-2">ast</p>
                    </div>
                  </div>
                  <div className="order-3 flex text-sm">
                    <p className="pl-1">{topTwoPlayers[0].points}</p>
                    <p className="pl-3">{topTwoPlayers[0].totReb}</p>
                    <p className="pl-3">{topTwoPlayers[0].assists}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col ">
                  <div className="order-1 flex w-32">
                    <p className="text-sm pr-4">
                      {topTwoPlayers[0].player.firstname}{" "}
                      {topTwoPlayers[0].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex">
                    <div className="flex flex-row ">
                      <p className="order-1 text-xs pl-1">pts</p>
                      <p className="order-2 text-xs pl-2">reb</p>
                      <p className="order-3 text-xs pl-2">ast</p>
                    </div>
                  </div>
                  <div className="order-3 flex text-sm">
                    <p className="pl-1">{topTwoPlayers[0].points}</p>
                    <p className="pl-3">{topTwoPlayers[0].totReb}</p>
                    <p className="pl-3">{topTwoPlayers[0].assists}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex order-2 pr-2 pt-2">
              {topTwoPlayers[1].player.firstname.length +
                topTwoPlayers[1].player.lastname.length >
              13 ? (
                <div className="flex flex-col relative -top-0 -right-4">
                  <div className="flex order-1 w-36 justify-end">
                    <p className="text-sm pr-3">
                      {topTwoPlayers[1].player.firstname}{" "}
                      {topTwoPlayers[1].player.lastname}
                    </p>
                  </div>
                  <div className="order-2 flex pl-9">
                    <div className="flex flex-row">
                      <p className="order-1 text-xs pl-3">ast</p>
                      <p className="order-2 text-xs pl-2">reb</p>
                      <p className="order-3 text-xs pl-3">pts</p>
                    </div>
                  </div>
                  <div className="order-3 flex text-sm pl-9">
                    <p className="pl-4">{topTwoPlayers[1].assists}</p>
                    <p className="pl-5">{topTwoPlayers[1].totReb}</p>
                    <p className="pl-4">{topTwoPlayers[1].points}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex order-1 w-32 justify-end">
                    <p className="text-sm ">
                      {topTwoPlayers[1].player.firstname}{" "}
                      {topTwoPlayers[1].player.lastname}
                    </p>
                  </div>
                  <div className="order-2 flex pl-9">
                    <div className="flex flex-row ">
                      <p className="order-1 text-xs pl-3">ast</p>
                      <p className="order-2 text-xs pl-2">reb</p>
                      <p className="order-3 text-xs pl-3">pts</p>
                    </div>
                  </div>
                  <div className="order-3 flex text-sm pl-9">
                    <p className="pl-4">{topTwoPlayers[1].assists}</p>
                    <p className="pl-5">{topTwoPlayers[1].totReb}</p>
                    <p className="pl-4">{topTwoPlayers[1].points}</p>
                  </div>
                </div>
              )}
              <div
                className={
                  topTwoPlayers[1].player.firstname.length +
                    topTwoPlayers[1].player.lastname.length >
                  14
                    ? " pt-2 pr-2"
                    : "pt-2 "
                }
              >
                <Image
                  src="/jaylen_brown.png"
                  alt="g"
                  width={40}
                  height={35}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>No players...</div>
        )
      ) : (
        <div>Unable to fetch data...</div>
      )}
    </div>
  );
};

export default TopPlayers;

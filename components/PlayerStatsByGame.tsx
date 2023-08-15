import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import pic from "../images/brown.png";
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
  prasb: number;
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

  {
    /* const fetchAllPlayers = async () => {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.response;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["playerStats", props.gameID],
    queryFn: fetchAllPlayers,
  });

*/
  }
  const data = true;

  let topPlayers: Player[] = [];

  if (data) {
    topPlayers = [...statsArray];
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
      {/*
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error...</div>
      ) : */}{" "}
      {data ? (
        topTwoPlayers.length >= 2 ? (
          <div className="flex flex-row">
            <div className="flex order-1">
              <div className="">
                <Image src={pic} alt="g" width={30} height={30} />
              </div>
              <div className="flex flex-col">
                <div className="order-1 flex">
                  <p className="text-sm">
                    {topTwoPlayers[0].player.firstname}
                    {topTwoPlayers[0].player.lastname}
                  </p>
                </div>
                <div className="order-2 flex"></div>
              </div>
            </div>
            <div className="flex order-2">
              <div>
                <p className="text-sm">
                  {topTwoPlayers[1].player.firstname}
                  {topTwoPlayers[1].player.lastname}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>No players...</div>
        )
      ) : (
        <div>ds</div>
      )}
    </div>
  );
};

export default TopPlayers;

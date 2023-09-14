import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import ImageWithFallback from "./ImageWithFallback";
import { type } from "os";

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

type Props = {
  state: any;
  homeTeamID: number;
  visitorsTeamID: number;
  homeTeamName: string;
  visitorsTeamName: string;
  gameID: number;
  gameIndex: number;
};

const key = process.env.NBA_API_KEY;
const todaysDate = new Date().toISOString().slice(0, 10);
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "efd4542df6msh04ed18037300093p17f43ejsnd4fbc1b9f248",
  },
};

const BoxScore = (props: Props) => {
  const homePlayers: any = [];
  const visitorsPlayers: any = [];

  const homeID = props.homeTeamID;
  const visitorsID = props.visitorsTeamID;
  const homeName = props.homeTeamName;
  const visitorsName = props.visitorsTeamName;

  const url = `https://api-nba-v1.p.rapidapi.com/players/statistics?game=${props.gameID}`;

  const fetchBox = async () => {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.response;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["playerBox", props.gameID],
    queryFn: fetchBox,
  });

  const shortenPercentage = (per: string) => {
    if (per === "100.0") {
      return per.slice(0, 3);
    } else {
      return per;
    }
  };

  data?.map((player: Player) => {
    if (player.team.id === homeID) {
      homePlayers.push(player);
    } else if (player.team.id === visitorsID) {
      visitorsPlayers.push(player);
    }
  });

  const matchPlayerPic = (playerName: string) => {
    let endings = [
      " jr",
      " Jr.",
      " III",
      " II",
      " IV",
      " V",
      " VI",
      " Sr.",
      " sr",
    ];

    const includedEnding = endings.find((end) => playerName.includes(end));

    if (includedEnding) {
      const newName = playerName.replace(includedEnding, "");
      return newName;
    } else {
      return playerName;
    }
  };

  return (
    <div className="">
      {props.state !== props.gameIndex ? (
        <div> </div>
      ) : (
        <div>
          <div className="w-full bg-white overflow-x-scroll container border-y-2 rounded-lg">
            <div className="py-4 px-2 text-xl font-bold">
              <h1>{homeName}</h1>
            </div>
            <div className="flex flex-row p-2 pl-3 pb-6 border-b-2 font-thin w-[1332px]">
              <p className="">PLAYER</p>
              <p className="pl-[170px]">MIN</p>
              <p className="pl-10">PTS</p>
              <p className="pl-10">REB</p>
              <p className="pl-8">AST</p>
              <p className="pl-8">STL</p>
              <p className="pl-9">BLK</p>
              <p className="pl-8 ">FGM</p>
              <p className="pl-8">FGA</p>
              <p className="pl-11">FG%</p>
              <p className="pl-8">3PM</p>
              <p className="pl-8">3PA</p>
              <p className="pl-9">3P%</p>
              <p className="pl-9">FTM</p>
              <p className="pl-9">FTA</p>
              <p className="pl-10">FT%</p>
              <p className="pl-10">TO</p>
              <p className="pl-10">PF</p>
              <p className="pl-11">+-</p>
            </div>
            {homePlayers.map((player: any, index: number) => (
              <div key={index}>
                <div className="bg-white w-[1350px] ">
                  <div className="flex flex-row">
                    <div className="flex flex-row border-b border-gray-300 py-2 order-1 place-items-center">
                      <ImageWithFallback
                        alt="player_pic"
                        src={matchPlayerPic(
                          `/${player.player.firstname}_${player.player.lastname}.png`
                        )}
                        width={50}
                        height={30}
                      />
                      {player.player.firstname.length +
                        player.player.lastname.length >=
                      17 ? (
                        <div className="text-xs  flex order-1 w-40 font-semibold place-items-center">
                          <p className="pr-1 pl-1">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      ) : (
                        <div className="text-sm  flex order-1 w-40 font-semibold place-items-center">
                          <p className="pr-1 pl-2">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      )}
                      <div className="order-2  w-10"></div>

                      <div className="flex order-3   w-5 justify-center font-serif">
                        <p className="text-sm ">{player.min}</p>
                      </div>

                      <div className="flex order-4  w-[70px] justify-end ">
                        <p className="text-sm ">{player.points}</p>
                      </div>

                      <div className="order-5 flex w-[66px] justify-end ">
                        <p>{player.totReb}</p>
                      </div>

                      <div className="order-6 flex w-[60px] justify-end ">
                        <p>{player.assists}</p>
                      </div>

                      <div className="order-7 flex w-16 justify-end">
                        <p>{player.steals}</p>
                      </div>

                      <div className="order-8 flex w-16 justify-end">
                        <p>{player.blocks}</p>
                      </div>
                      <div className="order-9 flex w-16 justify-end text-blue-500 ">
                        <p>{player.fgm}</p>
                      </div>
                      <div className="order-10 flex w-[68px] justify-end text-blue-500 ">
                        <p>{player.fga}</p>
                      </div>
                      <div className="order-11 flex w-[85px] justify-end">
                        <p>{shortenPercentage(player.fgp)}</p>
                      </div>
                      <div className="order-12 flex w-14 justify-end text-blue-500">
                        <p>{player.tpm}</p>
                      </div>
                    </div>
                    <div className="order-2 flex flex-row  border-b border-gray-300 py-2 place-items-center">
                      <div className="flex w-16 justify-end text-blue-500">
                        <p>{player.tpa}</p>
                      </div>
                      <div className="flex w-[68px] justify-end">
                        <p>{shortenPercentage(player.tpp)}</p>
                      </div>
                      <div className="flex w-14 justify-end text-blue-500">
                        <p>{player.ftm}</p>
                      </div>
                      <div className="flex w-16 justify-end text-blue-500">
                        <p>{player.fta}</p>
                      </div>
                      <div className="flex w-[70px] justify-end">
                        <p>{shortenPercentage(player.ftp)}</p>
                      </div>
                      <div className="flex w-[60px] justify-end">
                        <p>{player.turnovers}</p>
                      </div>
                      <div className="flex w-14 justify-end">
                        <p>{player.pFouls}</p>
                      </div>
                      <div className="flex w-24 pl-4 justify-center">
                        <p>{player.plusMinus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-white overflow-x-scroll container border-y-2 rounded-lg">
            <div className="py-4 px-2 text-xl font-bold">
              <h1>{visitorsName}</h1>
            </div>
            <div className="flex flex-row p-2 pl-3 pb-6 border-b-2 font-thin w-[1350px]">
              <p className="">PLAYER</p>
              <p className="pl-[170px]">MIN</p>
              <p className="pl-10">PTS</p>
              <p className="pl-10">REB</p>
              <p className="pl-8">AST</p>
              <p className="pl-8">STL</p>
              <p className="pl-9">BLK</p>
              <p className="pl-8 ">FGM</p>
              <p className="pl-8">FGA</p>
              <p className="pl-11">FG%</p>
              <p className="pl-8">3PM</p>
              <p className="pl-8">3PA</p>
              <p className="pl-9">3P%</p>
              <p className="pl-9">FTM</p>
              <p className="pl-9">FTA</p>
              <p className="pl-10">FT%</p>
              <p className="pl-10">TO</p>
              <p className="pl-10">PF</p>
              <p className="pl-10">+-</p>
            </div>
            {visitorsPlayers.map((player: any, index: number) => (
              <div key={index}>
                <div className="bg-white w-[1300px] ">
                  <div className="flex flex-row">
                    <div className="flex flex-row border-b border-gray-300 py-2 order-1 place-items-center">
                      <ImageWithFallback
                        alt="player_pic"
                        src={matchPlayerPic(
                          `/${player.player.firstname}_${player.player.lastname}.png`
                        )}
                        width={50}
                        height={30}
                      />
                      {player.player.firstname.length +
                        player.player.lastname.length >=
                      17 ? (
                        <div className="text-xs  flex order-1 w-40 font-semibold place-items-center">
                          <p className="pr-1 pl-1">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      ) : (
                        <div className="text-sm  flex order-1 w-40 font-semibold place-items-center">
                          <p className="pr-1 pl-2">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      )}
                      <div className="order-2  w-10"></div>

                      <div className="flex order-3   w-5 justify-center font-serif">
                        <p className="text-sm ">{player.min}</p>
                      </div>

                      <div className="flex order-4  w-[70px] justify-end ">
                        <p className="text-sm ">{player.points}</p>
                      </div>

                      <div className="order-5 flex w-[66px] justify-end ">
                        <p>{player.totReb}</p>
                      </div>

                      <div className="order-6 flex w-[60px] justify-end ">
                        <p>{player.assists}</p>
                      </div>

                      <div className="order-7 flex w-16 justify-end">
                        <p>{player.steals}</p>
                      </div>

                      <div className="order-8 flex w-16 justify-end">
                        <p>{player.blocks}</p>
                      </div>
                      <div className="order-9 flex w-16 justify-end text-blue-500 ">
                        <p>{player.fgm}</p>
                      </div>
                      <div className="order-10 flex w-[68px] justify-end text-blue-500 ">
                        <p>{player.fga}</p>
                      </div>
                      <div className="order-11 flex w-[85px] justify-end">
                        <p>{shortenPercentage(player.fgp)}</p>
                      </div>
                      <div className="order-12 flex w-14 justify-end text-blue-500">
                        <p>{player.tpm}</p>
                      </div>
                    </div>
                    <div className="order-2 flex flex-row  border-b border-gray-300 py-2 place-items-center">
                      <div className="flex w-16 justify-end text-blue-500">
                        <p>{player.tpa}</p>
                      </div>
                      <div className="flex w-[68px] justify-end">
                        <p>{shortenPercentage(player.tpp)}</p>
                      </div>
                      <div className="flex w-14 justify-end text-blue-500">
                        <p>{player.ftm}</p>
                      </div>
                      <div className="flex w-16 justify-end text-blue-500">
                        <p>{player.fta}</p>
                      </div>
                      <div className="flex w-[70px] justify-end">
                        <p>{shortenPercentage(player.ftp)}</p>
                      </div>
                      <div className="flex w-[60px] justify-end">
                        <p>{player.turnovers}</p>
                      </div>
                      <div className="flex w-14 justify-end">
                        <p>{player.pFouls}</p>
                      </div>
                      <div className="flex w-24 pl-4 justify-center">
                        <p>{player.plusMinus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxScore;

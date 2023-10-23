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
            <div className="py-4 px-2  flex flex-row w-[1378px]">
              <h1 className="text-xl font-bold">{homeName}</h1>
              <div className="w-12"> </div>
              <div className="flex w-3 h-2 bg-green-600 place-self-center "></div>
              <p className="text-xs place-self-center pl-1 text-gray-500">
                Above league average
              </p>
              <div className="w-6"> </div>
              <div className="flex w-3 h-2 bg-red-600 place-self-center "></div>
              <p className="text-xs place-self-center pl-1 text-gray-500">
                Below league average
              </p>
            </div>
            <div className="flex flex-row py-2  pb-6 border-b-2 font-thin w-[1378px] text-lg ">
              <div className="w-4 flex"> </div>
              <div className="w-[174px] justify-start flex">
                <p>PLAYER</p>
              </div>
              <div className="w-[68px] flex "> </div>
              <div className="w-[24px] justify-end flex">
                <p>MIN</p>
              </div>
              <div className="w-[64px] justify-end flex">
                <p>PTS</p>
              </div>
              <div className="w-[68px] justify-end flex">
                <p>REB</p>
              </div>
              <div className="w-[58px] justify-end flex">
                <p>AST</p>
              </div>
              <div className="w-[58px] justify-end flex">
                <p>STL</p>
              </div>
              <div className="w-[60px] justify-end flex">
                <p>BLK</p>
              </div>
              <div className="w-[64px] justify-end flex">
                <p>FGM</p>
              </div>
              <div className="w-[62px] justify-end flex">
                <p>FGA</p>
              </div>
              <div className="w-[74px] justify-end flex">
                <p>FG%</p>
              </div>
              <div className="w-[62px] justify-end flex">
                <p>3PM</p>
              </div>
              <div className="w-[60px] justify-end flex">
                <p>3PA</p>
              </div>
              <div className="w-[64px] justify-end flex">
                <p>3P%</p>
              </div>
              <div className="w-[66px] justify-end flex">
                <p>FTM</p>
              </div>
              <div className="w-[58px] justify-end flex">
                <p>FTA</p>
              </div>
              <div className="w-[72px] justify-end flex">
                <p>FT%</p>
              </div>
              <div className="w-[60px] justify-end flex">
                <p>TO</p>
              </div>
              <div className="w-[54px] justify-end flex">
                <p>PF</p>
              </div>
              <div className="w-[62px] justify-end flex">
                <p>+-</p>
              </div>
            </div>
            {homePlayers.map((player: any, index: number) => (
              <div key={index}>
                <div className="bg-white w-[1350px] ">
                  <div className="flex flex-row">
                    <div className="flex flex-row border-b border-gray-300 py-2 order-1 place-items-center">
                      <div className="sticky left-0">
                        <ImageWithFallback
                          alt="player_pic"
                          src={matchPlayerPic(
                            `/${player.player.firstname}_${player.player.lastname}.png`
                          )}
                          width={50}
                          height={30}
                        />
                      </div>
                      {player.player.firstname.length +
                        player.player.lastname.length >=
                      17 ? (
                        <div className="text-xs  flex order-1 w-[190px] font-semibold place-items-center">
                          <p className="pr-1 pl-1">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      ) : (
                        <div className="text-sm  flex order-1 w-[190px] font-semibold place-items-center">
                          <p className="pr-1 pl-2">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      )}
                      <div className="order-2  w-8"></div>

                      <div className="flex order-3   w-5 justify-center font-serif">
                        <p className="text-base ">{player.min}</p>
                      </div>

                      <div className="flex order-4  w-[70px] justify-end ">
                        <p className="text-base">{player.points}</p>
                      </div>

                      <div className="order-5 flex w-[66px] justify-end ">
                        <p className="text-base">{player.totReb}</p>
                      </div>

                      <div className="order-6 flex w-[60px] justify-end ">
                        <p className="text-base">{player.assists}</p>
                      </div>

                      <div className="order-7 flex w-16 justify-end">
                        <p className="text-base">{player.steals}</p>
                      </div>

                      <div className="order-8 flex w-16 justify-end">
                        <p className="text-base">{player.blocks}</p>
                      </div>
                      <div className="order-9 flex w-16 justify-end text-blue-500 ">
                        <p className="text-base">{player.fgm}</p>
                      </div>
                      <div className="order-10 flex w-[70px] justify-end text-blue-500 ">
                        <p className="text-base">{player.fga}</p>
                      </div>
                      <div className="order-11 flex w-[85px] justify-end">
                        <p
                          className={
                            player.fgp > 47.5
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {shortenPercentage(player.fgp)}
                        </p>
                      </div>
                      <div className="order-12 flex w-[58px] justify-end text-blue-500">
                        <p className="text-base">{player.tpm}</p>
                      </div>
                    </div>
                    <div className="order-2 flex flex-row  border-b border-gray-300 py-2 place-items-center">
                      <div className="flex w-[62px] justify-end text-blue-500">
                        <p className="text-base">{player.tpa}</p>
                      </div>
                      <div className="flex w-[70px] justify-end">
                        <p
                          className={
                            player.tpp > 36.1
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {shortenPercentage(player.tpp)}
                        </p>
                      </div>
                      <div className="flex w-[56px] justify-end text-blue-500">
                        <p className="text-base">{player.ftm}</p>
                      </div>
                      <div className="flex w-[62px] justify-end text-blue-500">
                        <p className="text-base">{player.fta}</p>
                      </div>
                      <div className="flex w-[72px] justify-end">
                        <p
                          className={
                            player.ftp > 78.2
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {shortenPercentage(player.ftp)}
                        </p>
                      </div>
                      <div className="flex w-[60px] justify-end">
                        <p className="text-base">{player.turnovers}</p>
                      </div>
                      <div className="flex w-14 justify-end">
                        <p className="text-base">{player.pFouls}</p>
                      </div>
                      <div className="flex w-24 pl-4 justify-center">
                        <p
                          className={
                            player.plusMinus.includes("+")
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {player.plusMinus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-white overflow-x-scroll container border-y-2 rounded-lg">
            <div className="py-4 px-2  flex flex-row w-[1350px]">
              <h1 className="text-xl font-bold">{visitorsName}</h1>
              <div className="w-12"> </div>
              <div className="flex w-3 h-2 bg-green-600 place-self-center "></div>
              <p className="text-xs place-self-center pl-1 text-gray-500">
                Above league average
              </p>
              <div className="w-6"> </div>
              <div className="flex w-3 h-2 bg-red-600 place-self-center "></div>
              <p className="text-xs place-self-center pl-1 text-gray-500">
                Below league average
              </p>
            </div>
            <div className="flex flex-row py-2  pb-6 border-b-2 font-thin w-[1378px] text-lg ">
              <div className="w-4 flex"> </div>
              <div className="w-[174px] justify-start flex">
                <p>PLAYER</p>
              </div>
              <div className="w-[68px] flex "> </div>
              <div className="w-[24px] justify-end flex">
                <p>MIN</p>
              </div>
              <div className="w-[64px] justify-end flex">
                <p>PTS</p>
              </div>
              <div className="w-[68px] justify-end flex">
                <p>REB</p>
              </div>
              <div className="w-[58px] justify-end flex">
                <p>AST</p>
              </div>
              <div className="w-[58px] justify-end flex">
                <p>STL</p>
              </div>
              <div className="w-[60px] justify-end flex">
                <p>BLK</p>
              </div>
              <div className="w-[64px] justify-end flex">
                <p>FGM</p>
              </div>
              <div className="w-[62px] justify-end flex">
                <p>FGA</p>
              </div>
              <div className="w-[74px] justify-end flex">
                <p>FG%</p>
              </div>
              <div className="w-[62px] justify-end flex">
                <p>3PM</p>
              </div>
              <div className="w-[60px] justify-end flex">
                <p>3PA</p>
              </div>
              <div className="w-[64px] justify-end flex">
                <p>3P%</p>
              </div>
              <div className="w-[66px] justify-end flex">
                <p>FTM</p>
              </div>
              <div className="w-[58px] justify-end flex">
                <p>FTA</p>
              </div>
              <div className="w-[72px] justify-end flex">
                <p>FT%</p>
              </div>
              <div className="w-[60px] justify-end flex">
                <p>TO</p>
              </div>
              <div className="w-[54px] justify-end flex">
                <p>PF</p>
              </div>
              <div className="w-[62px] justify-end flex">
                <p>+-</p>
              </div>
            </div>
            {visitorsPlayers.map((player: any, index: number) => (
              <div key={index}>
                <div className="bg-white w-[1350px] ">
                  <div className="flex flex-row">
                    <div className="flex flex-row border-b border-gray-300 py-2 order-1 place-items-center">
                      <div className="sticky left-0">
                        <ImageWithFallback
                          alt="player_pic"
                          src={matchPlayerPic(
                            `/${player.player.firstname}_${player.player.lastname}.png`
                          )}
                          width={50}
                          height={30}
                        />
                      </div>
                      {player.player.firstname.length +
                        player.player.lastname.length >=
                      17 ? (
                        <div className="text-xs  flex order-1 w-[190px] font-semibold place-items-center">
                          <p className="pr-1 pl-1">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      ) : (
                        <div className="text-sm  flex order-1 w-[190px] font-semibold place-items-center">
                          <p className="pr-1 pl-2">{player.player.firstname}</p>
                          <p>{player.player.lastname}</p>
                        </div>
                      )}
                      <div className="order-2  w-8"></div>

                      <div className="flex order-3   w-5 justify-center font-serif">
                        <p className="text-base ">{player.min}</p>
                      </div>

                      <div className="flex order-4  w-[70px] justify-end ">
                        <p className="text-base">{player.points}</p>
                      </div>

                      <div className="order-5 flex w-[66px] justify-end ">
                        <p className="text-base">{player.totReb}</p>
                      </div>

                      <div className="order-6 flex w-[60px] justify-end ">
                        <p className="text-base">{player.assists}</p>
                      </div>

                      <div className="order-7 flex w-16 justify-end">
                        <p className="text-base">{player.steals}</p>
                      </div>

                      <div className="order-8 flex w-16 justify-end">
                        <p className="text-base">{player.blocks}</p>
                      </div>
                      <div className="order-9 flex w-16 justify-end text-blue-500 ">
                        <p className="text-base">{player.fgm}</p>
                      </div>
                      <div className="order-10 flex w-[70px] justify-end text-blue-500 ">
                        <p className="text-base">{player.fga}</p>
                      </div>
                      <div className="order-11 flex w-[85px] justify-end">
                        <p
                          className={
                            player.fgp > 47.5
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {shortenPercentage(player.fgp)}
                        </p>
                      </div>
                      <div className="order-12 flex w-[58px] justify-end text-blue-500">
                        <p className="text-base">{player.tpm}</p>
                      </div>
                    </div>
                    <div className="order-2 flex flex-row  border-b border-gray-300 py-2 place-items-center">
                      <div className="flex w-[62px] justify-end text-blue-500">
                        <p className="text-base">{player.tpa}</p>
                      </div>
                      <div className="flex w-[70px] justify-end">
                        <p
                          className={
                            player.tpp > 36.1
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {shortenPercentage(player.tpp)}
                        </p>
                      </div>
                      <div className="flex w-[56px] justify-end text-blue-500">
                        <p className="text-base">{player.ftm}</p>
                      </div>
                      <div className="flex w-[62px] justify-end text-blue-500">
                        <p className="text-base">{player.fta}</p>
                      </div>
                      <div className="flex w-[72px] justify-end">
                        <p
                          className={
                            player.ftp > 78.2
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {shortenPercentage(player.ftp)}
                        </p>
                      </div>
                      <div className="flex w-[60px] justify-end">
                        <p className="text-base">{player.turnovers}</p>
                      </div>
                      <div className="flex w-14 justify-end">
                        <p className="text-base">{player.pFouls}</p>
                      </div>
                      <div className="flex w-24 pl-4 justify-center">
                        <p
                          className={
                            player.plusMinus.includes("+")
                              ? "text-green-600 text-base"
                              : "text-red-600 text-base"
                          }
                        >
                          {player.plusMinus}
                        </p>
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

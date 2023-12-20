import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ImageWithFallback from "./ImageWithFallback";

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
    if (
      topTwoPlayers[0].team.id !== props.homeTeamID ||
      topTwoPlayers[1].team.id !== props.visitorsTeamID
    ) {
      let temp = topTwoPlayers[0];
      topTwoPlayers[0] = topTwoPlayers[1];
      topTwoPlayers[1] = temp;
    }
  }

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
    <div>
      {data ? (
        topTwoPlayers.length >= 2 ? (
          <div className="flex flex-row">
            <div className="flex order-1 pl-4 pt-2">
              <div
                className={
                  topTwoPlayers[0].player.firstname.length +
                    topTwoPlayers[0].player.lastname.length >
                  13
                    ? " -right-6 "
                    : "-right-4"
                }
              >
                <ImageWithFallback
                  src={matchPlayerPic(
                    `/${topTwoPlayers[0].player.firstname}_${topTwoPlayers[0].player.lastname}.png`
                  )}
                  alt="player_pic"
                  width={60}
                  height={35}
                  className="rounded-full"
                />
              </div>

              {topTwoPlayers[0].player.firstname.length +
                topTwoPlayers[0].player.lastname.length >
                13 &&
              topTwoPlayers[0].player.firstname.length +
                topTwoPlayers[0].player.lastname.length <
                16 ? (
                <div className="flex flex-col relative -top-5 ">
                  <div className="order-1 flex w-[110px]">
                    <p className="text-sm pr-4 font-bold border-b-2 ">
                      {topTwoPlayers[0].player.firstname}{" "}
                      {topTwoPlayers[0].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex w-[110px]">
                    <div className="flex flex-row pr-7">
                      <div className="order-1 flex flex-col place-items-center  ">
                        <p className="order-1 text-sm pl-1 border-b">pts</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[0].points}
                        </p>
                      </div>
                      <div className="order-2 flex flex-col place-items-center pl-1">
                        <p className="order-1 text-sm pl-1 border-b">reb</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[0].totReb}
                        </p>
                      </div>
                      {topTwoPlayers[0].assists > topTwoPlayers[0].blocks ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">ast</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[0].assists}
                          </p>
                        </div>
                      ) : (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">blk</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[0].blocks}
                          </p>
                        </div>
                      )}
                      {topTwoPlayers[0].steals > topTwoPlayers[0].assists &&
                        topTwoPlayers[0].blocks < topTwoPlayers[0].assists && (
                          <div className="order-3 flex flex-col place-items-center pl-1">
                            <p className="order-1 text-sm pl-1 border-b">stl</p>
                            <p className="pl-1 order-2 text-sm">
                              {topTwoPlayers[0].steals}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ) : topTwoPlayers[0].player.firstname.length +
                  topTwoPlayers[0].player.lastname.length >=
                16 ? (
                <div className="flex flex-col relative -top-3 ">
                  <div className="order-1 flex w-[110px]">
                    <p className="text-xs pr-4 font-bold border-b-2 ">
                      {topTwoPlayers[0].player.firstname}{" "}
                      {topTwoPlayers[0].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex w-[110px]">
                    <div className="flex flex-row pr-7">
                      <div className="order-1 flex flex-col place-items-center  ">
                        <p className="order-1 text-sm pl-1 border-b">pts</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[0].points}
                        </p>
                      </div>
                      <div className="order-2 flex flex-col place-items-center pl-1">
                        <p className="order-1 text-sm pl-1 border-b">reb</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[0].totReb}
                        </p>
                      </div>
                      {topTwoPlayers[0].assists > topTwoPlayers[0].blocks ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">ast</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[0].assists}
                          </p>
                        </div>
                      ) : (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">blk</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[0].blocks}
                          </p>
                        </div>
                      )}
                      {topTwoPlayers[0].steals > topTwoPlayers[0].assists &&
                        topTwoPlayers[0].blocks < topTwoPlayers[0].assists && (
                          <div className="order-3 flex flex-col place-items-center pl-1">
                            <p className="order-1 text-sm pl-1 border-b">stl</p>
                            <p className="pl-1 order-2 text-sm">
                              {topTwoPlayers[0].steals}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col ">
                  <div className="order-1 flex w-32 border-b-2">
                    <p className="text-sm pr-4 font-bold ">
                      {topTwoPlayers[0].player.firstname}{" "}
                      {topTwoPlayers[0].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex">
                    <div className="flex flex-row pr-7 ">
                      <div className="order-1 flex flex-col place-items-center ">
                        <p className="order-1 text-sm pl-1 border-b">pts</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[0].points}
                        </p>
                      </div>
                      <div className="order-2 flex flex-col place-items-center pl-1">
                        <p className="order-1 text-sm pl-1 border-b">reb</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[0].totReb}
                        </p>
                      </div>
                      {topTwoPlayers[0].assists > topTwoPlayers[0].blocks ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">ast</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[0].assists}
                          </p>
                        </div>
                      ) : (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">blk</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[0].blocks}
                          </p>
                        </div>
                      )}
                      {topTwoPlayers[0].steals > topTwoPlayers[0].assists &&
                        topTwoPlayers[0].blocks < topTwoPlayers[0].assists && (
                          <div className="order-3 flex flex-col place-items-center pl-1">
                            <p className="order-1 text-sm pl-1 border-b">stl</p>
                            <p className="pl-1 order-2 text-sm">
                              {topTwoPlayers[0].steals}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex order-2 pr-2 pt-2 ">
              {topTwoPlayers[1].player.firstname.length +
                topTwoPlayers[1].player.lastname.length >=
                13 &&
              topTwoPlayers[1].player.firstname.length +
                topTwoPlayers[1].player.lastname.length <
                16 ? (
                <div className="flex flex-col relative -top-5 ">
                  <div className="order-1 flex w-[110px] border-b-2 justify-end">
                    <p className="text-sm pl-7  font-bold ">
                      {topTwoPlayers[1].player.firstname}{" "}
                      {topTwoPlayers[1].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex">
                    <div className="flex flex-row pl-7 ">
                      <div className="order-1 flex flex-col place-items-center ">
                        <p className="order-1 text-sm pl-1 border-b">pts</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[1].points}
                        </p>
                      </div>
                      <div className="order-2 flex flex-col place-items-center pl-1">
                        <p className="order-1 text-sm pl-1 border-b">reb</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[1].totReb}
                        </p>
                      </div>
                      {topTwoPlayers[1].assists > topTwoPlayers[1].blocks ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">ast</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].assists}
                          </p>
                        </div>
                      ) : topTwoPlayers[1].steals > topTwoPlayers[1].assists &&
                        topTwoPlayers[1].blocks < topTwoPlayers[1].assists ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">stl</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].steals}
                          </p>
                        </div>
                      ) : (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">blk</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].blocks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : topTwoPlayers[1].player.firstname.length +
                  topTwoPlayers[1].player.lastname.length >=
                16 ? (
                <div className="flex flex-col relative -top-5 ">
                  <div className="order-1 flex w-[110px] border-b-2 ">
                    <p className="text-sm  pl-3 font-bold ">
                      {topTwoPlayers[1].player.firstname}{" "}
                      {topTwoPlayers[1].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex">
                    <div className="flex flex-row pl-7 ">
                      <div className="order-1 flex flex-col place-items-center ">
                        <p className="order-1 text-sm pl-1 border-b">pts</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[1].points}
                        </p>
                      </div>
                      <div className="order-2 flex flex-col place-items-center pl-1">
                        <p className="order-1 text-sm pl-1 border-b">reb</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[1].totReb}
                        </p>
                      </div>
                      {topTwoPlayers[1].assists > topTwoPlayers[1].blocks ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">ast</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].assists}
                          </p>
                        </div>
                      ) : topTwoPlayers[1].steals > topTwoPlayers[1].assists &&
                        topTwoPlayers[1].blocks < topTwoPlayers[1].assists ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">stl</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].steals}
                          </p>
                        </div>
                      ) : (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">blk</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].blocks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col ">
                  <div className="order-1 flex w-28 justify-end border-b-2">
                    <p className="text-sm font-bold ">
                      {topTwoPlayers[1].player.firstname}{" "}
                      {topTwoPlayers[1].player.lastname}
                    </p>
                  </div>

                  <div className="order-2 flex">
                    <div className="flex flex-row justify-end w-[110px] ">
                      <div className="order-1 flex flex-col place-items-center ">
                        <p className="order-1 text-sm pl-1 border-b">pts</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[1].points}
                        </p>
                      </div>
                      <div className="order-2 flex flex-col place-items-center pl-1">
                        <p className="order-1 text-sm pl-1 border-b">reb</p>
                        <p className="pl-1 order-2 text-sm">
                          {topTwoPlayers[1].totReb}
                        </p>
                      </div>
                      {topTwoPlayers[1].assists > topTwoPlayers[1].blocks ? (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">ast</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].assists}
                          </p>
                        </div>
                      ) : (
                        <div className="order-3 flex flex-col place-items-center pl-1">
                          <p className="order-1 text-sm pl-1 border-b">blk</p>
                          <p className="pl-1 order-2 text-sm">
                            {topTwoPlayers[1].blocks}
                          </p>
                        </div>
                      )}
                      {topTwoPlayers[1].steals > topTwoPlayers[1].assists &&
                        topTwoPlayers[1].blocks < topTwoPlayers[1].assists && (
                          <div className="order-3 flex flex-col place-items-center pl-1">
                            <p className="order-1 text-sm pl-1 border-b">stl</p>
                            <p className="pl-1 order-2 text-sm">
                              {topTwoPlayers[1].steals}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
              <div
                className={
                  topTwoPlayers[1].player.firstname.length +
                    topTwoPlayers[1].player.lastname.length >
                  13
                    ? "  "
                    : ""
                }
              >
                <ImageWithFallback
                  src={matchPlayerPic(
                    `/${topTwoPlayers[1].player.firstname}_${topTwoPlayers[1].player.lastname}.png`
                  )}
                  alt="g"
                  width={60}
                  height={35}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>...</div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopPlayers;

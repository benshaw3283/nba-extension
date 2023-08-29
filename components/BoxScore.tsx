import { statsArray } from "./arrays";
import React from "react";

const BoxScore = (props: any) => {
  const homePlayers: any = [];
  const visitorsPlayers: any = [];

  const homeID = props.homeTeamID;
  const visitorsID = props.visitorsTeamID;

  const homeName = props.homeTeamName
  const visitorsName = props.visitorsTeamName

  /*  statsArray.forEach((playerData) => {
      const { player, team } = playerData;
      const { id: teamID } = team;

      if (teamID === homeID) {
        homePlayers.push(player);
      } else if (teamID === visitorsID) {
        visitorsPlayers.push(player);
      }
    });

 */

  statsArray.map((player) => {
    if (player.team.id === homeID) {
      homePlayers.push(player);
    } else if (player.team.id === visitorsID) {
      visitorsPlayers.push(player);
    }
  });

  return (
    <div className="w-[500px] bg-white overflow-x-scroll container border-y-2 rounded-lg">
      {props.state !== props.gameIndex ? (
        <div> </div>
      ) : (
        <div>
          <div className="">
            <div className="py-4 px-2 text-xl font-bold">
                <h1>{homeName}</h1>
            </div>
            <div className="flex flex-row p-2 pb-6">
              <p className="">PLAYER</p>
              <p className="pl-24">MIN</p>
              <p className="pl-8">PTS</p>
              <p className="pl-8">REB</p>
              <p className="pl-8">AST</p>
              <p className="pl-8">STL</p>
              <p className="pl-8">BLK</p>
              <p className="pl-8">FGM</p>
              <p className="pl-8">FGA</p>
              <p className="pl-10">FG%</p>
              <p className="pl-8">3PM</p>
              <p className="pl-8">3PA</p>
              <p className="pl-8">3P%</p>
              <p className="pl-8">FTM</p>
              <p className="pl-8">FTA</p>
              <p className="pl-10">FT%</p>
              <p className="pl-10">TO</p>
              <p className="pl-10">PF</p>
              <p className="pl-10">+-</p>

            </div>
            {homePlayers.map((player: any, index: number) => (
              <div key={index}>
                <div className="bg-white w-[1300px] ">
                    <div className="flex flex-row">
                  <div className="flex flex-row border-b border-gray-400 py-2 order-1">
                    {player.player.firstname.length + player.player.lastname.length >= 15 ? (
                    <div className="text-xs  flex order-1 w-32 font-semibold place-items-center">
                      <p className="pr-1 pl-1">{player.player.firstname}</p>
                      <p>{player.player.lastname}</p>
                    </div>
                    ) : (
                        <div className="text-sm  flex order-1 w-32 font-semibold">
                      <p className="pr-1 pl-2">{player.player.firstname}</p>
                      <p>{player.player.lastname}</p>
                    </div>
                    )}
                    <div className="order-2  w-10"></div>

                    <div className="flex order-3   w-5 justify-center">
                      <p className="text-sm ">{player.min}</p>
                    </div>

                    <div className="flex order-4  w-14 justify-end">
                      <p className="text-sm ">{player.points}</p>
                    </div>

                    <div className="order-5 flex w-16 justify-end">
                      <p>{player.totReb}</p>
                    </div>

                    <div className="order-6 flex w-14 justify-end">
                      <p>{player.assists}</p>
                    </div>

                    <div className="order-7 flex w-16 justify-end">
                      <p>{player.steals}</p>
                    </div>

                    <div className="order-8 flex w-16 justify-end">
                      <p>{player.blocks}</p>
                    </div>
                    <div className="order-9 flex w-16 justify-end">
                      <p>{player.fgm}</p>
                    </div>
                    <div className="order-10 flex w-16 justify-end">
                      <p>{player.fga}</p>
                    </div>
                    <div className="order-11 flex w-20 justify-end">
                      <p>{player.fgp}</p>
                    </div>
                    <div className="order-12 flex w-14 justify-end">
                      <p>{player.tpm}</p>
                    </div>
                    
                  </div>
                  <div className="order-2 flex flex-row  border-b border-gray-400 py-2 ">
                    <div className="flex w-14 justify-end">
                      <p>{player.tpa}</p>
                    </div>
                    <div className="flex w-20 justify-end">
                      <p>{player.tpp}</p>
                    </div>
                    <div className="flex w-14 justify-end">
                      <p>{player.ftm}</p>
                    </div>
                    <div className="flex w-16 justify-end">
                      <p>{player.fta}</p>
                    </div>
                    <div className="flex w-20 justify-end">
                      <p>{player.ftp}</p>
                    </div>
                    <div className="flex w-14 justify-end">
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
          <br></br>
          <div>
            {visitorsPlayers.map((player: any, index: number) => (
              <div key={index}>
                <div className="bg-blue-500">
                  <p>{player.player.firstname}</p>
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

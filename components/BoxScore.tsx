import { statsArray } from "./arrays";
import React from "react";

const BoxScore = (props: any) => {
  const homePlayers: any = [];
  const visitorsPlayers: any = [];

  const homeID = props.homeTeamID;
  const visitorsID = props.visitorsTeamID;

 
    statsArray.forEach((playerData) => {
      const { player, team } = playerData;
      const { id: teamID } = team;

      if (teamID === homeID) {
        homePlayers.push(player);
      } else if (teamID === visitorsID) {
        visitorsPlayers.push(player);
      }
    });
 

  return (
    <div className="w-[500px] bg-blue-500">
      {props.state !== props.gameIndex ? (
        <div> </div>
      ) : (
        <div>
          {homePlayers.map((player: any, index: number) => (
            <div key={index}>
              <div className="bg-blue-500">
                <p>{player.player.firstname}</p>
                <p>sff</p>
              </div>
            </div>
          ))}
          <button onClick={() => console.log(homePlayers)} className="pl-20">gg</button>
          <p>egsdges</p>
        </div>
      )}
    </div>
  );
};

export default BoxScore;

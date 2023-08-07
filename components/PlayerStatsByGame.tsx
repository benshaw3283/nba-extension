import React from 'react'
import { useQuery } from "@tanstack/react-query";

interface Player {
    
        id: number,
        firstname: string,
        lastname: string
    

    team: {
        id: number,
        nickname: string
    },

    stats: {
        points: number,
        rebounds:number,
        pos: string,
        min: string,
        fgm: number,
        fga:number,
        fgp: string,
        ftm: number,
        fta:number,
        ftp:string,
        tpm:number,
        tpa:number,
        tpp:string,
        totReb:number,
        assists:number,
        pFouls: number,
        steals:number,
        turnovers:number,
        blocks:number,
        plusMinus:string,
        prasb:number
    }
}

interface Game {
    game: string
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

    
  const fetchTopPlayers = async (): Promise<Game> => {
    const response = await fetch(
      url,
      options
    );
    const result = await response.json();
    const allPlayers = await result.response.map((player: Player)=> {
        const prasb:number = player.stats.points + player.stats.rebounds + player.stats.assists + player.stats.steals + player.stats.blocks;
        player.stats.prasb = prasb
    })
    const highestPRASB = allPlayers.sort((a:any,b:any)=> a - b)
    console.log(highestPRASB)
    return allPlayers;
  };

   
    const { isLoading, error, data } = useQuery<{ response: Game }>({
        queryKey: ["playerStats"],
        queryFn:  fetchTopPlayers,
      });

    

  return (
    <div>
      {data}  
    </div>
  )
}

export default TopPlayers
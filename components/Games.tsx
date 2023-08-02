import { useQuery } from "@tanstack/react-query";

import React from 'react'

const key = process.env.NBA_API_KEY
let todaysDate = new Date().toISOString().slice(0, 10)
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': "efd4542df6msh04ed18037300093p17f43ejsnd4fbc1b9f248"
    }
}

//${todaysDate}

const fetchGames = async() => {
    const response = await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=2023-03-05`, options);
    const result = await response.json()
    
    return result;
}

const Games = () => {


    const { isLoading, error, data } = useQuery({
        queryKey: ['gamesData'],
        queryFn: ()=> fetchGames()
      })


  return (
    <div>
       {data ? (
        
       data.response.map((game: any, index: number)=> (
        <div key={index}> 
            <p>{game.teams.visitors.name}</p>
            <p>{game.teams.home.name}</p>
        </div>
        ))
        
       ) : (
        <span>No games on today!</span>
       )}

       <div>
        {isLoading ? (
            <span>Loading...</span>
        ): 
        <div> </div>}
       </div>
    </div>
  )
}

export default Games
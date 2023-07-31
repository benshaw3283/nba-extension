import { useQuery } from "@tanstack/react-query";

import React from 'react'

const fetchGames = () => {
        
}

const Games = () => {


    const { isLoading, error, data } = useQuery({
        queryKey: ['gamesData'],
        queryFn: ()=>  fetchGames()
      })

  return (
    <div>
        
    </div>
  )
}

export default Games
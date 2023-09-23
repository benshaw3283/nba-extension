import React from "react";
import { useQuery } from "@tanstack/react-query";
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "efd4542df6msh04ed18037300093p17f43ejsnd4fbc1b9f248",
  },
};

const TeamRecord = (props: any) => {
  const fetchTeamRecord = async () => {
    const response = await fetch(
      `https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022&team=${props.teamID}`,
      options
    );
    const result = await response.json();
    return result;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["recordData", props.teamID],
    queryFn: fetchTeamRecord,
  });

  let team: any = [];

  if (data) {
    team = [...data.response];
  }

  return (
    <div>
      <p className="text-xs text-gray-500">
        {team[0]?.win.total} - {team[0]?.loss.total}
      </p>
    </div>
  );
};

export default TeamRecord;

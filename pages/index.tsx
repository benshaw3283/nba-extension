import type { NextPage } from "next";
import Games from "../components/Games";

const Home: NextPage = () => {
  return (
    <div className="border-2 bg-black bg-opacity-20 backdrop-blur-lg ">
      <Games />
    </div>
  );
};

export default Home;

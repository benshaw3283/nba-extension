import type { NextPage } from "next";
import Games from "../components/Games";

const Home: NextPage = () => {
  return (
    <main>
      <div
        id="delete_for_actual"
        className="h-[800px] w-[500px] bg-black flex bg-opacity-20 backdrop-blur-lg "
      >
        <div className="border-2 h-[800px] w-[500px] flex  overflow-x-hidden">
          <Games />
        </div>
      </div>
    </main>
  );
};

export default Home;

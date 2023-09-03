import type { NextPage } from "next";
import Games from "../components/Games";

const Home: NextPage = () => {
  return (
    <main>
      <div
        id="delete_for_actual"
        className="w-screen h-full flex justify-center pt-2 bg-black"
      >
        <div className="border-2 h-[800px] w-[500px] flex  overflow-x-hidden ">
          <Games />
        </div>
      </div>
    </main>
  );
};

export default Home;

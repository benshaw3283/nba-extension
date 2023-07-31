import type { NextPage } from "next";
import Games from "../components/Games";

const Home: NextPage = () => {
  return (
    <main>
      
      <div id='delete_for_actual' className="w-screen h-screen flex justify-center pt-2">
        <div className="border-2 h-20 w-[500px] flex ">
          <Games />
        </div>
      </div>
    </main>
  );
};

export default Home;

import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [online, setOnline] = useState(true);
  const [stats, setStats] = useState({
    cpu: [],
    freeMem: "",
    upTime: "",
    temp: "",
  });
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://f4dc-5-12-82-69.ngrok-free.app", {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((response) => {
          setStats(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
          setOnline(false);
        });
    };

    // Fetch data immediately when the component mounts
    fetchData();

    // Set up the interval to fetch data every second
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs once after initial render
  return (
    <div className="bg-[url('/bg-image.png')] md:bg-cover bg-contain  min-h-screen flex-col flex p-4 md:p-12 items-center justify-center">
      {/* partea de sus */}
      <div>
        <h1 className="text-white text-2xl font-bold underline underline-offset-2 ">
          Raspberrypi 3 Stats
        </h1>
        <h2 className=" mt-4 font-medium text-white">
          Machine is{" "}
          {online ? (
            <span className="font-bold text-green-300">🟢 online</span>
          ) : (
            <span className="font-bold text-red-300">🔴 offline</span>
          )}
        </h2>
      </div>
      <div className="bg-white/10 mt-12 p-4 w-full md:w-5/12 flex flex-col gap-2 rounded-2xl border-2 border-white/50">
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">Hostname</h3>
          <h3 className="font-bold text-white">{stats.hostname}</h3>
        </div>
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">Platform</h3>
          <h3 className="font-bold text-white">{stats.platform}</h3>
        </div>
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">CPU Cores</h3>
          <h3 className="font-bold text-white">{stats.cpu}</h3>
        </div>
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">Memory Usage</h3>
          <h3 className="font-bold text-white">{stats.memUsage}</h3>
        </div>
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">Free Memory</h3>
          <h3 className="font-bold text-white">{stats.freeMemory}</h3>
        </div>
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">Up Time</h3>
          <h3 className="font-bold text-white">{stats.upTime}</h3>
        </div>
        <div className="flex w-full justify-between border-b-2 border-white/20 pb-1">
          <h3 className=" text-white">Temperature</h3>
          <h3 className="font-bold text-white">
            {stats.temp[5]}
            {stats.temp[6]} °C
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;

"use client";

import cekToken from "@/utils/getToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data.json";
import axios from "axios";
import { DataIter } from "@/utils/controllerDatas";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [nodes, setNodes] = useState<DataIter>();
  const router = useRouter();

  const getNodes = async () => {
    if (token !== "") {
      const resolve = await axios.get(data.apiLink + "/" + token);
      const resolveData: DataIter = {
        id: token,
        ...resolve.data.data,
      };
      setNodes(resolveData);
    }
  };

  const setPin = async (pin: string) => {
    if (nodes) {
      const newNodes = {
        d0: nodes.d0,
        d1: nodes.d1,
        d2: nodes.d2,
        d3: nodes.d3,
      };

      if (pin === "d0") newNodes.d0.condition = !nodes.d0.condition;
      if (pin === "d1") newNodes.d1.condition = !nodes.d1.condition;
      if (pin === "d2") newNodes.d2.condition = !nodes.d2.condition;
      if (pin === "d3") newNodes.d3.condition = !nodes.d3.condition;

      await axios.post(data.apiLink + "/" + token, newNodes);
      await getNodes();
    }
  };

  useEffect(() => {
    const token = cekToken();
    if (!token) router.push("/");
    else {
      setToken(token);
      getNodes();
    }
  });
  return (
    <div className="p-10">
      <p>Token anda : {token}</p>
      <div className="flex justify-center">
        <div className="flex gap-4 flex-col md:flex-row w-full">
          {nodes ? (
            <>
              <PinOnOff
                label="PIN D0"
                condition={nodes.d0.condition}
                func={() => setPin("d0")}
              />
              <PinOnOff
                label="PIN D1"
                condition={nodes.d1.condition}
                func={() => setPin("d1")}
              />
              <PinOnOff
                label="PIN D2"
                condition={nodes.d2.condition}
                func={() => setPin("d2")}
              />
              <PinOnOff
                label="PIN D3"
                condition={nodes.d3.condition}
                func={() => setPin("d3")}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

const PinOnOff = ({
  func,
  label,
  condition,
}: {
  func?: Function;
  label?: string;
  condition?: boolean;
}) => {
  const [darkMode, setDarkMode] = useState(condition);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (func) {
      func();
    }
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="mt-4 sm:w-full p-4 ring ring-slate-900 rounded-md">
      <span>{label}</span>
      <div
        className={`rounded-lg ring ring-slate-900 mt-4 ${
          darkMode ? "bg-blue-500 text-white" : "bg-white text-black"
        } transition-all duration-300`}
      >
        <button
          onClick={toggleDarkMode}
          className="px-4 w-full py-2 rounded-lg"
        >
          {darkMode ? "Switch to Off Mode" : "Switch to On Mode"}
        </button>
      </div>
    </div>
  );
};

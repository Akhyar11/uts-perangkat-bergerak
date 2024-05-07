"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import data from "@/data.json";
import cekLogin from "@/utils/isLogin";
import { IsMsg } from "@/utils/isMsg";
import { DataIter } from "@/utils/controllerDatas";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [nodes, setNodes] = useState<DataIter[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  const getNodes = async () => {
    try {
      const validLogin = cekLogin();
      if (validLogin) {
        const response = await axios.get(
          data.localAPI + "/api/NodeMCU/getByUserId/" + validLogin
        );

        const dataFromDB = response.data.data;

        console.log(dataFromDB);

        if (dataFromDB) {
          setNodes(dataFromDB);
          setMsg("");
        } else {
          setMsg(response.data.msg);
        }
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNodes();
    const validId = Cookies.get("userId");
    if (validId) setUserId(validId);
  }, []);
  return (
    <div className="p-4 w-full h-screen relative">
      <span>User Id Anda: {userId}</span>
      <IsMsg msg={msg} />
      <div className="p-4 w-full flex gap-4">
        {nodes.map((node) => {
          return (
            <CardOfNodes name={node.name} nodeID={node.id} key={node.id} />
          );
        })}
      </div>
      <button
        onClick={() => {
          router.push("/addNode");
        }}
        className="text-3xl absolute bottom-10 right-10 w-16 h-16 text-white hover:bg-green-600 transition-all duration-300 bg-green-400 font-semibold p-3 rounded-full"
      >
        +
      </button>
    </div>
  );
}

function CardOfNodes({ name, nodeID }: { name: string; nodeID: string }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/controllerNode/" + nodeID);
      }}
      className="p-8 hover:cursor-pointer border ring ring-slate-900 rounded-lg flex flex-col gap-2"
    >
      <span className="text-2xl font-semibold">{name}</span>
      <span>{nodeID}</span>
    </div>
  );
}

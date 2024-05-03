"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data.json";
import axios from "axios";
import { DataIter } from "@/utils/controllerDatas";
import { useParams } from "next/navigation";
import cekLogin from "@/utils/isLogin";

export default function ControllerNode() {
  const [nodes, setNodes] = useState<DataIter>();
  const router = useRouter();
  const params = useParams<{ nodeID: string }>();

  const getNodes = async () => {
    const response = await axios.get(
      data.localAPI + "/api/NodeMCU/" + params.nodeID
    );
    const resolveData: DataIter = {
      id: params.nodeID,
      ...response.data.data,
    };
    setNodes(resolveData);
  };

  const setPin = async (pin: string) => {
    if (nodes) {
      const newNodes: DataIter = {
        id: params.nodeID,
        name: nodes.name,
        userId: nodes.userId,
        d0: nodes.d0,
        d1: nodes.d1,
        d2: nodes.d2,
        d3: nodes.d3,
      };

      if (pin === "d0") newNodes.d0.condition = !nodes.d0.condition;
      if (pin === "d1") newNodes.d1.condition = !nodes.d1.condition;
      if (pin === "d2") newNodes.d2.condition = !nodes.d2.condition;
      if (pin === "d3") newNodes.d3.condition = !nodes.d3.condition;

      await axios.post(
        data.localAPI + "/api/NodeMCU/" + params.nodeID,
        newNodes
      );
      await getNodes();
    }
  };

  const deleteNode = async () => {
    const response = await axios.delete(
      data.localAPI + "/api/NodeMCU/" + params.nodeID
    );

    if (response.data.msg === "berhasil delete data") {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const validLogin = cekLogin();
    if (validLogin) {
      getNodes();
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-10">
      <div className="flex w-full justify-between">
        <div>
          <p>Node anda : {nodes?.name}</p>
          <p>Token anda : {params.nodeID}</p>
        </div>
        <button
          onClick={deleteNode}
          className="bg-red-400 hover:bg-red-600 transition-all duration-300 py-2 px-4 rounded-lg text-white font-semibold mt-4"
        >
          DELETE
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-4 flex-col md:flex-row w-full">
          {nodes ? (
            <>
              <PinOnOff
                label="PIN D0"
                func={() => setPin("d0")}
                condition={nodes.d0.condition}
              />
              <PinOnOff
                label="PIN D1"
                func={() => setPin("d1")}
                condition={nodes.d1.condition}
              />
              <PinOnOff
                label="PIN D2"
                func={() => setPin("d2")}
                condition={nodes.d2.condition}
              />
              <PinOnOff
                label="PIN D3"
                func={() => setPin("d3")}
                condition={nodes.d3.condition}
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
  const toggleDarkMode = () => {
    if (func) {
      func();
    }
  };
  return (
    <div className="mt-4 sm:w-full p-4 ring ring-slate-900 rounded-md">
      <span>{label}</span>
      <div
        className={`rounded-lg ring ring-slate-900 mt-4 ${
          condition ? "bg-blue-500 text-white" : "bg-white text-black"
        } transition-all duration-300`}
      >
        <button
          onClick={toggleDarkMode}
          className="px-4 w-full py-2 rounded-lg"
        >
          {condition ? "Switch to Off Mode" : "Switch to On Mode"}
        </button>
      </div>
    </div>
  );
};

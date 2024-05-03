"use client";
import axios from "axios";
import { useState } from "react";
import data from "@/data.json";
import cekLogin from "@/utils/isLogin";
import { useRouter } from "next/navigation";
import { IsMsg } from "@/utils/isMsg";

export default function AddNode() {
  const [nodeName, setNodeName] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const addNode = async () => {
    try {
      const validLogin = cekLogin();
      if (validLogin) {
        const response = await axios.post(
          data.localAPI + "/api/NodeMCU/add/" + validLogin,
          { name: nodeName }
        );
        if (response.data.msg === "berhasil membuat node baru") {
          router.push("/dashboard");
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
  return (
    <div>
      <form className="p-4" action={addNode}>
        <IsMsg msg={msg} />
        <div className="flex gap-4 mb-4 items-center">
          <label htmlFor="name">Node Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border p-2 ring ring-slate-900 rounded-lg"
            onChange={(e) => setNodeName(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-400 py-2 px-4 rounded-lg text-white font-semibold">
          Kirim
        </button>
      </form>
    </div>
  );
}

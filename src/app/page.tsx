"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import data from "@/data.json";
import Cookies from "js-cookie";
import cekToken from "@/utils/getToken";
import { useRouter } from "next/navigation";

export default function Home() {
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const applyToken = async () => {
    const resolve = await axios.get(data.apiLink + "/" + token);

    if (!resolve.data.msg) {
      const now = new Date().getTime() + 1000 * 60 * 60;
      Cookies.set("token", token, { expires: new Date(now) });
      window.location.reload();
    } else {
      setMsg(resolve.data.msg);
    }
  };

  const createToken = async () => {
    const resolve = await axios.post(data.apiLink + "/add");
    setMsg(resolve.data.msg);
  };

  useEffect(() => {
    const token = cekToken();
    if (token) router.push("/dashboard");
  }, []);
  return (
    <div>
      <form action={applyToken} className="p-4">
        <div className="flex gap-4 mb-4 items-center">
          <label htmlFor="token">Your Token</label>
          <input
            type="text"
            name="token"
            id="token"
            className="border p-2 ring ring-slate-900 rounded-lg"
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div>
          <span>{msg}</span>
        </div>
        <button className="bg-blue-400 py-2 px-4 rounded-lg text-white font-semibold">
          Kirim
        </button>
      </form>

      <button
        onClick={createToken}
        className="bg-green-400 py-2 px-4 rounded-lg text-white font-semibold mx-4"
      >
        Buat Token
      </button>
    </div>
  );
}

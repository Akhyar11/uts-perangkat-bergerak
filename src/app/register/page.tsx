"use client";
import { UserInter } from "@/utils/controllerUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dataAPI from "@/data.json";
import { IsMsg } from "@/utils/isMsg";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();

  const register = async () => {
    const data: UserInter = { name, username, password };
    const response = await axios.post(
      dataAPI.localAPI + "/api/Users/register",
      data
    );

    if (response.data.msg === "berhasil membuat user baru") {
      router.push("/login");
      Cookies.remove("userId");
    } else {
      setMsg(response.data.msg);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold text-2xl">Register</h1>
      <IsMsg msg={msg} />
      <div>
        <form action={register}>
          <div className="flex flex-col gap-4 mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border p-2 ring ring-slate-900 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 ring ring-slate-900 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 ring ring-slate-900 rounded-lg"
            />
          </div>
          <button className="bg-blue-400 py-2 px-4 rounded-lg text-white font-semibold">
            Register
          </button>
        </form>
        <button className="bg-green-400 py-2 px-4 rounded-lg text-white font-semibold mt-4">
          Login
        </button>
      </div>
    </div>
  );
}

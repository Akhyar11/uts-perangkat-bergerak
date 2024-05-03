"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import data from "@/data.json";
import { UserInter } from "@/utils/controllerUsers";
import Cookies from "js-cookie";
import cekLogin from "@/utils/isLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();

  const login = async () => {
    try {
      const dataLogin: UserInter = {
        name: "",
        password,
        username,
      };
      const response = await axios.post(
        data.localAPI + "/api/Users/login",
        dataLogin
      );

      if (response.data.data) {
        const now = new Date().getTime() + 1000 * 60 * 60;
        Cookies.set("userId", response.data.data.id, {
          expires: new Date(now),
        });
        window.location.reload();
      } else {
        setMsg(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const IsMsg = () => {
    return msg !== "" ? (
      <div className="w-full mb-4 bg-red-400 text-white p-4 rounded-lg font-semibold">
        {msg}
      </div>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    const validLogin = cekLogin();
    console.log(validLogin);
    if (validLogin) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold text-2xl">Login</h1>
      <div>
        <IsMsg />
        <form action={login}>
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
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 ring ring-slate-900 rounded-lg"
            />
          </div>
          <button className="bg-blue-400 py-2 hover:bg-blue-600 transition-all duration-300 px-4 rounded-lg text-white font-semibold">
            Login
          </button>
        </form>
        <button
          onClick={() => router.push("/register")}
          className="bg-green-400 hover:bg-green-600 transition-all duration-300 py-2 px-4 rounded-lg text-white font-semibold mt-4"
        >
          Register
        </button>
      </div>
    </div>
  );
}

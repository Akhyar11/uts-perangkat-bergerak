"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiLink } from "@/data.json";

export default function Home() {
  const getNodes = async () => {
    const resolve = await axios.get(apiLink);
    console.log(resolve);
  };

  useEffect(() => {
    getNodes();
  }, []);
  return <></>;
}

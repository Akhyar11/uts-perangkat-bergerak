import { DataIter, PinType, createData } from "@/utils/controllerDatas";
import { NextResponse } from "next/server";

function generateRandomID() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function GET() {
  const id = generateRandomID();
  const pin: PinType = { label: "lamp", condition: false };
  const data: DataIter = { id, d0: pin, d1: pin, d2: pin, d3: pin };
  const valid = createData(data);
  if (valid) {
    return NextResponse.json({ msg: "berhasil membuat data" });
  } else {
    return NextResponse.json({ msg: "gagal membuat data" });
  }
}

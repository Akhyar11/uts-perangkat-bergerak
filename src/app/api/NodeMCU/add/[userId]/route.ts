import { DataIter, PinType, addNode } from "@/utils/controllerDatas";
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

export async function POST(req: Request, content: any) {
  const { params } = content;
  const body = await req.json();
  const id = generateRandomID();
  const pin: PinType = { label: "lamp", condition: false };
  const data: DataIter = {
    id,
    userId: params.userId,
    name: body.name,
    d0: pin,
    d1: pin,
    d2: pin,
    d3: pin,
    sensor: {
      name: "nn",
      value: false,
    },
  };
  const valid = await addNode(data);
  if (valid) {
    return NextResponse.json({
      msg: "berhasil membuat node baru",
    });
  } else {
    return NextResponse.json({ msg: "gagal membuat data" });
  }
}

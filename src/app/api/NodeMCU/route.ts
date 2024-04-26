import { getAllNode } from "@/utils/controllerDatas";
import { NextResponse } from "next/server";

export async function GET() {
  const datas = await getAllNode();
  return NextResponse.json({ msg: "anda berada di API NodeMCU", data: datas });
}

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ data });
}

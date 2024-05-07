import { DataIter, getNode, updateNode } from "@/utils/controllerDatas";
import { NextResponse } from "next/server";

export async function GET(_: Request, content: any) {
  const { params } = content;
  return NextResponse.json({ msg: params });
}

export async function POST(req: Request, content: any) {
  const { params } = content;
  const data = await req.json();
  const node = await getNode(params.nodeID);

  const sensor = {
    name: data.name,
    value: data.value,
  };

  if (node) {
    const newNode: DataIter = {
      d0: node.d0,
      d1: node.d1,
      d2: node.d2,
      d3: node.d3,
      id: params.nodeID,
      name: node.name,
      userId: node.userId,
      sensor,
    };
    await updateNode(newNode);
    return NextResponse.json({ msg: "berhasil update sensor" });
  }
}

import { deleteNode, getNode, updateNode } from "@/utils/controllerDatas";
import { NextResponse } from "next/server";

export async function GET(_: Request, content: any) {
  const { params } = content;
  const data = await getNode(params.nodeID);
  if (data) return NextResponse.json({ data });
  else return NextResponse.json({ msg: "tidak ada node dengan id tersebut" });
}

export async function POST(req: Request, content: any) {
  const { params } = content;
  const data = await req.json();
  data.id = params.nodeID;
  const valid = await updateNode(data);
  if (valid) {
    return NextResponse.json({ msg: "berhasil update data" });
  } else {
    return NextResponse.json({ msg: "gagal update data" });
  }
}

export async function DELETE(_: Request, content: any) {
  const { params } = content;
  const valid = await deleteNode(params.nodeID);
  if (valid) return NextResponse.json({ msg: "berhasil delete data" });
  else return NextResponse.json({ msg: "gagal delete data" });
}

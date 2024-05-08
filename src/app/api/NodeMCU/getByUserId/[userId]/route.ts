import { getNodeByUserId } from "@/utils/controllerDatas";
import { NextResponse } from "next/server";

export async function GET(req: Request, content: any) {
  const { params } = content;
  const data = await getNodeByUserId(params.userId);
  if (data) {
    return NextResponse.json({ data });
  } else {
    return NextResponse.json({ msg: "tidak ada node dengan user terkait" });
  }
}

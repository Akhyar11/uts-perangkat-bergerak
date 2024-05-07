import { getNodeByUserId } from "@/utils/controllerDatas";
import { NextResponse } from "next/server";

export async function GET(_: Request, content: any) {
  const { params } = content;
  const data = await getNodeByUserId(params.userId);
  if (data) {
    let fireSensor = false;
    data.map((d) => {
      if (d.sensor.value === true) fireSensor = true;
    });
    return NextResponse.json({ data, fireSensor });
  } else
    return NextResponse.json({ msg: "tidak ada node dengan user terkait " });
}

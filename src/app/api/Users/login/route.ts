import { UserInter, login } from "@/utils/controllerUsers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: UserInter = await req.json();
    const valid = await login(data);
    if (valid) {
      return NextResponse.json({
        data: valid,
      });
    } else {
      return NextResponse.json({ msg: "gagal login user " });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "gagal login user baru, error bagian server",
    });
  }
}

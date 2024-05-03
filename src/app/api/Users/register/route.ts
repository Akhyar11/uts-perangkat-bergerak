import { UserInter, createUser } from "@/utils/controllerUsers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: UserInter = await req.json();
    const valid = await createUser(data);
    if (valid) {
      return NextResponse.json({
        msg: "berhasil membuat user baru",
      });
    } else {
      return NextResponse.json({ msg: "gagal membuat user baru" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "gagal membuat user baru, error bagian server",
    });
  }
}

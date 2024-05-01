import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "./crud";
import { UserRegisterType } from "@/types/types";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: UserRegisterType = await req.json();

    const result = await registerUser(data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}

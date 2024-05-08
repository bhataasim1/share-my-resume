import { NextRequest, NextResponse } from "next/server";
import { UserRegistrationService } from "./crud";
import { UserRegisterType } from "@/types/types";

const userRegistrationService = new UserRegistrationService();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: UserRegisterType = await req.json();

    const result = await userRegistrationService.registerUser(data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}

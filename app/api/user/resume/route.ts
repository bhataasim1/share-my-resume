import { NextRequest, NextResponse } from "next/server";
import { UserProfileService } from "../userCrud";

const userProfileService = new UserProfileService();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id") as string;
    const user = await userProfileService.getUserProfileById(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

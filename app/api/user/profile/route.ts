import { NextRequest, NextResponse } from "next/server";
import { UserProfileService } from "../userCrud";
import { userUpdateProfileType } from "@/types/types";

const userProfileService = new UserProfileService();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user = await userProfileService.getUserProfile(req, res);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data: userUpdateProfileType = await req.json();
    const user = await userProfileService.updateUserProfile(data);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const formData = await req.formData();
    const avatarFile = formData.get("avatar") as File;

    if (!avatarFile) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    const fileContent = await avatarFile.arrayBuffer();
    const imgResponse = await userProfileService.updateUserProfileImage(
      fileContent
    );

    return NextResponse.json(
      { data: imgResponse, message: "File uploaded" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

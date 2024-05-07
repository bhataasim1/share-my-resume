import { NextRequest, NextResponse } from "next/server";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileImage,
} from "../userCrud";
import { userUpdateProfileType } from "@/types/types";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user = await getUserProfile(req, res);
    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went Wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data: userUpdateProfileType = await req.json();
    const user = await updateUserProfile(data);
    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went Wrong" },
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

    // const avatar = formData.get("avatar") as Blob;
    const avatarFile = formData.get("avatar") as File;

    if (!avatarFile) {
      return NextResponse.json({ error: "No file Found" }, { status: 400 });
    }
    // console.log("avatar", avatarFile);

    const fileContent = await avatarFile.arrayBuffer();
    const imgResponse = await updateUserProfileImage(fileContent);

    // const imgResponse = await updateUserProfileImage(avatar);

    return NextResponse.json(
      { data: imgResponse, message: "File Uploaded" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went Wrong" },
      { status: 500 }
    );
  }
}

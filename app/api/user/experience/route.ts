import { ExperienceType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { UserExperienceServices } from "./experienceServices";

const userExperienceService = new UserExperienceServices();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: ExperienceType = await req.json();
    const userExperience = await userExperienceService.createUserExperience(
      data
    );
    return NextResponse.json(userExperience, { status: 201 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id") as string;
    const userExperience = await userExperienceService.deleteUserExperience(id);
    return NextResponse.json(userExperience, { status: 200 });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id") as string;
    const data: ExperienceType = await req.json();
    const userExperience = await userExperienceService.updateUserExperience(
      id,
      data
    );
    return NextResponse.json(userExperience, { status: 200 });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

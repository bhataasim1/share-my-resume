import { EducationType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { UserEducationService } from "./educationServices";

const userEducationService = new UserEducationService();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: EducationType = await req.json();
    const userEducation = await userEducationService.createUserEducation(data);
    return NextResponse.json(userEducation);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

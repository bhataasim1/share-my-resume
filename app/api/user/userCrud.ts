import { userUpdateValidationSchema } from "@/components/form/zodValidation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/schema";
import { userUpdateProfileType } from "@/types/types";
import { mkdir, writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getSignedURL } from "./awsActions";

export async function getUserProfile(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You are Not authorized to access this." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user?.id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        UserDetail: {
          select: {
            avatar: true,
            bio: true,
            skills: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    return error;
  }
}

export async function updateUserProfile(data: userUpdateProfileType) {
  const { bio, skills } = data;

  const validationResult = userUpdateValidationSchema.safeParse(data);

  if (!validationResult.success) {
    return { error: validationResult.error.errors[0] };
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { error: "You are Not authorized to access this." };
    }

    const userDetail = await prisma.userDetail.findFirst({
      where: {
        userId: session.user?.id,
      },
    });

    if (!userDetail) {
      throw new Error("UserDetail not found.");
    }

    const user = prisma.userDetail.update({
      where: {
        id: userDetail.id,
      },
      data: {
        bio: bio || userDetail.bio,
        skills: {
          set: skills || userDetail.skills,
        },
      },
      select: {
        id: true,
        avatar: true,
        bio: true,
        skills: true,
      },
    });

    return user;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export async function updateUserProfileImage(file: ArrayBuffer) {
  // console.log("Crud server ", file);

  if (!file) {
    return { error: "Please upload a Valid Image" };
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { error: "You are Not authorized to access this." };
    }

    const userDetail = await prisma.userDetail.findFirst({
      where: {
        userId: session.user?.id,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!userDetail) {
      throw new Error("User not found.");
    }

    const filename = `${Date.now()}-${session.user?.name}-avatar.jpg`;

    const signedUrlResult = await getSignedURL(filename);
    // console.log("SignedUrlResult", signedUrlResult);

    //@ts-ignore
    const img = await fetch(signedUrlResult.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

    if (!img.ok) {
      return { error: "Error uploading image" };
    }

    //@ts-ignore
    const imageUrl = signedUrlResult.url.split("?")[0];
    // console.log("Image URL", imageUrl);

    if (!imageUrl) {
      return { error: "Error uploading image" };
    }
    const user = prisma.userDetail.update({
      where: {
        id: userDetail.id,
      },
      data: {
        avatar: imageUrl,
      },
      select: {
        id: true,
        avatar: true,
        bio: true,
        skills: true,
      },
    });

    return user;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

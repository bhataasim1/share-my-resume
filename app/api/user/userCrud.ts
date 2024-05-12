import { userUpdateValidationSchema } from "@/components/form/zodValidation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/schema";
import { userUpdateProfileType } from "@/types/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getSignedURL } from "./awsActions";

export class UserProfileService {
  protected async getSession() {
    return await getServerSession(authOptions);
  }

  public async getUserProfile(req: NextRequest, res: NextResponse) {
    try {
      const session = await this.getSession();

      if (!session) {
        return NextResponse.json(
          { message: "You are not authorized to access this." },
          { status: 401 }
        );
      }

      const user = await this.findUserById(session.user?.id);

      return user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return error;
    }
  }

  public async getUserProfileById(id: string) {
    try {
      const user = await this.findUserById(id);
      if (!user) {
        return { error: "User not found." };
      }
      return user;
    } catch (error) {
      console.error("Error fetching user profile by id:", error);
      return error;
    }
  }

  public async updateUserProfile(data: userUpdateProfileType) {
    const { bio, skills } = data;
    const validationResult = userUpdateValidationSchema.safeParse(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const session = await this.getSession();

      if (!session) {
        return { error: "You are not authorized to access this." };
      }

      const userDetail = await this.findUserDetailByUserId(session.user?.id);

      if (!userDetail) {
        throw new Error("UserDetail not found.");
      }

      const updatedUser = await this.updateUserDetail(
        userDetail.id,
        bio,
        skills
      );

      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return error;
    }
  }

  protected async findUserById(userId: string | undefined) {
    return await prisma.user.findFirst({
      where: { id: userId },
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
            education: {
              select: {
                id: true,
                school: true,
                degree: true,
                cgpa: true,
                present: true,
                description: true,
                startYear: true,
                endYear: true,
              },
            },
            work: {
              select: {
                id: true,
                company: true,
                position: true,
                description: true,
                startYear: true,
                endYear: true,
                skills: true,
                present: true,
              },
            },
          },
        },
      },
    });
  }

  protected async findUserDetailByUserId(userId: string | undefined) {
    return await prisma.userDetail.findFirst({
      where: { userId },
    });
  }

  private async updateUserDetail(id: string, bio?: string, skills?: string[]) {
    const existingUserDetail = await prisma.userDetail.findUnique({
      where: { id },
    });

    if (!existingUserDetail) {
      throw new Error("UserDetail not found.");
    }
    const updatedBio = bio !== undefined ? bio : existingUserDetail.bio;
    const updatedSkills =
      skills !== undefined ? skills : existingUserDetail.skills;

    const updatedUser = await prisma.userDetail.update({
      where: { id },
      data: {
        bio: updatedBio,
        skills: { set: updatedSkills },
      },
      select: {
        id: true,
        avatar: true,
        bio: true,
        skills: true,
      },
    });

    return updatedUser;
  }

  public async updateUserProfileImage(file: ArrayBuffer) {
    if (!file) {
      return { error: "Please upload a valid image." };
    }

    try {
      const session = await this.getSession();

      if (!session) {
        return { error: "You are not authorized to access this." };
      }

      const userDetail = await this.findUserDetailByUserId(session.user?.id);

      if (!userDetail) {
        throw new Error("User not found.");
      }

      const filename = `${Date.now()}-avatar.jpg`;
      const signedUrlResult = await getSignedURL(filename);

      //@ts-ignore
      const response = await fetch(signedUrlResult.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      if (!response.ok) {
        return { error: "Error uploading image." };
      }

      //@ts-ignore
      const imageUrl = signedUrlResult.url.split("?")[0];

      if (!imageUrl) {
        return { error: "Error getting image URL." };
      }

      const updatedUser = await this.updateUserAvatar(userDetail.id, imageUrl);

      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile image:", error);
      return error;
    }
  }

  private async updateUserAvatar(id: string, avatarUrl: string) {
    const updatedUser = await prisma.userDetail.update({
      where: { id },
      data: {
        avatar: avatarUrl,
      },
      select: {
        id: true,
        avatar: true,
        bio: true,
        skills: true,
      },
    });

    return updatedUser;
  }
}

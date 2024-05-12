import { NextRequest, NextResponse } from "next/server";
import { UserProfileService } from "../userCrud";
import { EducationType } from "@/types/types";
import { userCreateEducationValidationSchema } from "@/lib/zodValidation";
import prisma from "@/prisma/schema";

export class UserEducationService extends UserProfileService {
  public async getUserEducation(req: NextRequest, res: NextResponse) {
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
      console.error("Error fetching user education:", error);
      return error;
    }
  }

  public async createUserEducation(data: EducationType) {
    const { school, degree, cgpa, present, description, startYear, endYear } =
      data;
    const validationResult =
      userCreateEducationValidationSchema.safeParse(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const session = await this.getSession();

      if (!session) {
        return { error: "You are not authorized to access this." };
      }

      const userDetails = await this.findUserDetailByUserId(session.user?.id);

      if (!userDetails) {
        throw new Error("UserDetail not found.");
      }

      const userEducation = await this.createEducation(
        userDetails?.id,
        school,
        degree,
        cgpa,
        present,
        description,
        startYear,
        endYear
      );

      return userEducation;
    } catch (error) {
      console.error("Error creating user education:", error);
      return error;
    }
  }

  protected async createEducation(
    userId: string | undefined,
    school: string,
    degree: string,
    cgpa: string,
    present: boolean,
    description: string,
    startYear: string,
    endYear: string
  ) {
    return await prisma.userEducation.create({
      data: {
        school,
        degree,
        cgpa,
        present,
        description,
        startYear,
        endYear,
        userDetail: {
          connect: { id: userId },
        },
      },
    });
  }

  public async deleteUserEducation(id: string) {
    // console.log("education Services id", id);
    try {
      const session = await this.getSession();

      if (!session) {
        return { error: "You are not authorized to access this." };
      }

      const userEducation = await this.findUserEducationById(id);

      if (!userEducation) {
        throw new Error("UserEducation not found.");
      }

      const deletedUser = await this.deleteEducation(userEducation.id);

      return deletedUser;
    } catch (error) {
      console.error("Error deleting user education:", error);
      return error;
    }
  }

  protected async deleteEducation(id: string) {
    return await prisma.userEducation.delete({
      where: {
        id,
      },
    });
  }

  protected async findUserEducationById(id: string) {
    return await prisma.userEducation.findUnique({
      where: {
        id,
      },
    });
  }

  public async updateUserEducation(id: string, data: EducationType) {
    const { school, degree, cgpa, present, description, startYear, endYear } =
      data;
    const validationResult =
      userCreateEducationValidationSchema.safeParse(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const session = await this.getSession();

      if (!session) {
        return { error: "You are not authorized to access this." };
      }

      const userEducation = await this.findUserEducationById(id);

      if (!userEducation) {
        throw new Error("UserEducation not found.");
      }

      const updatedUser = await this.updateEducation(
        userEducation.id,
        school,
        degree,
        cgpa,
        present,
        description,
        startYear,
        endYear
      );

      return updatedUser;
    } catch (error) {
      console.error("Error updating user education:", error);
      return error;
    }
  }

  protected async updateEducation(
    id: string,
    school: string,
    degree: string,
    cgpa: string,
    present: boolean,
    description: string,
    startYear: string,
    endYear: string
  ) {
    return await prisma.userEducation.update({
      where: {
        id,
      },
      data: {
        school,
        degree,
        cgpa,
        present,
        description,
        startYear,
        endYear,
      },
    });
  }
}

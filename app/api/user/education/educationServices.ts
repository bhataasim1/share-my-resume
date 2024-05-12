import { NextRequest, NextResponse } from "next/server";
import { UserProfileService } from "../userCrud";
import { EducationType } from "@/types/types";
import { userCreateEducationValidationSchema } from "@/lib/zodValidation";
import prisma from "@/prisma/schema";

export class UserEducationService extends UserProfileService {
  constructor() {
    super();
  }

  public async getUserEducation(req: NextRequest, res: NextResponse) {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        return NextResponse.json(
          { message: "You are not authorized to access this." },
          { status: 401 }
        );
      }

      return user;
    } catch (error) {
      console.error("Error fetching user education:", error);
      return error;
    }
  }

  public async createUserEducation(data: EducationType) {
    const validationResult = this.validateEducationData(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const userDetails = await this.getCurrentUserDetail();

      if (!userDetails) {
        throw new Error("UserDetail not found.");
      }

      const userEducation = await this.createEducation(userDetails.id, data);

      return userEducation;
    } catch (error) {
      console.error("Error creating user education:", error);
      return error;
    }
  }

  public async deleteUserEducation(id: string) {
    try {
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

  public async updateUserEducation(id: string, data: EducationType) {
    const validationResult = this.validateEducationData(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const userEducation = await this.findUserEducationById(id);

      if (!userEducation) {
        throw new Error("UserEducation not found.");
      }

      const updatedUser = await this.updateEducation(userEducation.id, data);

      return updatedUser;
    } catch (error) {
      console.error("Error updating user education:", error);
      return error;
    }
  }

  private async getCurrentUser() {
    const session = await this.getSession();
    return session ? this.findUserById(session.user?.id) : null;
  }

  private async getCurrentUserDetail() {
    const session = await this.getSession();
    return session ? this.findUserDetailByUserId(session.user?.id) : null;
  }

  private validateEducationData(data: EducationType) {
    return userCreateEducationValidationSchema.safeParse(data);
  }

  protected async createEducation(userId: string, data: EducationType) {
    const { school, degree, cgpa, present, description, startYear, endYear } =
      data;

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

  protected async deleteEducation(id: string) {
    return await prisma.userEducation.delete({
      where: { id },
    });
  }

  protected async findUserEducationById(id: string) {
    return await prisma.userEducation.findUnique({
      where: { id },
    });
  }

  protected async updateEducation(id: string, data: EducationType) {
    const { school, degree, cgpa, present, description, startYear, endYear } =
      data;

    return await prisma.userEducation.update({
      where: { id },
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

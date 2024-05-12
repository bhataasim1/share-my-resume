import { NextRequest, NextResponse } from "next/server";
import { UserProfileService } from "../userCrud";
import { ExperienceType } from "@/types/types";
import { userExperienceValidationSchema } from "@/lib/zodValidation";
import prisma from "@/prisma/schema";

export class UserExperienceServices extends UserProfileService {
  constructor() {
    super();
  }

  public async createUserExperience(data: ExperienceType) {
    const validationResult = this.validateExperienceData(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const userDetails = await this.getCurrentUserDetail();

      if (!userDetails) {
        throw new Error("UserDetail not found.");
      }

      const userExperience = await this.createExperience(userDetails.id, data);

      return userExperience;
    } catch (error) {
      console.error("Error creating user Experience:", error);
      return error;
    }
  }

  public async deleteUserExperience(id: string) {
    try {
      const userExperience = await this.findUserExperienceById(id);

      if (!userExperience) {
        throw new Error("User Experience not found.");
      }

      const deletedUser = await this.deleteExperience(userExperience.id);

      return deletedUser;
    } catch (error) {
      console.error("Error deleting user Experience:", error);
      return error;
    }
  }

  public async updateUserExperience(id: string, data: ExperienceType) {
    const validationResult = this.validateExperienceData(data);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const userExperience = await this.findUserExperienceById(id);

      if (!userExperience) {
        throw new Error("User Experience not found.");
      }

      const updatedUser = await this.updateExperience(userExperience.id, data);

      return updatedUser;
    } catch (error) {
      console.error("Error updating user Experience:", error);
      return error;
    }
  }

  private async getCurrentUserDetail() {
    const session = await this.getSession();
    return session ? this.findUserDetailByUserId(session.user?.id) : null;
  }

  private validateExperienceData(data: ExperienceType) {
    return userExperienceValidationSchema.safeParse(data);
  }

  protected async createExperience(userId: string, data: ExperienceType) {
    const {
      company,
      position,
      skills,
      present,
      description,
      startYear,
      endYear,
    } = data;

    return await prisma.userWork.create({
      data: {
        company,
        position,
        skills: { set: skills },
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

  protected async deleteExperience(id: string) {
    return await prisma.userWork.delete({
      where: { id },
    });
  }

  protected async findUserExperienceById(id: string) {
    return await prisma.userWork.findUnique({
      where: { id },
    });
  }

  protected async updateExperience(id: string, data: ExperienceType) {
    const {
      company,
      position,
      skills,
      present,
      description,
      startYear,
      endYear,
    } = data;

    return await prisma.userWork.update({
      where: { id },
      data: {
        company,
        position,
        skills: { set: skills },
        present,
        description,
        startYear,
        endYear,
      },
    });
  }
}

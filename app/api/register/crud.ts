import { userRegisterSchema } from "@/lib/zodValidation";
import prisma from "@/prisma/schema";
import { UserRegisterType } from "@/types/types";
import { hash } from "bcryptjs";

export class UserRegistrationService {
  protected async checkExistingUser(email: string, username: string) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    return existingUser;
  }

  protected async hashPassword(password: string) {
    return hash(password, 10);
  }

  public async registerUser(userData: UserRegisterType) {
    const { username, name, email, password } = userData;

    const validationResult = userRegisterSchema.safeParse(userData);

    if (!validationResult.success) {
      return { error: validationResult.error.errors[0] };
    }

    try {
      const existingUser = await this.checkExistingUser(email, username);

      if (existingUser?.email === email) {
        return { error: "User with this email already exists" };
      }

      if (existingUser?.username === username) {
        return { error: "User with this username already exists" };
      }

      const hashedPassword = await this.hashPassword(password);

      const newUser = await this.createUser(
        username,
        name,
        email,
        hashedPassword
      );

      await this.createUserDetail(newUser.id);

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: "Something went wrong" };
    }
  }

  private async createUser(
    username: string,
    name: string,
    email: string,
    password: string
  ) {
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });

    return newUser;
  }

  private async createUserDetail(userId: string) {
    await prisma.userDetail.create({
      data: {
        userId,
      },
    });
  }
}
